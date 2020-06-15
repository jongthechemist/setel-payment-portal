import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';

describe('Payment Controller', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService, ConfigService],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return status CONFIRMED or DECLINED', async () => {
    expect.assertions(1);
    const status = ['CONFIRMED', 'DECLINED'];
    const response = await controller.createPayment('1234');
    expect(status).toContain(response.status);
  });

  it('should return orderUuid', async () => {
    expect.assertions(1);
    const response = await controller.createPayment('1234');
    expect(response.orderUuid).toBe('1234');
  });
});
