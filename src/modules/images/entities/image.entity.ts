import { randomUUID } from 'crypto';
import { Product } from 'src/modules/products/entities/product.entity';

export class Image {
  readonly id: string;

  title: string;
  isCover: boolean;
  path: string;
  cloudinaryId: string;

  readonly product: Product;

  constructor() {
    this.id = randomUUID();
  }
}
