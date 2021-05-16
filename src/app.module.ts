import { HttpModule, Module } from '@nestjs/common';

import { ArtistImageParser } from './artist-image.parser';
import { ArtistController } from './artist.controller';
import { BrowserService } from './browser.service';

@Module({
  imports: [HttpModule],
  controllers: [ArtistController],
  providers: [BrowserService, ArtistImageParser],
})
export class AppModule {}
