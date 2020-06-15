import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true or false', async () => {
    expect.assertions(1);
    const options = [true, false];
    const result = await service.pay('1234');
    expect(options).toContain(result);
  });
});
