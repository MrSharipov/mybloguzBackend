import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get('all')
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@GetUser('id') userId) {
    return this.postService.get(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id', ParseIntPipe) postId, @GetUser('id') userId: number) {
    return this.postService.getById(userId, postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreatePostDto, @GetUser('id') userId: number) {
    return this.postService.create(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) postId,
    @Body() dto: UpdatePostDto,
    @GetUser('id') userId: number,
  ) {
    return this.postService.update(userId, postId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) postId, @GetUser('id') userId: number) {
    return this.postService.remove(userId, postId);
  }
}
