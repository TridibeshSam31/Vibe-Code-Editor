import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {db} from "./lib/db"
import authConfig from "./auth.config"
import { getUserById,getAccountByUserId } from "./modules/auth/actions"


export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks:{
    async signIn({user,account}){
        if(!user||!account) return false

        const existingUser = await db.user.findUnique({
            where:{
                email:user.email ?? undefined, 
            }
        })

        if(!existingUser){
            //user aaya hi pehli baar hai 
            const newUser = await db.user.create({
                //@ts-ignore
                data:{
                    email: user.email ?? "", // fallback to empty string if null/undefined
                    name:user.name,
                    image:user.image,

                    accounts: {
              // @ts-ignore
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refreshToken: account.refresh_token,
                accessToken: account.access_token,
                expiresAt: account.expires_at,
                tokenType: account.token_type,
                scope: account.scope,
                idToken: account.id_token,
                sessionState: account.session_state,
              },
            },


                }

            
         });
         if(!newUser) return false; // return false if user creation fails
        }
        else{
            //link the account if user exists
            const existingAccount = await db.account.findUnique({
                where:{
                    provider_providerAccountId:{
                        provider:account.provider,
                        providerAccountId:account.providerAccountId,
                    },

                }
            })
            //if the account does not exist then create it

            if(!existingAccount){
                await db.account.create({
                data: {
                userId: existingUser.id,
                type: account.type,
                             provider: account.provider,
                             providerAccountId: account.providerAccountId,
                             refresh_token: account.refresh_token,
                             access_token: account.access_token,
                             expires_at: account.expires_at,
                             scope: account.scope,
                             id_token: account.id_token,
                //@ts-ignore
                sessionState: account.session_state,
            
                },
                })
            }
        }
        return true;

    },
    async jwt({token}){
        if(!token.sub) return token; //sub is id 

        const existingUser = await getUserById(token.sub);
        if(!existingUser) return token;

        token.name = existingUser.name;
        token.email = existingUser.email;
        token.image = existingUser.image;

        return token
        
    },
    async session({ session, token}){
  // Attach the user ID from the token to the session
    if(token.sub  && session.user){
      session.user.id = token.sub
    } 

    if(token.sub && session.user){
      session.user.role = token.role
    }

    return session;
    },
    
  },

  secret:process.env.AUTH_SECRET,
  adapter:PrismaAdapter(db),
  ...authConfig
})