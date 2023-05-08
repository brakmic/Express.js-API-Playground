import 'reflect-metadata';
// We must have v2 of openapi3-ts as installed as
// routing-controllers-openapi@4.0.0 still uses it.
// But class-validator-jsonschema@5.0.0 needs v3.2.0 of openapi3-ts instead.
// This creates conflicts when using 'validationMetadatasToSchemas'
// to generate OpenAPI Schemas.
// That's why we need to cast the schema object to 'Record<string, SchemaObject | ReferenceObject>'
// in 'routingControllersToSpec' call.
// After these issues have been resolved by their maintainers the hacks used here 
// can be safely removed.
// More info on this and related issues: 
// https://github.com/epiphone/class-validator-jsonschema/issues/100
// https://github.com/epiphone/routing-controllers-openapi/issues/139
import { SchemaObject, ReferenceObject } from "openapi3-ts";
import { useExpressServer } from 'routing-controllers';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';
import { HomeController, UsersController } from './controllers';
import express from 'express';
import { loggingMiddleware } from './middlewares';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

// We need this to get the metadata storage.
// More info: https://github.com/typestack/class-transformer/issues/563
import { defaultMetadataStorage as classTransformerMetadataStorage } from "class-transformer/cjs/storage";

import { NextFunction, Request, Response } from 'express';
import { jwtStrategy } from './authentication/jwt.strategy';
import { jwtAuthMiddleware } from './middlewares/authentication/jwt-auth.middleware';
import { openApiErrorHandlerMiddleware } from './middlewares/openapi/error-handler.middleware';
import favicon from 'serve-favicon';
import path from 'path';
import { bootstrap } from './bootstrap';
import dotenv from 'dotenv';

dotenv.config({
  debug: true,
  override: true
});

const port = 3000;
const BASE_PATH = '/';

const app = express();

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));

const authMiddleware = jwtAuthMiddleware([
  '/api-docs',
  '/openapi.json',
  '/openapi.xml',
  '/favicon.ico',
  '/'
]);

app.use(authMiddleware);
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use(loggingMiddleware);
app.use(openApiErrorHandlerMiddleware);

useExpressServer(app, {
  cors: true,
  routePrefix: BASE_PATH + 'api',
  controllers: [
    HomeController,
    UsersController
  ],
});


const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
  enableDebugMessages: true,
  classTransformerMetadataStorage,
});

const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage, 
  {
    cors: true,
    middlewares: [openApiErrorHandlerMiddleware]
  },
  {
  servers: [
    {
      url: BASE_PATH + 'api'
    }
  ],
  components: {
    schemas: schemas as Record<string, SchemaObject | ReferenceObject>,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization'
      },
    },
  },
  security: [{ bearerAuth: [] }],
  info: {
    title: 'Local Express.js OpenAPI Specification',
    version: '1.0',
    contact: { 
      email: 'brakmic@gmail.com',
      url: 'https://blog.brakmic.com'
    },
    description: 'This is a demo API for a local express.js server',
    license: {
      name: 'MIT'
    },
    termsOfService: 'Have fun with it!'
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

app.get('/openapi.json', (req: Request, res: Response, next: NextFunction) => {
  res.json(spec);
});

bootstrap().then(() => {
  // Start the server after bootstrap is done
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
.catch((error) => {
  // Handle any errors during bootstrap
  console.error('Failed to bootstrap application', error);
  process.exit(1);
});

