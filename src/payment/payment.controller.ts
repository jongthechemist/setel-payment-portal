import { Controller, Post, Param, Logger, UseGuards } from '@nestjs/common';
import { PaymentResponseDto } from './payment.dto';
import { PaymentService } from './payment.service';
import { AuthGuard } from '../auth/auth.guard';


@Controller('payment')
export class PaymentController {
  
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Post(':id')
  async createPayment(
    @Param('id') orderUuid: string
  ): Promise<PaymentResponseDto> {
    const paymentSuccessful = await this.paymentService.pay(orderUuid);
    const status = paymentSuccessful ? 'CONFIRMED' : 'DECLINED';
    Logger.log('Payment status: ' + status, 'PaymentController');
    return {
      orderUuid,
      status,
    };
  }
}
