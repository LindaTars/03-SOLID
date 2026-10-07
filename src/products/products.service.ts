import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from './entities/product.entity.js';
import { ProductRepository } from './product.repository.js';
import { IdGenerator } from './utils/IdGenerator.js';

@Injectable()
export class ProductsService {
  private products : Product[] = [];
  private currentId = 1;

  constructor( 
    private readonly repo : ProductRepository, 
    private readonly ids : IdGenerator
  ){}

  create(createProductDto: CreateProductDto) {
    const id = this.resolveId(createProductDto.id)
    return this.repo.save({
      ...createProductDto,
      id
    });
  }

  resolveId(id?: number) {
    if(id != undefined && !this.repo.exist){
      return id
    }
    return this.ids.generate((id) => this.repo.exist(id))
  }

  findAll(): Product[] {
    return this.repo.findAll();
  }

  findOne(id: number) {
    return this.repo.findById(id)
  }

  remove(id: number) {
    const existencia = this.repo.delete(id)

    if(!existencia) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }

    return {message : `Elemento ${id} eliminado correctamente76`}
  }

  update(id: number, updateProductDto : UpdateProductDto) : Product{
    const product = this.repo.update(id, updateProductDto);

    if(!product) {
      throw new NotFoundException(`Producto con ${id} no encontrado`)
    }
    return product;
  }
}
