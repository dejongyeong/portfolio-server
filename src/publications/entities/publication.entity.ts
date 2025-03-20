import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Publication {
  @ApiProperty({ type: String, format: "uuid" })
  id: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  abstract: string;

  @ApiProperty({ type: [String] })
  keywords: string[];

  @ApiProperty({ type: String })
  mainAuthor: string;

  @ApiProperty({ type: [String] })
  coAuthors: string[];

  @ApiPropertyOptional({ type: String })
  link: string;

  @ApiPropertyOptional({ type: String })
  publisher: string;

  @ApiPropertyOptional({ type: Boolean, default: false })
  published: boolean;

  @ApiPropertyOptional({ type: Date })
  publishedAt: Date;

  @ApiPropertyOptional({ type: Date, default: new Date() })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt: Date;
}
