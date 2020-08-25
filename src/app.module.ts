import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './modules/common/common.module';
import { Minimart } from './modules/common/entity/minimart';
import { Product } from './modules/common/entity/product';
import { Category } from './modules/common/entity/category';
import { MinimartService } from './services/minimart/minimart.service';
import { MinimartController } from './controller/minimart/minimart.controller';
import { CategoryService } from './services/category/category.service';
import { CategoryController } from './controller/category/category.controller';
import { ProductService } from './services/product/product.service';
import { ProductController } from './controller/product/product.controller';

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
        Category
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Minimart, Product, Category]),
    CommonModule,
  ],
  controllers: [AppController, MinimartController, CategoryController, ProductController],
  providers: [AppService, MinimartService, CategoryService, ProductService],
})
export class AppModule {}
