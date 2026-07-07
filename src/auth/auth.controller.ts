import { Body, Controller, Post,Get,UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto,LoginUserDto } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("register")
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @Post("login")
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

   @UseGuards(AuthGuard)
   @Get('profile')
   getProfile(@Request() req) {
    return req.user;
  }
}
