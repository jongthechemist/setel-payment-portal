import {
  CanActivate,
  Injectable,
  Logger
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AuthRequestDto } from './auth.dto';
import { GuardContext } from './auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: GuardContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    Logger.log('validate header', 'AuthGuard')
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request: AuthRequestDto): boolean {
    const secret = this.configService.get<string>('MICROSERVICE_SECRET');
    Logger.log('validate header', 'AuthGuard')
    if (secret === request.headers.authorization) return true;

    return false;
  }
}
