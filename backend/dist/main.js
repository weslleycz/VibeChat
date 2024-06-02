"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = require("body-parser");
const helmet_1 = require("helmet");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const basicAuth = require("express-basic-auth");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: false });
    app.use((0, helmet_1.default)());
    app.use(bodyParser.json({ limit: '500mb' }));
    app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('VibeChat API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    if (process.env.NODE_ENV === 'production') {
        app.use(['/doc'], basicAuth({
            authorizer: (username, password) => {
                return (username === process.env.Api_Auth_Username &&
                    password === process.env.Api_Auth_Password);
            },
            challenge: true,
            unauthorizedResponse: 'Credenciais inválidas. Tente novamente.',
        }));
    }
    swagger_1.SwaggerModule.setup('/doc', app, document);
    app.use('/swagger.json', (req, res) => {
        res.json(document);
    });
    const corsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization,token',
    };
    app.enableCors(corsOptions);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const eventEmitter = app.get(event_emitter_1.EventEmitter2);
    eventEmitter.setMaxListeners(4000);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map