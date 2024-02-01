'use server';

import { db } from "@/db";
import type { Note } from "@prisma/client";
import {auth} from '@/auth';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { paths } from "@/path";

export async function CreateNote(folderId: string) {
    
    const session = await auth();
    if (!session || !session.user) {
        redirect('/');
    }
    let note : Note;
    try {
        note = await db.note.create({
            //@ts-ignore
            data: {
                title: 'Untitled',
                content: '',
                userId: session.user.id,
                folderId: folderId,

            }
        })
    } catch (err:unknown) {
        console.log('Error');
        
        if (err instanceof Error) {
            console.log(err.message);
            
        }else {
            console.log('Something went wrong');
            
        }
    }
    
    revalidatePath('/home');
    //@ts-ignore
    redirect(paths.showNote(note.id, folderId))
}