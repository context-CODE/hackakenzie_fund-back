import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post(':userId/:productId')
  addProduct(
    @Param('productId', new ParseUUIDPipe()) productId: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ) {
    return this.usersService.addProduct(productId, userId);
  }
  @Get(':uuid')
  findOne(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Query('wishlists') wishlists: boolean,
  ) {
    return this.usersService.findOne(uuid, wishlists);
  }

  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @HttpCode(204)
  delete(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.usersService.delete(uuid);
  }
}
