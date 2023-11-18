import { JsonValue } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';
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

  constructor() {
    this.id = randomUUID();
  }
}
