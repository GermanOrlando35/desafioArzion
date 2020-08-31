import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { MinimartService } from './../src/services/minimart/minimart.service';
import { INestApplication } from '@nestjs/common';
import { Minimart } from './../src/modules/common/entity/minimart';

describe('Minimart', () => {
  let app: INestApplication;
  let minimartService = { findAll: () => [{}] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MinimartService)
      .useValue(minimartService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET minimarts`, () => {
    return request(app.getHttpServer())
      .get('/minimarts')
      .expect(200)
      .expect({
        data: minimartService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
