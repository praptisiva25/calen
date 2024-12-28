import { UserButton } from "@clerk/nextjs";
import { CalendarRange } from "lucide-react";
import { ReactNode } from "react";
import { NavLink } from "../../components/ui/NavLink";

export default function PrivateLayout({
    children}: { children: ReactNode}) {
        return (
            <div>
                <header className="flex py-2 borber-b bg-card"></header>
                <nav className="font-medium flex items-center text-sm gap-6 container">
                    <div className="flex items-center gap-2 font-semibold mr-auto">
                        <CalendarRange className="size-6"/>
                        <span className="sr-only md:not-sr-only">Calendor</span>
                    </div>
                    <NavLink href="/events">Events</NavLink>
                    <NavLink href="/schedules">Schedules</NavLink>
                    <div className="ml-auto size-10">
                        <UserButton 
                        appearance={{ elements: { userButtonAvatarBox: "size-full"}}} />
                    </div>
                </nav>

                <main className="container my-6">
                    {children}</main>
            </div>
        )
    }