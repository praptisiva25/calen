"use server"

import { EventTable } from "../../drizzle/schema"
import { db } from "../../drizzle/db"
import { eventFormSchema } from "../../schema/events"
import "use-server"
import {z} from "zod"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server" // Adjust the import path as necessary

export async function createEvent( 
    unSafeData: z.infer<typeof eventFormSchema>) :
    Promise<{ error: boolean} | undefined> {
    const { userId} = await auth()
    //unSafeData.name=""
    const {success,data} = eventFormSchema.safeParse(unSafeData)

    if(!success || userId==null)
    {
        return { error:true}
    }

    await db.insert(EventTable).values({...data,clerkUserId: userId})
    
    redirect("/events")
    }