import { Controller, Get, Param } from '@nestjs/common';
import { ArtistImageParser } from './artist-image.parser';

@Controller('/artist')
export class ArtistController {
  constructor(private readonly artistImageParser: ArtistImageParser) {}

  @Get('/:artist/images')
  getArtistImages(@Param('artist') artist: string) {
    return this.artistImageParser.getImages(artist);
  }
}
