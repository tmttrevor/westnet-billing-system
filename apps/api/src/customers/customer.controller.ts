import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
@Controller('customers')
export class CustomerController {
 constructor(private readonly customers:CustomerService){}
 @Post() create(@Headers('x-tenant-id') tenantId:string,@Body() body:{name:string;phone:string;email?:string}){return this.customers.create({...body,tenantId});}
 @Get() list(@Headers('x-tenant-id') tenantId:string){return this.customers.list(tenantId);}
 @Get(':id') get(@Headers('x-tenant-id') tenantId:string,@Param('id') id:string){return this.customers.get(tenantId,id);}
}
