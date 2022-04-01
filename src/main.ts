import { NestFactory } from '@nestjs/core'
import { SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module'
import { swaggerConfig } from "./config/swagger.config";

const bootstrap = async () => {
	const port = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.enableCors();
	const options: SwaggerDocumentOptions = {
		deepScanRoutes: true
	};
	const customOptions: SwaggerCustomOptions = {
		customSiteTitle: 'Movie App API Docs'
	}
	const document = SwaggerModule.createDocument(app, swaggerConfig, options);
	SwaggerModule.setup('api', app, document, customOptions);
	await app.listen(port)
}

bootstrap()
