import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

import { UserEntity } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // validate user for local strategy
  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ConflictException("Invalid credentials");
    }

    return user;
  }

  // validate user for jwt strategy
  async validateJwtUser(sub: string) {
    const user = await this.userService.findById(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  // login user
  async login(user: UserEntity) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    // generate jwt token
    const payload = {
      sub: user.id,
      user: userWithoutPassword,
    };

    // access token is the bearer token
    // refresh token is the token that is used to get a new access token
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get<string | number>("auth.jwtExpiresIn"),
      }),
    };
  }

  // remove token
  async logout() {}
}
