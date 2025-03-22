import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, format: "email" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, format: "password" })
  password: string;
}
