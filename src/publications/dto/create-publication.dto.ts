import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";

export class CreatePublicationDto {
  @ApiProperty({ type: String })
  @IsString()
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  abstract: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  keywords: string[] = [];

  @ApiProperty({ type: String })
  @IsString()
  mainAuthor: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  coAuthors: string[] = [];

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @IsUrl()
  link: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  publisher: string;

  @ApiPropertyOptional({ type: Boolean, default: false })
  @IsOptional()
  @IsBoolean()
  published: boolean = false;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publishedAt: Date;
}
