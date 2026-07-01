import { Injectable, ConflictException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    async register(registerUserDto: RegisterUserDto) {
        try {
            const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
            registerUserDto.password = hashedPassword;
            return await this.userService.createUser(registerUserDto);
        } catch (error:any) {
            throw new ConflictException(error.message);
        }
    }
}
