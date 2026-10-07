import { Injectable } from "@nestjs/common";
import { Product } from "./entities/product.entity.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";

@Injectable()
export class ProductRepository {
    private readonly products = new Map<number, Product>();

    exist(id : number) : boolean {
        return this.products.has(id);
    }

    findById(id : number) : Product | undefined {
        return this.products.get(id);
    }

    save(product : Product) : Product {
        this.products.set(product.id, product);
        return product;
    }

    findAll() : Product[] {
        return [ ...this.products.values() ]
    }

    delete(id : number) : Product | any {
        return this.products.delete(id); 
    }

    update(id : number, changes : UpdateProductDto) : Product | undefined {
        const product = this.products.get(id);
        if(!product) return undefined;

        const update = { ...product, ...changes, id };
        this.products.set(id, update);
        return update;
        
    }
} 