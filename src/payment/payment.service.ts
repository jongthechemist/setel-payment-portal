import { Injectable, Logger } from '@nestjs/common';
import { delay } from '../helpers/timer';
import { pickRandom } from '../helpers/random';

@Injectable()
export class PaymentService {
  async pay(orderUuid: string): Promise<boolean> {
    Logger.log(`Paying order ${orderUuid}`, 'PaymentService')
    await delay(3000);
    const paymentSuccessful = pickRandom<boolean>(true, false);
    return paymentSuccessful;
  }
}
