import { randomUUID } from 'crypto';
import { JsonValue } from '@prisma/client/runtime/library';
import { Stock } from 'src/modules/stock/entities/stock.entity';
import { Category } from 'src/modules/categories/entities/category.entity';

export class Product {
  readonly id: string;

  name: string;
  slug: string;
  price: number;
  description: string;
  color: string;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  specifications: JsonValue;

  readonly category: Category;
  readonly stock: Stock;

  constructor() {
    this.id = randomUUID();
  }
}
