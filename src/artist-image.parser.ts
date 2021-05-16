import cheerio from 'cheerio';

import { Injectable } from '@nestjs/common';

import { BrowserService } from './browser.service';

export interface ArtistImages {
  small: string;
  large: string;
}

@Injectable()
export class ArtistImageParser {
  constructor(private readonly browser: BrowserService) {}

  public async getImages(artist: string): Promise<ArtistImages> {
    const html = await this.browser.fetch(
      `https://www.last.fm/music/${artist}/+images`,
    );
    const $ = cheerio.load(html);
    const imageUrl = $('a.image-list-item img').attr('src');
    return {
      small: this.getSmallImageUrl(imageUrl),
      large: this.getLargeImageUrl(imageUrl),
    };
  }

  private getSmallImageUrl(url: string): string {
    return url.replace(/\/u(\/.+?\/)/, '/u/64s/');
  }

  private getLargeImageUrl(url: string): string {
    return url.replace(/\/u(\/.+?\/)/, '/u/');
  }
}
