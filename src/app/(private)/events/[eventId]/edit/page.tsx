import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import EventForm from "../../../../../components/forms/EventForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "../../../../../drizzle/db";
import { notFound } from "next/navigation";

export const revalidate = 0; // Disable revalidation for this page

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>; // Awaitable params
}) {
  // Await the params
  const { eventId } = await params;

  // Authenticate the user
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirectUrl=/events");
    return;
  }

  // Fetch the event data
  const event = await db.query.EventTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) =>
      and(eq(clerkUserId, userId), eq(id, eventId)),
  });

  // Handle event not found
  if (!event) {
    return notFound();
  }

  // Render the event form
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm event={{ ...event, description: event.description || undefined }} />
      </CardContent>
    </Card>
  );
}
