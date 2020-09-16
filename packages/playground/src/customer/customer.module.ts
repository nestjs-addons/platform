import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { CustomerController } from './customer.controller';

@Module({
  imports: [InMemoryDBModule.forFeature('customer')],
  controllers: [CustomerController],
  providers: [],
})
export class CustomerModule {}
