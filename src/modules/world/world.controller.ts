import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWorldDto } from './dto/create-world.dto';
import { WorldService } from './world.service';

@Controller('world')
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Post()
  create(@Body() createWorldDto: CreateWorldDto) {
    return this.worldService.createWord(createWorldDto);
  }

  @Get()
  findAll() {
    return this.worldService.findAll();
  }
}
