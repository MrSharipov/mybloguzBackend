import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostsService } from './posts.service';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService){}

    @Get()
    getAll(@GetUser('id') userId){
        return this.postService.get(userId);
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) postId, @GetUser('id') userId: number){
        return this.postService.getById(userId, postId);
    }

    @Post()
    create(@Body() dto: CreatePostDto, @GetUser('id') userId: number){
        return this.postService.create(userId, dto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) postId, @Body() dto: UpdatePostDto, @GetUser('id') userId: number){
        return this.postService.update(userId, postId, dto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) postId, @GetUser('id') userId: number){
        return this.postService.remove(userId, postId);
    }
}
