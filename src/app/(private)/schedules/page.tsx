import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import EventForm from "../../../components/forms/EventForm"
import { RedirectToSignIn } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { db } from "../../../drizzle/db"
import  { ScheduleForm } from "@/components/forms/ScheduleForm"

export const revalidate = 0

export default async function SchedulePage() {
    const { userId }= await auth()

    if (userId ==null)  return RedirectToSignIn({redirectUrl: "/schedule"})

    const schedule = await db.query.ScheduleTable.findFirst({
        where: ({clerkUserId}, {eq}) => eq(clerkUserId, userId),
        with: 
        {availabilities: true,
    },
})

    




  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
      </CardHeader>
      <CardContent>
       <ScheduleForm schedule ={schedule} />
      </CardContent>
    </Card>
  )
}