import { PartialType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional() // Make password optional for updates
  password?: string; // Optional in UpdateUserDto
}
