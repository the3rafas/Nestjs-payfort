import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    PaymentModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule {}
