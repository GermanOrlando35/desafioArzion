import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../../../test/mock.repository';
import { MinimartService } from './minimart.service';
import { ProductService } from '../product/product.service';
import { MinimartproductService } from '../minimartproduct/minimartproduct.service';
import { Minimart } from '../../modules/common/entity/minimart';
import { Product } from '../../modules/common/entity/product';
import { Minimartproduct } from '../../modules/common/entity/minimartproduct';

describe('MinimartService', () => {
  let service: MinimartService;
  let repositoryMock: MockType<Repository<Minimart>>;
  let minimartproductService: MinimartproductService;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MinimartService,
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
      ],
    }).compile();

    service = module.get<MinimartService>(MinimartService);
    repositoryMock = module.get(getRepositoryToken(Minimart));
    minimartproductService = module.get<MinimartproductService>(MinimartproductService);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('you should get the convenience stores according to business hours', async () => {
    const minimartproductTest1 = new Minimart();
    minimartproductTest1.id = 1;
    minimartproductTest1.name = 'test1';
    minimartproductTest1.workDays = '0';
    minimartproductTest1.openingTime = 9;
    minimartproductTest1.closingTime = 22;
    minimartproductTest1.address = '49 321';
    minimartproductTest1.logo = '-';

    const minimartTest2 = new Minimart();
    minimartTest2.id = 2;
    minimartTest2.name = 'test2';
    minimartTest2.workDays = '0';
    minimartTest2.openingTime = 8;
    minimartTest2.closingTime = 16;
    minimartTest2.address = '25 123';
    minimartTest2.logo = '-';

    let minimartsTest: Minimart[] = [];
    minimartsTest.push(minimartproductTest1);
    minimartsTest.push(minimartTest2);

    repositoryMock.find.mockReturnValue(minimartsTest);
    const minimarts = await service.findByHours(14);

    expect(minimarts).toBeDefined();
    expect(minimarts).toEqual(minimartsTest);
  });

  //Como resolver si tengo mas de una llamada al mismo servicio??
  it('should return the products available for a minimart', async () => {
    const minimart: Minimart = new Minimart();
    minimart.id = 1;
    minimart.name = 'test';
    minimart.workDays = '0';
    minimart.openingTime = 8;
    minimart.closingTime = 22;
    minimart.address = '10 587';
    minimart.logo = '-';
    let minimartproductsNew: Minimartproduct[] = [];
    minimart.minimartproducts = minimartproductsNew;

    const minimartproductOne: Minimartproduct = new Minimartproduct();
    minimartproductOne.minimartproduct_id = 1;
    minimartproductOne.stock = 10;

    const minimartproductTwo: Minimartproduct = new Minimartproduct();
    minimartproductTwo.minimartproduct_id = 2;
    minimartproductTwo.stock = 12;

    minimart.minimartproducts.push(minimartproductOne);
    //minimart.minimartproducts.push(minimartproductTwo);

    const minimartproductTest1: Minimartproduct = new Minimartproduct();
    minimartproductTest1.minimartproduct_id = 1;
    minimartproductTest1.stock = 10;
    minimartproductTest1.product = new Product();
    minimartproductTest1.minimart = minimart;
    minimartproductTest1.product.id = 1;
    minimartproductTest1.product.name = 'Cold Ice Tea';
    minimartproductTest1.product.pricing = 25;
    minimartproductTest1.product.description = 'Cold Ice Tea';

    const minimartproductTest2: Minimartproduct = new Minimartproduct();
    minimartproductTest2.minimartproduct_id = 2;
    minimartproductTest2.stock = 12;
    minimartproductTest2.product = new Product();
    minimartproductTest2.minimart = minimart;
    minimartproductTest2.product.id = 2;
    minimartproductTest2.product.name = 'Coffee flavoured milk';
    minimartproductTest2.product.pricing = 30;
    minimartproductTest2.product.description = 'Coffee flavoured milk';

    let minimartproductsTest = [];
    minimartproductsTest.push(minimartproductTest1);
    //minimartproductsTest.push(minimartproductTest2);

    repositoryMock.find.mockReturnValue([minimart]);
    jest.spyOn(minimartproductService, 'find').mockResolvedValue(minimartproductTest1);
    //jest.spyOn(minimartproductService, 'find').mockResolvedValue(minimartproductTest2);
    const response = await service.findProdutcsByMinimart(1);

    expect(response).toBeDefined();
    expect(response).toEqual(minimartproductsTest);
  });

  it('I should return a product', async () => {
    const minimart: Minimart = new Minimart();
    minimart.id = 1;
    minimart.name = 'test';
    minimart.workDays = '0';
    minimart.openingTime = 8;
    minimart.closingTime = 22;
    minimart.address = '10 587';
    minimart.logo = '-';

    const productTest = new Product();
    productTest.id = 1;
    productTest.name = 'Cold Ice Tea';
    productTest.pricing = 25;
    productTest.description = 'Cold Ice Tea';

    const minimartproductTest: Minimartproduct = new Minimartproduct();
    minimartproductTest.minimartproduct_id = 1;
    minimartproductTest.stock = 10;
    minimartproductTest.product = productTest;
    minimartproductTest.minimart = minimart;

    jest.spyOn(minimartproductService, 'findByMinimartIdAndProductId').mockResolvedValue(minimartproductTest);
    jest.spyOn(productService, 'find').mockResolvedValue(productTest);
    const product = await service.findProductByIdInMinimart(1,1);

    expect(product).toBeDefined();
    expect(product).toEqual(productTest);
  });
});
