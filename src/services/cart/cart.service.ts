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
import { VoucherService } from '../../services/voucher/voucher.service';

import { Perday } from '../../modules/common/entity/perday';

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

  @Inject()
  private readonly voucherService:VoucherService;

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

  async findProductByCart(cart: Cart){
    let products = [];
    const {cartproducts} = cart;
    for (let i = 0; i < cartproducts.length; i++) {
      const cartProduct = await this.cartproductService.find(cartproducts[i].cartproduct_id);
      const quantity = {quantity:cartProduct.quantity};
      const product = Object.assign(cartProduct.product, quantity) //We keep the amount
      products.push(product);
    }
    return products;
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

  //Be able to check the validity of a Voucher code on said virtual cart. Calculate discounts and return both original and discounted prices.
  async validateVoucher (cartId:number, codeVoucher:string){

    const cart = await this.find(cartId);
    const voucher = await this.voucherService.findByCode(codeVoucher);
    const products = await this.findProductByCart(cart);

    if ( (voucher.minimart.id === cart.minimart.id) && ( (voucher.validityPeriodFrom < cart.dateArmed) && (cart.dateArmed < voucher.validityPeriodUntil) ) ){
      let totalPriceWithDiscounts: number = 0;
      let totalPriceWithoutDiscounts: number = 0;
      for (let p = 0; p < products.length; p++) {
        let priceAccordingToVoucher: number = voucher.hasDiscounts(products[p], cart);
        totalPriceWithDiscounts = totalPriceWithDiscounts + priceAccordingToVoucher;
        totalPriceWithoutDiscounts = totalPriceWithoutDiscounts + products[p].pricing;
      }

      const response = {
        totalPriceWithDiscounts: totalPriceWithDiscounts,
        totalPriceWithoutDiscounts: totalPriceWithoutDiscounts
      }

      return response;
    }

    throw new ConflictException();

  }
}
