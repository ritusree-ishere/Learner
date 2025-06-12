import {
    betterAuth
} from 'better-auth';
import { customSession } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from './prisma';
import { Prisma, UserRole } from '@prisma/client';
// import {redis} from './lib/redis'

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // Cache duration in seconds
        },
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
    },

    socialProviders: {
        
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            mapProfileToUser:async(user)=>{
                // check fro async functions
             
                return {
                    oauthRole:'admin'
                }
            }
        }
    },
    plugins: [
        customSession(async ({ user, session }) => {
            const roles = await prisma.user.findUnique({where:{email:user.email}});
            return {
                roles:roles?.role,
                user: {
                    ...user,
                    newField: "newField",
                },
                session
            };
        }),
    ],

    // redis secondry store

    // secondaryStorage: {
	// 	get: async (key) => {
	// 		const value = await redis.get(key);
	// 		return value ? value : null;
	// 	},
	// 	set: async (key, value, ttl) => {
	// 		if (ttl) await redis.set(key, value, { EX: ttl });
	// 		// or for ioredis:
	// 		// if (ttl) await redis.set(key, value, 'EX', ttl)
	// 		else await redis.set(key, value);
	// 	},
	// 	delete: async (key) => {
	// 		await redis.del(key);
	// 	}
	// },

    // database hooks
    databaseHooks: {
        user: {
          create: {
            before: async (user, ctx) => {
               
              // Modify the user object before it is created
              return {
                data: {
                  ...user,
                  role:user.email=='docode999@gmail.com'?'ADMIN':'USER',
                  firstName: user.name.split(" ")[0],
                  lastName: user.name.split(" ")[1],
                },
              };
            },
            after: async (user) => {
             
              //perform additional actions, like creating a stripe customer
            },
          },
        },
      },

    // emailVerification:{
    //     sendVerificationEmail: async ({user,url,token},request)=>{
    //         // write your send emal function here
    //         await sendEmail({
    //             to: user.email,
    //             subject: 'Verify your email address',
    //             text: `Click the link to verify your email: ${url}`
    //         })
    //     }
    // },

    // check for specific domain
    // //hooks: {
    //     before: createAuthMiddleware(async (ctx) => {
    //         if (ctx.path !== "/sign-up/email") {
    //             return;
    //         }
    //         if (!ctx.body?.email.endsWith("@example.com")) {
    //             throw new APIError("BAD_REQUEST", {
    //                 message: "Email must end with @example.com",
    //             });
    //         }
    //     }),
    // },


    /** if no database is provided, the user data will be stored in memory.
     * Make sure to provide a database to persist user data **/
});


export type Session = typeof auth.$Infer.Session;