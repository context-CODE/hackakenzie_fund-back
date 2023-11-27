import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class UserOwnerMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.uuid;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new ForbiddenException();

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY,
    });

    if (payload.sub !== id) {
      throw new UnauthorizedException();
    }

    next();
  }
}
