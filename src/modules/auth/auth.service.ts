import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validatedUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findByEmail(userEmail);

    if (user) {
      const passwordMatch = await compare(userPassword, user.password);

      if (passwordMatch) return { email: user.email };
    }

    return null;
  }

  async login(email: string) {
    const user = await this.userService.findByEmail(email);

    // if (!user.isEmailVerified) {
    //   await this.userService.sendConfirmationEmail(user.email, user.id);
    // }

    return { token: this.jwtService.sign({ email }, { subject: user.id }) };
  }

  createToken(service: string, userId: string) {
    return this.jwtService.sign(
      { service },
      { subject: userId, expiresIn: '1h' },
    );
  }

  verifyToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY,
    });

    if (typeof payload === 'object' && 'service' in payload) {
      return payload;
    }

    throw new UnauthorizedException('Token invalid/expired!');
  }
}
