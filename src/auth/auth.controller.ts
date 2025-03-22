import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ValidationPipe } from "../common/pipe/validation.pipe";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthEntity } from "./entities/auth.entity";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOkResponse({
    type: AuthEntity,
    description: "User login with email and password",
  })
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
