import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000

  const config = new DocumentBuilder()
    .setTitle('RealTime example')
    .setDescription('The RealTime API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);



  await app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

}
bootstrap();
