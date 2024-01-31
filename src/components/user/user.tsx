import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { Input } from "../ui/input";
import { redirect } from "next/navigation";

export default async function User() {
    const session = await auth()

    if(!session || !session.user) {
        redirect('/')
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="font-extrabold text-xl">LOGO</div>
            <div className="flex gap-2">
                <Avatar >
                    <AvatarImage src={session.user.image || ''}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <h4 className="text-sm font-semibold">{session.user.name}</h4>
                    <h5 className="text-sm text-slate-500">@{session.user.email}</h5>
                </div>
            </div>
            <Input placeholder='Search...'/>
        </div>
    )
}