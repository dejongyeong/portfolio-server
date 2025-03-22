import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String, format: "uuid" })
  id: string;

  @ApiProperty({ type: String, format: "email" })
  email: string;

  @Exclude()
  password: string;

  @ApiPropertyOptional({ type: Date, default: new Date() })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt: Date;
}
