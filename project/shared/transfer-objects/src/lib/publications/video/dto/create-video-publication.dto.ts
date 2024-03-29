import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Validate
} from 'class-validator';

import { PUBLICATION, PublicationTagsValidator, TagTitleValidator } from '@project/shared/core';

import { ALLOWED_HOSTS, MESSAGES, PROPERTY } from '../../publication.constant';

export class CreateVideoPublicationDTO {
  userId: string;
  
  @ApiProperty(PROPERTY.NAME)
  @IsString()
  @Length(PROPERTY.NAME.minimum, PROPERTY.NAME.maximum)
  name: string;

  @ApiProperty(PROPERTY.VIDEO_LINK)
  @IsUrl(
    { host_whitelist: ALLOWED_HOSTS },
    { message: MESSAGES.WRONG_LINK }
  )
  link: string;

  @ApiProperty(PROPERTY.TAGS)
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Validate(PublicationTagsValidator, {
    message: `Tags must be lower than ${PUBLICATION.TAGS.MAX}`
  })
  @Validate(TagTitleValidator, {
    each: true
  })
  tags?: string[];
}
