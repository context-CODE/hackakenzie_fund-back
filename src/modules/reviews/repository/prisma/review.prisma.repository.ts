import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewsRepository } from '../reviews.reposotory';
import { PrismaService } from 'src/database/prisma.service';
import { Review } from '../../entities/review.entity';
import { CreateReviewDto } from '../../dto/create-review.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateReviewDto } from '../../dto/update-review.dto';

@Injectable()
export class ReviewsPrismaRepository implements ReviewsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReviewDto): Promise<Review> {
    const review = new Review();
    Object.assign(review, { ...data });

    const newReview = await this.prisma.reviews.create({ data: { ...review } });

    return plainToInstance(Review, newReview);
  }
  async findReviewsByUser(userId: string): Promise<Review[]> {
    const findReviewsByUser = await this.prisma.reviews.findMany({
      where: { userId },
    });

    return plainToInstance(Review, findReviewsByUser);
  }
  async update(data: UpdateReviewDto, id: string): Promise<Review> {
    try {
      const findReviewsByUser = await this.prisma.reviews.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });
      return plainToInstance(Review, findReviewsByUser);
    } catch (error) {
      throw new NotFoundException('Review not found');
    }
  }
}
