import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';
import { GuardContext } from './auth.interface';
import { AuthRequestDto } from './auth.dto';

describe('AuthGuard', () => {
  let configService: ConfigService;
  let authGuard: AuthGuard;
  let context: GuardContext;

  beforeEach(() => {
    configService = new ConfigService();
    authGuard = new AuthGuard(configService);
    context = {
      switchToHttp() {
        return {
          getRequest<T>(): T {
            return null;
          },
        };
      },
    };
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should accept if secret match', () => {
    const env = {
      MICROSERVICE_SECRET: 'ABC1234!',
    };
    const requestDto: AuthRequestDto = {
      headers: { authorization: 'ABC1234!' },
    };

    jest
      .spyOn(configService, 'get')
      .mockImplementation((path: string) => env[path]);

    jest.spyOn(context, 'switchToHttp').mockImplementation(() => ({
      getRequest() {
        return requestDto;
      },
    }));

    expect(authGuard.canActivate(context)).toBe(true);
  });

  it("should reject if secret doesn't match", () => {
    const env = {
      MICROSERVICE_SECRET: 'ABC1234!',
    };
    const requestDto: AuthRequestDto = {
      headers: { authorization: '123ABCD!' },
    };

    jest
      .spyOn(configService, 'get')
      .mockImplementation((path: string) => env[path]);

    jest.spyOn(context, 'switchToHttp').mockImplementation(() => ({
      getRequest() {
        return requestDto;
      },
    }));

    expect(authGuard.canActivate(context)).toBe(false);
  });
});
