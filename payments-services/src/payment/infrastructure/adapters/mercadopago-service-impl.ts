import { MercadoPagoConfig, Preference } from "mercadopago";

import {MercadoPagoService, PaymentResult } from "../../domain/services/mercadopago-service";
import config from "../../../config/config";

export class MercadoPagoServiceImpl implements MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: config.mercadopagoAccessToken as string,
    });
  }

  async createPayment(user_id: string, amount: number, description: string): Promise<PaymentResult> {
    const preference = new Preference(this.client);

    const preferenceData: any = {
      items: [
        {
          title: description,
          unit_price: amount,
          quantity: 1,
        },
      ],
      back_urls: {
        success: `http://localhost:3000/api/v1/payments/success?amount=${amount}&user_id=${user_id}`,
        failure: "http://localhost:3000/api/v1/payments/failure",
        pending: "http://localhost:3000/api/v1/payments/pending",
      },
      auto_return: "approved" as const,
    };

    const result = await preference.create({ body: preferenceData });

    return {
      id: result.id,
      init_point: result.init_point,
    };
  }
}
