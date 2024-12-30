import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card"
import EventForm from "../../../../../components/forms/EventForm"
import { auth } from "@clerk/nextjs/server"
import { RedirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/dist/server/api-utils"
import { db } from "../../../../../drizzle/db"
import { notFound } from "next/navigation"

export default async function EditEventPage({ params: {
    eventId }} : {params: {eventId: string}}) {
         
    const {userId} = await auth()
    if (userId == null) return RedirectToSignIn({redirectUrl: "/events"})

    const event = await db.query.EventTable.findFirst({
        where:(({id,clerkUserId}, {and,eq}) => and(eq(clerkUserId, userId), eq(id , eventId )))
    })

    if(event == null) return notFound()

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm  event={{...event , description: event.description || undefined}} />
      </CardContent>
    </Card>
  )
}