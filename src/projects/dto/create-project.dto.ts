import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Validate,
} from "class-validator";

import { IsYear } from "../validators/is-year.validator";

export class CreateProjectDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Number })
  @IsInt()
  @Validate(IsYear)
  @IsNotEmpty()
  year: number;

  @ApiProperty({ type: String })
  @IsString()
  type: string = "personal";

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tech: string[] = [];

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isFeatured: boolean = false;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @IsUrl()
  githubLink: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @IsUrl()
  previewLink: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @IsUrl()
  imageLink: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date = new Date();

  @IsDate()
  @Type(() => Date)
  updatedAt: Date = new Date();
}
