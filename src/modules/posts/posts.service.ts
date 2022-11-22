import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService){}

    async get(userId: number) {
        return await this.prisma.post.findMany({
            where: {
                userId,
            }
        })
    }

    async getById (userId, postId) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId,
            }
        });

        if(!post || post.userId !== userId) throw new ForbiddenException("Post is not found. Access to resource is denied");
        return post;
    }

    async create(userId: number, dto: CreatePostDto){
        const post = await this.prisma.post.create({
            data: {
                userId,
                ...dto
            }
        })
        return post;
    }

    async update(userId: number, postId, dto: UpdatePostDto){
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId,
            }
        });

        if(!post || post.userId !== userId) throw new ForbiddenException("Post is not found. Access to resource is denied");

        return this.prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                ...dto,
            }
        });
    }

    async remove (userId: number, postId: number) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId,
            }
        });

        if(!post || post.userId !== userId) throw new ForbiddenException("Post is not found. Access to resource is denied");

        await this.prisma.post.delete({
            where: {
                id: postId,
            }
        });

        return "Post is successfully deleted";
    }
}
