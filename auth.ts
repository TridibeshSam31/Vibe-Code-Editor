import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks:{
    async signIn(user,account){
        if(!user||!account) return false

        const existingUser = await db.user.findUnique({
            where:{
                email:user.email,
            }
        })

        if(!existingUser){
            //user aaya hi pehli baar hai 
            const newUser = await db.user.create({
                data:{
                    
                }

            
         })
        }

    },
    async jwt(){},
    async session(){},
  
  }
})