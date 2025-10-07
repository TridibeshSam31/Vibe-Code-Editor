"use server"
import {currentUser} from "@/modules/auth/actions"
import {db} from "@/lib/db"

//jaise hi koi bhi dashboard pr jaaye mai chahta hu ki db mai jo bhi stored ho data uss user ka uss playground se related woh sab  aa jaye so uske liye backend likhenge


export const getAllPlaygroundForUser = async()=>{
    const user = await currentUser();
    try {
        const playground = await db.playground.findMany({
            where:{
                userId:user?.id,
            },
            include:{
                user:true,
            }

        })
        return playground;

    } catch (error) {
        console.log(error)
    }
}