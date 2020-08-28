import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './modules/common/common.module';

import { Minimart } from './modules/common/entity/minimart';
import { Product } from './modules/common/entity/product';
import { Category } from './modules/common/entity/category';
import { Cart } from './modules/common/entity/cart';
import { Minimartproduct } from './modules/common/entity/minimartproduct';
import { Cartproduct } from './modules/common/entity/cartproduct';

import { MinimartService } from './services/minimart/minimart.service';
import { MinimartController } from './controller/minimart/minimart.controller';
import { CategoryService } from './services/category/category.service';
import { CategoryController } from './controller/category/category.controller';
import { ProductService } from './services/product/product.service';
import { ProductController } from './controller/product/product.controller';
import { CartService } from './services/cart/cart.service';
import { CartController } from './controller/cart/cart.controller';
import { MinimartproductService } from './services/minimartproduct/minimartproduct.service';
import { CartproductService } from './services/cartproduct/cartproduct.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'desafioarzion',
      entities: [
        Minimart,
        Product,
        Category,
        Cart,
        Minimartproduct,
        Cartproduct
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Minimart, Product, Category, Cart, Minimartproduct, Cartproduct]),
    CommonModule,
  ],
  controllers: [AppController, MinimartController, CategoryController, ProductController, CartController],
  providers: [AppService, MinimartService, CategoryService, ProductService, CartService, MinimartproductService, CartproductService]
})
export class AppModule {}
