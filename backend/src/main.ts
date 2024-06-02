import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.use(helmet());

  // Configura o middleware bodyParser para JSON e dados codificados por URL
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

  // Configura a documentação Swagger
  const options = new DocumentBuilder()
    .setTitle('VibeChat API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  if (process.env.NODE_ENV === 'production') {
    app.use(
      ['/doc'],
      basicAuth({
        authorizer: (username, password) => {
          return (
            username === process.env.Api_Auth_Username &&
            password === process.env.Api_Auth_Password
          );
        },
        challenge: true,
        unauthorizedResponse: 'Credenciais inválidas. Tente novamente.',
      }),
    );
  }

  SwaggerModule.setup('/doc', app, document);

  app.use('/swagger.json', (req, res) => {
    res.json(document);
  });

  // Configura as opções de CORS
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization,token',
  };
  app.enableCors(corsOptions);

  // Aplica o pipe de validação globalmente
  app.useGlobalPipes(new ValidationPipe());

  const eventEmitter = app.get(EventEmitter2);
  eventEmitter.setMaxListeners(4000);

  await app.listen(3000);
}
bootstrap();
