import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('Users');
  app.useGlobalPipes(new ValidationPipe({transform: true }));
  const config = new DocumentBuilder()
  .setTitle('User Detials')
  .setDescription('User Social Account Details')
  .setVersion('2.0')
  .addTag('USer')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
app.setGlobalPrefix('Users');
app.useGlobalPipes(new ValidationPipe({transform: true }));
app.listen(3000)


  const app1 = await NestFactory.createMicroservice<MicroserviceOptions>
  (AppModule,
    {
      transport: Transport.MQTT,
      options:{
        url:"mqtt://104.198.63.61::1883",
        
      }
    }
  );
await app1.listen();
}
bootstrap();
