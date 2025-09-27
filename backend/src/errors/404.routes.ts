import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { AppError } from '@/errors/App';
import { codes } from '@/errors/codes';

const router = (app: FastifyInstance, options: FastifyPluginOptions, done: any) => {
    app.all('*', (req: FastifyRequest, res: FastifyReply) => {
        const message = `Can't find ${req.raw.url} on this server!`;
        
        return new AppError(message, 404, codes.NOT_FOUND);
    });

    done();
};

export default router;
