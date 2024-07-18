import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response } from 'express';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.stripeSecret);

  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { currency, items } = paymentSessionDto;
    const lineItems = items.map((item) => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // $10.00 - 1000 / 10 = 10.00
        },
        quantity: item.quantity,
      };
    });

    const session = await this.stripe.checkout.sessions.create({
      //TODO: Colocar aquí el ID de mi orden
      payment_intent_data: {
        metadata: {},
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3003/payments/success', //`${envs.frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: 'http://localhost:3003/payments/cancel', //`${envs.frontendUrl}/cancel`,
    });

    return session;
  }

  async stripeWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    //* Testing
    // const endpointSecret = 'whsec_2dd40fba5cbf386c76608f6350b7a264c887b0e190964373a5e0527479ca89af';

    //* Real - Obtener de: https://dashboard.stripe.com/test/webhooks
    const endpointSecret = 'whsec_zCTwnnODulodyExMW9iJy18rrsPeTuz4';

    try {
      event = this.stripe.webhooks.constructEvent(
        req['rawBody'],
        sig,
        endpointSecret,
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }

    switch (event.type) {
      case 'charge.succeeded':
        //TODO: Llamar nuestro microservicio
        console.log(event);
        break;

      default:
        console.log(`Event ${event.type} not handled`);
        break;
    }

    return res.status(200).json({ sig });
  }
}
