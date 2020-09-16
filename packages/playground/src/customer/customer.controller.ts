import { Controller } from '@nestjs/common';
import {
  InMemoryDBService,
  InjectInMemoryDBService,
  InMemoryDBEntityController,
} from '@nestjs-addons/in-memory-db';
import { Customer } from './customer';

@Controller('api/customers')
export class CustomerController extends InMemoryDBEntityController<Customer> {
  constructor(
    @InjectInMemoryDBService('customer')
    protected readonly inMemoryDBService: InMemoryDBService<Customer>,
  ) {
    super(inMemoryDBService);
  }
}
