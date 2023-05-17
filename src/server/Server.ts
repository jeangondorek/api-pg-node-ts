import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import './shared/services/TranslationsYup';

import { router } from './routes/RoutesIndex';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const server = express();

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
	explorer: true,
	swaggerOptions: {
		securityDefinitions: {
			bearerAuth: {
				type: 'apiKey',
				name: 'Authorization',
				in: 'header',
				description: 'Enter the token in the following format: Bearer {token}'
			}
		}
	}}));

server.use(cors({
	origin: process.env.ENABLED_CORS?.split(';') || []
}));

server.use(express.json());

server.use(router);

export {server};
