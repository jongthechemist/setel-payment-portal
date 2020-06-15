import { AuthRequestDto } from './auth.dto';
export interface GuardHost {
  getRequest(): AuthRequestDto;
}
export interface GuardContext {
  switchToHttp(): GuardHost;
}
