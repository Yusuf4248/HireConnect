import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser());
    app.useStaticAssets(join(__dirname, '..', 'src', 'public'), {
    prefix: '/public/',
  });
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");
    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigin = [
          "http://localhost:3333",
          "http://localhost:8000",
        ];
        if (!origin || allowedOrigin.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowed by CORS"));
        }
      },
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
    });
    const config = new DocumentBuilder()
      .setTitle("Hire Connect Project")
      .setDescription("Hire Connect-Rest-Api")
      .setVersion("1.0")
      .addTag("NESTJS", "Validation, SWAGGER, BOT, TOKENS, SENDMAIL")
      .addTag("Nest js", "GUARD, AUTH")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
