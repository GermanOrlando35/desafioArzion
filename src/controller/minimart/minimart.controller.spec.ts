import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../../../test/mock.repository';
import { MinimartController } from './minimart.controller';
import { MinimartService } from '../../services/minimart/minimart.service';
import { Product } from '../../modules/common/entity/product';
import { Category } from '../../modules/common/entity/category';
import { Minimartproduct } from '../../modules/common/entity/minimartproduct';
import { Cartproduct } from '../../modules/common/entity/cartproduct';
import { Minimart } from '../../modules/common/entity/minimart';
import { ProductService } from '../../services/product/product.service';
import { MinimartproductService } from '../../services/minimartproduct/minimartproduct.service';

describe('MinimartController', () => {
  let minimartcontroller: MinimartController;
  let minimartservice: MinimartService;
  let repositoryMock: MockType<Repository<Minimart>>;
  let minimartproductService: MinimartproductService;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinimartController],
      providers: [
        MinimartService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(Minimart),
          useFactory: repositoryMockFactory,
        },
        MinimartproductService,
        {
          provide: getRepositoryToken(Minimartproduct),
          useFactory: repositoryMockFactory,
        },
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useFactory: repositoryMockFactory,
        }
      ]
    }).compile();

    minimartcontroller = module.get<MinimartController>(MinimartController);
    minimartservice = module.get<MinimartService>(MinimartService);
    repositoryMock = module.get(getRepositoryToken(Minimart));
    minimartproductService = module.get<MinimartproductService>(MinimartproductService);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(minimartcontroller).toBeDefined();
  });

  describe('getProductByIdInMinimart', () => {
    it('should return a product', async () => {
      const product: Product = {id:1, name:"Cold Ice Tea", pricing:70, description:"Cold Ice Tea" ,category:null, minimartproducts:null, cartproducts:null};

      jest.spyOn(minimartservice, 'findProductByIdInMinimart').mockResolvedValueOnce(product);

      const result = await minimartcontroller.getProductByIdInMinimart(1,1);
      const expected = {
        success: true,
        data: {product},
        errors: [],
        warninigs: []
      };
      expect(result).toStrictEqual(expected);
    });
  });

});
