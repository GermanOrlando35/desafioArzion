import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './modules/common/common.module';
import { Minimart } from './modules/common/entity/minimart';
import { Product } from './modules/common/entity/product';
import { Category } from './modules/common/entity/category';

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
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
