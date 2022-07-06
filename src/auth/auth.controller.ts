import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FilterUsersDto } from './dto/filter.users.dto';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { LoginMsg } from './model/login.msg';
import { Status, User } from './model/user';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() userDto: UserDto): User {
        return this.authService.createUser(userDto)
    }

    @Post()
    @UsePipes(ValidationPipe)
    loginUser(@Body() loginDto: LoginDto): LoginMsg {
        return this.authService.loginUser(loginDto)
    }

    @Get()
    getAllUsers(@Query(ValidationPipe) filterUsersDto: FilterUsersDto): User[] {
        if(Object.keys(filterUsersDto).length){
            return this.authService.getAllUsersWithFilter(filterUsersDto)
        } else {
            this.authService.getAllUsers()
        }
    }

    @Get('/:id')
    getUserById(@Param('id') id: string): User {
        return this.authService.getUserById(id)
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body('status') status: Status): User{
        return this.authService.updateUser(id, status)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string): LoginMsg {
        return this.authService.deleteUser(id)
    }
}
