import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

import { SessionsService } from "../sessions/sessions.service";
import { UserEntity } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly sessionsService: SessionsService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate user for local strategy
   *
   */
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

  /**
   * Validate user for JWT strategy
   *
   */
  async validateJwtUser(sub: string) {
    const user = await this.userService.findById(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  /**
   * Verify refresh token
   *
   */
  async verifyRefreshToken(token: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>("auth.jwtRefreshSecret") as string,
    });
  }

  /**
   * Login user
   *
   */
  async login(user: UserEntity) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    const tokens = await this.generateToken(user.id, userWithoutPassword);

    // store tokens into db
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // set expiration to 30 days

    await this.sessionsService.create({
      userId: user.id,
      token: bcrypt.hashSync(tokens.refresh_token, 10),
      expiresAt: expiresAt,
    });

    return { ...tokens }; // return access token and refresh token
  }

  /**
   * Logout user by revoking the refresh token from the database
   *
   */
  async logout(uid: string) {
    await this.sessionsService.revokeAllSessions(uid);

    return { success: true };
  }

  /**
   * Refresh the access token
   *
   */
  async refreshToken(uid: string, token: string) {
    // validate refresh token in the database
    // but the refresh token is hashed in the database
    const session = await this.sessionsService.findOne(uid);
    if (!session) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    // compare the token with the hashed token in the database
    const isTokenValid = await bcrypt.compare(token, session.token);
    if (!isTokenValid) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const user = await this.userService.findById(uid);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    // generate new tokens
    const tokens = await this.generateToken(uid, user);

    // revoke all sessions
    await this.sessionsService.revokeAllSessions(uid);

    // store new refresh token into db
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // set expiration to 30 days

    await this.sessionsService.create({
      userId: user.id,
      token: bcrypt.hashSync(tokens.refresh_token, 10),
      expiresAt: expiresAt,
    });

    return tokens;
  }

  /**
   * Generate token
   *
   */
  private async generateToken(sub: string, user: Omit<UserEntity, "password">) {
    const payload = { sub, user };

    // access token is the bearer token
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("auth.jwtSecret"),
      expiresIn: this.configService.get<string | number>("auth.jwtExpiresIn"),
    });

    // refresh token is the token that is used to get a new access token
    // longer expiry date
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string | number>(
        "auth.jwtRefreshExpiresIn",
      ),
      secret: this.configService.get<string>("auth.jwtRefreshSecret"),
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }
}
