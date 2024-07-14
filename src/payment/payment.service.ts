import { Injectable } from '@nestjs/common';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  private url =
    this.appService.get('API_ENVIRONMENT') === 'development'
      ? 'https://sbcheckout.payfort.com/FortAPI/paymentPage'
      : '';
  private access_code =process.env.ACCESS_CODE
  private merchant_identifier = process.env.MERCHANT_IDENTIFIER
  private shaRequestPhrase = process.env.REQUESTPHRASE
  constructor(private appService: ConfigService) {}
  async create() {
    // const merchant_reference = Math.floor(Math.random() * 9);
    const params = {
      access_code: this.access_code,
      language: 'en',
      merchant_identifier: this.merchant_identifier,
    };
    const signature = this.createSignature(params);
    return signature;
    params['signature'] = signature;
    const a = await axios.post(
      this.url,
      {},
      {
        params,
      },
    );
    console.log(a.data);
    return '6456+85';
  }

  // createSignature(data: {}) {
  //   const keys = Object.keys(data);
  //   let signature = '';

  //   for (const key in keys) {
  //     signature = `${signature}${keys[key]}=${data[keys[key]]}`;
  //   }
  //   const lastSignature =
  //     this.shaRequestPhrase + signature + this.shaRequestPhrase;

  //   // const hashedSignature = crypto
  //   //   .createHash('SHA-256')
  //   //   .update(lastSignature)
  //   //   .digest('hex');

  //   return signature;
  // }
  createSignature(requestParam: any, isResponseParam = false): string {
    const keys = [];
    let signatureText = '';
    for (const key in requestParam) {
      keys.push(key);
    }
    keys.sort();
    for (const key of keys) {
      signatureText = `${signatureText}${key}=${requestParam[key]}`;
    }
    const requestPhrase = isResponseParam
      ? this.shaRequestPhrase
      : this.shaRequestPhrase;
    const finalSignature = `${requestPhrase}${signatureText}${requestPhrase}`;
    const hashedSignature = crypto
      .createHash('SHA-256')
      .update(finalSignature)
      .digest('hex');
    return hashedSignature;
  }
}
