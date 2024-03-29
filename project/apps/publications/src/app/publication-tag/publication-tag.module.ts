import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/publications/models';

import { PublicationTagController } from "./publication-tag.controller";
import { PublicationTagRepository } from "./publication-tag.repository";
import { PublicationTagService } from "./publication-tag.service";


@Module({
  imports: [PrismaClientModule],
  providers: [PublicationTagRepository, PublicationTagService],
  controllers: [PublicationTagController],
  exports: [PublicationTagService]
})
export class PublicationTagModule {
}
