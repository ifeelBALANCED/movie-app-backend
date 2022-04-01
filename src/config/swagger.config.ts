import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Online shop API')
    .setDescription('Movie application for premium intensive')
    .addTag('movie-app')
    .setVersion('1.0')
    .build();
