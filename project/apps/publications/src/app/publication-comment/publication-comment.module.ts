import { Module } from '@nestjs/common';

import { PrismaClientModule } from "@project/shared/publications/models";

import { PublicationCommentController } from "./publication-comment.controller";
import { PublicationCommentRepository } from "./publication-comment.repository";
import { PublicationCommentService } from "./publication-comment.service";

import { PublicationModule } from "../publication/publication.module";


@Module({
  imports: [PublicationModule, PrismaClientModule],
  controllers: [PublicationCommentController],
  providers: [PublicationCommentService, PublicationCommentRepository],
})
export class PublicationCommentModule {
}
