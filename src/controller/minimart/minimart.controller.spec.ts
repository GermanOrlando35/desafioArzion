import { Test, TestingModule } from '@nestjs/testing';
import { MinimartController } from './minimart.controller';
import { MinimartService } from '../../services/minimart/minimart.service';
import { Product } from '../../modules/common/entity/product';

describe('MinimartController', () => {
  let minimartcontroller: MinimartController;
  let minimartservice: MinimartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinimartController],
      providers: [MinimartService]
    }).compile();

    minimartcontroller = module.get<MinimartController>(MinimartController);
    minimartservice = module.get<MinimartService>(MinimartService);
    //minimartservice = await module.resolve(MinimartService);
  });

  /*it('should be defined', () => {
    expect(minimartcontroller).toBeDefined();
  });*/

  describe('getProductByIdInMinimart', () => {
    it('should return a product', async () => {
      const result = {id:1, name:"Cold Ice Tea", pricing:70, description:"Cold Ice Tea"};
      //const result:Product = {id:1, name:"Cold Ice Tea", pricing:70, description:"Cold Ice Tea" ,category:null, minimartproducts:null, cartproducts:null};
      /*const result = (): Promise<{ id: number, name: string, pricing: number, description: string }> => {
        return new Promise(function (resolve) {
          resolve({id:1, name:"Cold Ice Tea", pricing:70, description:"Cold Ice Tea"});
        });
      };*/
      //jest.spyOn(minimartservice, 'findProductByIdInMinimart').mockImplementation(() => Promise.resolve(result));
      jest.spyOn(minimartservice, 'findProductByIdInMinimart').mockImplementation(() => result);

      expect(await minimartcontroller.getProductByIdInMinimart(expect.anything())).toBe(result);
    });
  });

});
