export class PaymentResponseDto {
  orderUuid: string;
  status: 'DECLINED' | 'CONFIRMED';
}
