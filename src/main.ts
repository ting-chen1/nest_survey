import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
// 需要由 server 使用 view template 等相關功能，所以引入

import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /*
     Here it's assumed that public and views are in the root directory,
     alongside src. You can put them wherever you want,
     just use the correct path if you use another folder.
  */
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir([join(__dirname, '..', 'views/todos')]);
  app.setViewEngine('ejs');

  await app.listen(3000);
}
bootstrap();
