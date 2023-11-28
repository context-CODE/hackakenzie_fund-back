export class Review {
  readonly id: string;
  rating: number;
  title: string;
  description: string;
  likes: number;
  createdAt: Date;
  status: 'analyzing' | 'approved' | 'rejected';
  userId: string;
  productId: string;
}
