import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { MinimartService } from './../src/services/minimart/minimart.service';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Minimart } from './../src/modules/common/entity/minimart';
import { MinimartDTO } from './../src/dtos/minimartDTO';
import { MinimartproductService } from './../src/services/minimartproduct/minimartproduct.service';
import { ProductService } from './../src/services/product/product.service';

describe('Minimart', () => {
  let app: INestApplication;
  let minimartservice: MinimartService = { findAll: () =>
      {  minimarts:[
          {
            id: 1,
            name: "cocoBongo",
            workDays: 0,
            openingTime: 8,
            closingTime: 22,
            address: "1 555",
            logo: "-"
          }
        ]
      }
  };
  //let minimartRepository:Repository<Minimart>;
  //let minimartproductService: MinimartproductService;
  //let productService: ProductService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MinimartService)
      .useValue(minimartservice)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  /*beforeEach(() => {
    minimartservice = new MinimartService();
    minimartRepository = new Repository<Minimart>();
    minimartproductService = new MinimartproductService();
    productService = new ProductService();
  });*/

  it(`/GET minimarts`, () => {
    return request(app.getHttpServer())
      .get('/minimarts')
      .expect(200)
      .expect({
        data: minimartservice.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
