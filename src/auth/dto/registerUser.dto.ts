import { UserRole } from "src/user/schemas/user.schema";

export class RegisterUserDto {
    username!: string;
    email!: string;
    role!: UserRole;
    password!: string;
}