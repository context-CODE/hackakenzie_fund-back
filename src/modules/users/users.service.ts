import {
  ConflictException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';
import { AuthService } from '../auth/auth.service';
import { MailServerService } from '../mail-server/mail-server.service';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @Inject(forwardRef(() => MailServerService))
    private mailServerService: MailServerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.userRepository.findByEmail(createUserDto.email);

    if (findUser) throw new ConflictException('Email already exists');

    const user = await this.userRepository.create(createUserDto);

    const message = await this.sendConfirmationEmail(user.email, user.id);

    return { message };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
  }

  async sendConfirmationEmail(email: string, userId: string) {
    const confirmationToken = this.authService.createToken(
      'confirmation email',
      userId,
    );

    await this.userRepository.updateToken({ confirmationToken }, userId);
    const partialToken = confirmationToken.split('.')[2];

    const confirmationEmailTemplate =
      this.mailServerService.confirmationEmailTemplate(partialToken, email);

    await this.mailServerService.sendEmail(confirmationEmailTemplate);

    return 'User was registered successfully! Please check your email.';
  }

  async confirmationEmail(confirmationToken: string) {
    const user = await this.userRepository.findByToken({ confirmationToken });

    this.authService.verifyToken(user.confirmationToken);

    await this.userRepository.setIsEmailVerified(user.id);

    return 'Email verified successfully';
  }

  async sendEmailResetPassword(email: string) {
    const user = await this.findByEmail(email);

    const resetToken = this.authService.createToken('reset password', user.id);

    await this.userRepository.updateToken({ resetToken }, user.id);
    const partialToken = resetToken.split('.')[2];

    const resetPasswordTemplate = this.mailServerService.resetPasswordTemplate(
      partialToken,
      email,
    );

    return await this.mailServerService.sendEmail(resetPasswordTemplate);
  }

  async resetPassword(password: string, resetToken: string) {
    const user = await this.userRepository.findByToken({ resetToken });

    this.authService.verifyToken(user.resetToken);

    await this.userRepository.updatePassword(user.id, password);
    return 'Password successfully updated';
  }
}
