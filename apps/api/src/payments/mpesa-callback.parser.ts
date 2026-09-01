export type ParsedMpesaCallback={checkoutRequestId?:string;merchantRequestId?:string;resultCode:number;resultDesc?:string;receipt?:string;amount?:number;phone?:string};

export function parseMpesaCallback(payload:any):ParsedMpesaCallback {
  const body=payload?.Body?.stkCallback;
  if(!body) throw new Error('Invalid M-PESA callback payload');
  const items: any[]=body.CallbackMetadata?.Item||[];
  const get=(name:string)=>items.find(i=>i.Name===name)?.Value;
  return {checkoutRequestId:body.CheckoutRequestID,merchantRequestId:body.MerchantRequestID,resultCode:Number(body.ResultCode),resultDesc:body.ResultDesc,receipt:get('MpesaReceiptNumber'),amount:get('Amount'),phone:String(get('PhoneNumber')||'')};
}
