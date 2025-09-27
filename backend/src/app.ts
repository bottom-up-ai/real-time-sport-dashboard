import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

import { logger } from '@/logs';
import { notFoundRoute, globalErrorHandler } from '@/errors';
import '@/types'; /* We need to import the fastify types somewhere */

const app = Fastify({ 
    loggerInstance: logger,
    requestIdHeader: 'x-request-id',
	routerOptions: {
		maxParamLength: 400, /* When a slug is too long */
	}
}).withTypeProvider<ZodTypeProvider>();

/**
 * Allow using zod as schema validation.
 */
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(notFoundRoute);

app.setErrorHandler(globalErrorHandler);

export default app;
