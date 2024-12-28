import { Button} from "../../../components/ui/button"
import {UserButton} from "@clerk/nextjs"
import { CalendarPlus, CalendarRange } from "lucide-react"
import Link from "next/link"
import {db} from "../../../drizzle/db"
import { auth } from "@clerk/nextjs/server"
import { RedirectToSignIn } from "@clerk/nextjs"



    export default async function EventsPage() {
        const { userId } = await auth()
      
        if (userId == null) return RedirectToSignIn({ redirectUrl: "/events" })
      
        const events = await db.query.EventTable.findMany({
          where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
          orderBy: ({ createdAt }, { desc }) => desc(createdAt),
        })

    


    return(
        <div>
        <div className="flex gap-4 items-baseline">
            <h1 className="text-3xl md:4-xl lg:text-5xl font-semibold mb-6">Events ji</h1>
            <Button asChild>
            <Link href="/events/new">
            <CalendarPlus className="mr-4 size-6"/>New Event
            </Link>
            </Button>
        </div>
        <div>
            {events.length > 0? (<h1>Events jii</h1>): (
               <div className="flex flex-col items-center gap-4">
                <CalendarRange className="size-16 mx-auto"/>
                You do not have any events yet. Create your first event to get started!
                <Button size="lg" className="text-lg"  asChild>
            <Link href="/events/new">
            <CalendarPlus className="mr-4 size-6"/>New Event
            </Link>
            </Button>
                </div>
            )
            }
        </div>
        </div>
    )

    }
