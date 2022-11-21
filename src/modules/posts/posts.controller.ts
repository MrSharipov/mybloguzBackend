import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';
import { GetUser } from '../auth/decorator';

@Controller('posts')
export class PostsController {
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAll(@GetUser('id') userId){
        return "All posts by ID: " + userId;
    }
}
