import { UserRole } from "src/user/schemas/user.schema";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    username!: string;
    @IsEmail()
    email!: string;
    @IsEnum(UserRole)
    role!: UserRole;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(100)
    password!: string;
}

export class LoginUserDto {
    @IsEmail()
    email!: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(100)
    password!: string;
}