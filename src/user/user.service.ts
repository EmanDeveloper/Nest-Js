import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UserService {
    async createUser(registerUserDto: RegisterUserDto) {
        // Implementation for creating a new user
    }
}
