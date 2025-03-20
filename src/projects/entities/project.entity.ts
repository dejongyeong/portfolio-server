import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Project {
  @ApiProperty({ type: String, format: "uuid" })
  id: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Number, minimum: 1000, maximum: 9999 })
  year: number;

  @ApiProperty({ type: String, default: "personal" })
  type: string;

  @ApiProperty({ type: [String] })
  tech: string[];

  @ApiProperty({ type: Boolean, default: false })
  isFeatured: boolean;

  @ApiPropertyOptional({ type: String })
  githubLink: string;

  @ApiPropertyOptional({ type: String })
  previewLink: string;

  @ApiPropertyOptional({ type: String })
  imageLink: string;

  @ApiPropertyOptional({ type: Date, default: new Date() })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt: Date;
}
