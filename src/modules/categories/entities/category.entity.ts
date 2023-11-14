import { randomUUID } from 'crypto';

export class Category {
  readonly id: string;

  name: string;
  slug: string;

  constructor() {
    this.id = randomUUID();
  }
}
