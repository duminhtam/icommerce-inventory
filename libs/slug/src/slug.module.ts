import { Module } from '@nestjs/common';
import { SlugService } from './slug.service';

@Module({
  providers: [SlugService],
  exports: [SlugService],
})
export class SlugModule {}
