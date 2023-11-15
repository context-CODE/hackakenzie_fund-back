import { randomUUID } from 'crypto';

export class Image {
  readonly id: string;

  title: string;
  isCover: boolean;
  path: string;
  cloudinaryId: string;

  constructor() {
    this.id = randomUUID();
  }
}
