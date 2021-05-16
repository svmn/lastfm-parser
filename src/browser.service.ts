import { Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

const stealth = StealthPlugin();
stealth.enabledEvasions.delete('iframe.contentWindow');
puppeteer.use(stealth);

@Injectable()
export class BrowserService implements OnModuleInit, OnModuleDestroy {
  private browser: Browser;

  public async onModuleInit() {
    this.browser = await puppeteer.launch();
  }

  public async onModuleDestroy() {
    await this.browser.close();
  }

  public async fetch(url: string): Promise<string> {
    const page = await this.browser.newPage();
    await page.goto(url);
    const content = await page.content();
    await page.close();
    return content;
  }
}
