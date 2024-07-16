import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create(createAlbumDto);
    return this.albumRepository.save(album);
  }

  findAll() {
    return this.albumRepository.find();
  }

  findOne(id: number) {
    return this.albumRepository.findOneBy({ id });
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    await this.albumRepository.update(id, updateAlbumDto);
    return this.albumRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.albumRepository.delete(id);
    return { deleted: true };
  }
}