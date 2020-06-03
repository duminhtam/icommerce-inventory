import { Test, TestingModule } from '@nestjs/testing';
import { SlugService } from './slug.service';

describe('SlugService', () => {
  let service: SlugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlugService],
    }).compile();

    service = module.get<SlugService>(SlugService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be return slug as defined', () => {
    const data = SlugService.createSlug('Apple Iphone X')
    expect(data).toEqual('apple-iphone-x');
  });


});
