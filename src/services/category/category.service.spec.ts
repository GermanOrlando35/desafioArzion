import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { MockType, repositoryMockFactory } from '../../../test/mock.repository';
import { Category } from '../../modules/common/entity/category';
import { CategoryService } from './category.service';

describe('Category Service', () => {
  let service: CategoryService;
  let repositoryMock: MockType<Repository<Category>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(Category),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<CategoryService>(CategoryService);
    repositoryMock = module.get(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const categoryTest = new Category();
    categoryTest.id = 1;
    categoryTest.name = 'test';

    const categoryInsert = new Category();
    categoryInsert.name = 'test';

    const insertResult = { raw: { insertId: 1 } };

    repositoryMock.insert.mockReturnValue(insertResult);
    repositoryMock.findOne.mockReturnValue(categoryTest);
    const category = await service.save(categoryInsert);

    expect(category).toBeDefined();
    expect(category).toEqual(categoryTest);
  });

  it('should modify the category', async () => {
    const categoryUpdate = new Category();
    categoryUpdate.name = 'test';

    const categoryResult = new Category();
    categoryResult.id = 1;
    categoryResult.name = 'test';

    const updateResult: UpdateResult = new UpdateResult();

    repositoryMock.update.mockReturnValue(updateResult);
    repositoryMock.findOne.mockReturnValue(categoryResult);
    const category = await service.update(1, categoryUpdate);

    expect(category).toBeDefined();
    expect(category).toEqual(categoryResult);
  });

  it('you should get a list of categories', async () => {
    const categoryTest1 = new Category();
    categoryTest1.id = 1;
    categoryTest1.name = 'test1';

    const categoryTest2 = new Category();
    categoryTest2.id = 2;
    categoryTest2.name = 'test2';

    let categoriesTest: Category[] = [];
    categoriesTest.push(categoryTest1);
    categoriesTest.push(categoryTest2);

    repositoryMock.find.mockReturnValue(categoriesTest);
    const categories = await service.findAll();

    expect(categories).toBeDefined();
    expect(categories).toEqual(categoriesTest);
  });

  it('should get a category', async () => {
    const categoryTest = new Category();
    categoryTest.id = 1;
    categoryTest.name = 'test';

    repositoryMock.findOne.mockReturnValue(categoryTest);
    const category = await service.find(1);

    expect(category).toBeDefined();
    expect(category).toEqual(categoryTest);
  });

  it('I should throw an exception', async () => {
    try {
      repositoryMock.findOne.mockReturnValue(undefined);
      const category = await service.find(20);
      expect(category).toBeUndefined();
    } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toBe("Not Found");
    }
  });

});
