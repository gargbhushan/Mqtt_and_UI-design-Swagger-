import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { TweetPost } from './tweet.interface';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post([])
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createTweetDto: CreateTweetDto,
  ): Promise<Observable<CreateTweetDto>> {
    return this.tweetService.create(createTweetDto);
  }

  @Get()
  findAll(): Observable<TweetPost[]> {
    return this.tweetService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    console.log(typeof id == 'number');
    return this.tweetService.FindOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() tweetPost: TweetPost,
  ): Observable<UpdateResult> {
    return this.tweetService.update(+id, tweetPost);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.tweetService.delete(+id);
  }
}
