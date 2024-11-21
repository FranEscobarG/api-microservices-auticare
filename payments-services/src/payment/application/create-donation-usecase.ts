import { MercadoPagoService } from "../domain/services/mercadopago-service";

class CreateDonacionUseCase {
  constructor(private mercadoPagoService: MercadoPagoService) {}

  async execute(userId: string, amount: number): Promise<{ init_point: string | undefined }> {
    const paymentResult = await this.mercadoPagoService.createPayment(
      userId,
      amount,
      "Donación"
    );

    return {
      init_point: paymentResult.init_point,
    };
  }
}

export default CreateDonacionUseCase;
