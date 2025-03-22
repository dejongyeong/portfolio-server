import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { AuthEntity } from "./entities/auth.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<AuthEntity> {
    // fetch user with the given email
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    // compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    // generate jwt containing user id and return it
    return { accessToken: this.jwtService.sign({ userId: user.id }) };
  }

  async validateUser({ email }: { email: string }) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
