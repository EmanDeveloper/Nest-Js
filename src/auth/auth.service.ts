import {
  Injectable,
  ConflictException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto, RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
      registerUserDto.password = hashedPassword;

      const user = await this.userService.createUser(registerUserDto);

      const payload = {
        sub: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const token = await this.jwtService.signAsync(payload);
      return { user, token };
    } catch (error: any) {
      throw new ConflictException(error.message);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userService.findByEmail(loginUserDto.email);
      if (!user) {
        throw new NotFoundException('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new NotFoundException('Invalid email or password');
      }

      const payload = {
        sub: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const token = await this.jwtService.signAsync(payload);
      return { user, token };
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ConflictException(error.message);
    }
  }
}
