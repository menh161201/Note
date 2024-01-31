// 'use client';

import NavBar from '@/components/navigation/nav-bar';
import {auth} from '@/auth';
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";


export default async function HomePage() {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/')
    }

    return (
        <div className="flex flex-col">
            <ScrollArea>
                <NavBar />
            </ScrollArea>
            
        </div>
        
    )
}