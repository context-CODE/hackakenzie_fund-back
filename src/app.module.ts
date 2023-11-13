import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { CategoriesModule } from './src/categories/categories.module';

@Module({
  imports: [CommonModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
