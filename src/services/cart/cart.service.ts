import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../modules/common/entity/cart';
import { CartDTO } from '../../dtos/cartDTO';
import { Product } from '../../modules/common/entity/product';
import { Cartproduct } from '../../modules/common/entity/cartproduct';
import { MinimartproductService } from '../../services/minimartproduct/minimartproduct.service';
import { CartproductService } from '../../services/cartproduct/cartproduct.service';
import { ProductService } from '../../services/product/product.service';

@Injectable()
export class CartService {

  @InjectRepository(Cart)
  private readonly cartRepository:Repository<Cart>;

  @Inject()
  private readonly minimartproductService:MinimartproductService;

  @Inject()
  private readonly cartproductService:CartproductService;

  @Inject()
  private readonly productService:ProductService;

  async save(cart:any){
    const insert = await this.cartRepository.insert(cart);
    return await this.find(insert.raw.insertId);
  }

  async update(id:number,cart:any){
    await this.cartRepository.update(id,cart);
  }

  async findAll(){
    return await this.cartRepository.find({ relations: ["minimart", "cartproducts"] });
  }

  async find(id:number){
    return await this.cartRepository.findOne(id, { relations: ["minimart", "cartproducts"] });
  }

  async delete(id:number){
    return await this.cartRepository.delete(id);
  }

  async addProduct(cartId:number, product:any){
    let cart = await this.find(cartId);
    let {id: productId} = product

    if (cart === undefined || productId === undefined) {
      throw new NotFoundException();
    }

    let {minimart} = cart;
    let {id: minimartId} = minimart;

    let minimartProductByIds = await this.minimartproductService.productHasStockForMinimart(minimartId,productId);

    if (minimartProductByIds.stock > 0) {
      let cartProduct:Cartproduct = {
        cartproduct_id: null,
        quantity: 1,
        cart: cart,
        product: product
      };

      let cartproductNew = await this.cartproductService.save(cartProduct); //new association between product and cart

      //I have a problem with the typeorm because the update does not work for me
      //cart.cartproducts.push(cartproductNew); //add a new element to the cartproduct list and do a cart update
      //await this.update(cartId,cart);

      const cartFind: Cart = await this.find(cartId);
      if (cartFind) {
        const cartDTO: CartDTO = new CartDTO(cartFind);
        return cartDTO;
      }
      throw new NotFoundException();
    }

    throw new ConflictException();
  }

  //when a product is removed from a cart, the same thing happens to me as to add
  async deleteProduct (cartId:number, productId:number){
    let cartProduct = await this.cartproductService.findByCartAndProduct(cartId,productId);
    return this.cartproductService.delete(cartProduct.cartproduct_id);
  }
}
