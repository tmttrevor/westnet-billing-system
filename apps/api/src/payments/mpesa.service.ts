import { Injectable, InternalServerErrorException } from '@nestjs/common';

export type StkPushInput = { phone: string; amount: number; accountReference: string; transactionDesc?: string };

@Injectable()
export class MpesaService {
  private baseUrl() { return process.env.MPESA_BASE_URL || 'https://sandbox.safaricom.co.ke'; }
  private callbackUrl() { const value = process.env.MPESA_CALLBACK_URL; if (!value) throw new InternalServerErrorException('MPESA_CALLBACK_URL is required'); return value; }
  private normalizePhone(phone:string) { const digits=phone.replace(/\D/g,''); if(digits.startsWith('0')&&digits.length===10) return `254${digits.slice(1)}`; if(digits.startsWith('254')) return digits; throw new InternalServerErrorException('Invalid Kenyan phone number'); }
  async accessToken() {
    const key=process.env.MPESA_CONSUMER_KEY, secret=process.env.MPESA_CONSUMER_SECRET;
    if(!key||!secret) throw new InternalServerErrorException('M-PESA credentials are not configured');
    const basic=Buffer.from(`${key}:${secret}`).toString('base64');
    const response=await fetch(`${this.baseUrl()}/oauth/v1/generate?grant_type=client_credentials`,{headers:{Authorization:`Basic ${basic}`}});
    if(!response.ok) throw new InternalServerErrorException('Unable to obtain M-PESA access token');
    const data=await response.json() as {access_token:string};
    return data.access_token;
  }
  async stkPush(input:StkPushInput) {
    const shortcode=process.env.MPESA_SHORTCODE, passkey=process.env.MPESA_PASSKEY;
    if(!shortcode||!passkey) throw new InternalServerErrorException('M-PESA STK configuration is incomplete');
    const timestamp=new Date().toISOString().replace(/[-:.TZ]/g,'').slice(0,14);
    const password=Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
    const token=await this.accessToken();
    const response=await fetch(`${this.baseUrl()}/mpesa/stkpush/v1/processrequest`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({BusinessShortCode:shortcode,Password:password,Timestamp:timestamp,TransactionType:'CustomerPayBillOnline',Amount:Math.round(input.amount),PartyA:this.normalizePhone(input.phone),PartyB:shortcode,PhoneNumber:this.normalizePhone(input.phone),CallBackURL:this.callbackUrl(),AccountReference:input.accountReference,TransactionDesc:input.transactionDesc||'WestNet internet payment'})});
    const data=await response.json();
    if(!response.ok) throw new InternalServerErrorException({message:'M-PESA STK Push request failed',data});
    return data;
  }
}
