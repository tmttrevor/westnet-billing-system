import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaCustomerService {
  constructor(private readonly prisma: PrismaService) {}
  create(tenantId:string,input:{name:string;phone:string;email?:string}) {
    return this.prisma.customer.create({ data:{tenantId,...input} });
  }
  list(tenantId:string) { return this.prisma.customer.findMany({where:{tenantId},orderBy:{createdAt:'desc'}}); }
  async get(tenantId:string,id:string) {
    const customer=await this.prisma.customer.findFirst({where:{id,tenantId}});
    if(!customer) throw new NotFoundException('Customer not found');
    return customer;
  }
}
