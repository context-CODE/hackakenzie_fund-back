import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from './common/common.module';
import { CategoriesModule } from './src/categories/categories.module';

@Module({
  imports: [CommonModule, CategoriesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
