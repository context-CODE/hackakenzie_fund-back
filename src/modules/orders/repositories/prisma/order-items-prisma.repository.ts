import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { OrderItemsRepository } from '../order-items.repository';

@Injectable()
export class OrderItemsPrismaRepository implements OrderItemsRepository {
  constructor(private prisma: PrismaService) {}
}
