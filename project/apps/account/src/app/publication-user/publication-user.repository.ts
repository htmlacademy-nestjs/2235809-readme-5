import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/shared/core';

import { PublicationUserEntity } from './publication-user.entity';
import { PublicationUserModel } from './publication-user.model';

@Injectable()
export class PublicationUserRepository extends BaseMongoRepository<
  PublicationUserEntity,
  PublicationUserModel
> {
  constructor(
    @InjectModel(PublicationUserModel.name)
    private publicationUserModel: Model<PublicationUserModel>
  ) {
    super(publicationUserModel, PublicationUserEntity.fromObject);
  }

  public async findByEmail(
    email: string
  ): Promise<PublicationUserEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return document ? this.createEntityFromDocument(document) : null;
  }

  public async findManyByIds(ids: string[]): Promise<(PublicationUserEntity | string)[]> {
    const documents = await this.publicationUserModel.find({
      _id: {
        $in: ids
      }
    }).exec();

    return documents.map((el, idx) => {
      const entity = this.createEntityFromDocument(el);
      if (!entity) {
        return ids[idx];
      }
      return entity;
    });
  }
}
