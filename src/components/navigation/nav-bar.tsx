import { auth } from "@/auth";
import { redirect } from "next/navigation";


import NavBarSmall from "./nav-bar-small";
import NavBarLarge from "./nav-bar-large";

export default async function NavBar() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        redirect('/')
    }

    
    return (
        <div>
            <div className="xl:hidden pl-4 pt-4">
                <NavBarSmall userImg={session.user.image || ''} userId={session.user.id}/>
            </div>

            <div className="hidden xl:block">
                <NavBarLarge userImg={session.user.image || ''} userId={session.user.id}/>
            </div>            
        </div>
    )
}