import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FishermenModule } from './fishermen/fishermen.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { FishLotsModule } from './fish-lots/fish-lots.module';
import { BuyersModule } from './buyers/buyers.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { UsersModule } from './users/users.module';
import { DeliveryPartnersModule } from './delivery-partners/delivery-partners.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule, // ✅ DB connection here
    FishermenModule,
    AuthModule,
    FishLotsModule,
    BuyersModule,
    OrdersModule,
    DeliveriesModule,
    UsersModule,
    DeliveryPartnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
