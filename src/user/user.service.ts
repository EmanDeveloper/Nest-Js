import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async createUser(registerUserDto: RegisterUserDto) {
        try {
            return await this.userModel.create({
                username: registerUserDto.username,
                email: registerUserDto.email,
                role: registerUserDto.role,
                password: registerUserDto.password
            });
        } catch (error:any) {
            throw new ConflictException(error.message);
        }
    }

    async findByEmail(email: string) {
        try {
            return await this.userModel.findOne({ email });
        } catch (error:any) {
            throw new ConflictException(error.message);
        }
    }
}
