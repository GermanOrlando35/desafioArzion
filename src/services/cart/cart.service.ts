import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../modules/common/entity/cart';
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
    await this.cartRepository.insert(cart);
    return cart
  }

  async update(id:number,cart:any){
    await this.cartRepository.update(id,cart);
  }

  async findAll(){
    return await this.cartRepository.find();
  }

  async find(id:number){
    return await this.cartRepository.findOne(id, { relations: ["minimart", "cartproducts"] });
  }

  async delete(id:number){
    return await this.cartRepository.delete(id);
  }

  async addProduct(cartId:number, productId:number, cart:any){
    //let cart = await this.find(cartId);
    let product = await this.productService.find(productId);
    let minimartProductByIds = await this.minimartproductService.productHasStockForMinimart(cart.minimart.id,product.id);
    if (minimartProductByIds.stock > 0) {
      let cartProduct:Cartproduct = {
        cartproduct_id: null,
        quantity: 1,
        cart: cart,
        product: product
      };

      cart.cartproducts.push(cartProduct); //add a new element to the cartproduct list and do a cart update
      this.update(cartId,cart);

      //this.cartproductService.save(cartProduct); //directly create a new cartproduct, which represents the intermediate table. Ugly

      //the way to solve it that this uncommented does not work for me

      return this.find(cartId);
    }
  }

  //when a product is removed from a cart, the same thing happens to me as to add
  async deleteProduct (cartId:number, productId:number){
    let cartProduct = await this.cartproductService.findByCartAndProduct(cartId,productId);
    return this.cartproductService.delete(cartProduct.cartproduct_id);
  }
}
