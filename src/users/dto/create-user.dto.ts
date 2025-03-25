import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, format: "email" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, format: "password" })
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
  updatedAt: Date;
}
