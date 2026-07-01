import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import {bcrypt} from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    async register(registerUserDto: RegisterUserDto) {
        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
        registerUserDto.password = hashedPassword;
        return this.userService.createUser(registerUserDto);
    }
}
