import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}
  @Query(() => String)
  hi() {
    return 'hi';
  }
  @Mutation(() => String)
  createPayment() {
    // @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
    return this.paymentService.create();
  }
}
