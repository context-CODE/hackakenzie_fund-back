import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Inject,
  HttpCode,
  forwardRef,
  Controller,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateResetTokenDto } from './dto/create-reset-token.dto';
import { UpdateResetTokenDto } from './dto/update-reset-token.dto';
import { ConfirmationTokenDto, resetTokenDto } from '../users/dto/tokens.dto';

@Controller('')
export class MailServerController {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}

  @Get('confirm_email/:confirmationToken')
  async userConfirmationEmail(
    @Param() { confirmationToken }: ConfirmationTokenDto,
  ) {
    const message = await this.userService.confirmationEmail(confirmationToken);
    return { message };
  }

  @HttpCode(200)
  @Post('reset_password')
  async sendResetPasswordEmail(@Body() { email }: CreateResetTokenDto) {
    const message = await this.userService.sendEmailResetPassword(email);
    return { message };
  }

  @Patch('reset_password/:resetToken')
  async updateResetPassword(
    @Param() { resetToken }: resetTokenDto,
    @Body() { password }: UpdateResetTokenDto,
  ) {
    const message = await this.userService.resetPassword(password, resetToken);
    return { message };
  }
}
