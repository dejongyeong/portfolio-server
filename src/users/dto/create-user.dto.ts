import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ type: String, format: "email" })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, format: "password" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  resetPasswordToken: string | null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  resetPasswordTokenExpiry: Date | null;

  @IsDate()
  @Type(() => Date)
  createdAt: Date = new Date();

  @IsDate()
  @Type(() => Date)
  updatedAt: Date = new Date();
}
