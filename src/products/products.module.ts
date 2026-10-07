import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { ProductRepository } from './product.repository.js';
import { IdGenerator } from './utils/IdGenerator.js';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository, IdGenerator],
  exports: [ProductsService],
})
export class ProductsModule {}
