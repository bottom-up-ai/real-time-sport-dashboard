// import { Users } from '@shared/db';
import Fastify from 'fastify';
/* 
    Didn't find any solutions to extend the interface Session
    in the module fastify.

    Had to use the import line 1 to make this file a module.
*/

declare module "fastify" {
	interface FastifyRequest {
        // authenticatedUser?: Users;
    }
}