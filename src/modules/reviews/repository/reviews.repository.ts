import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { Review } from '../entities/review.entity';

export abstract class ReviewsRepository {
  abstract create(data: CreateReviewDto): Promise<Review>;
  abstract findReviewsByUser(userId: string): Promise<Review[]>;
  abstract update(data: UpdateReviewDto, id: string): Promise<Review>;
}
