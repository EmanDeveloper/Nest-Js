import { Injectable, ConflictException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
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
}
