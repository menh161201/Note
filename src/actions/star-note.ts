'use server';
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function starNote(noteId: string) {
    const note = await db.note.findFirst({
        where: {
            id: noteId
        }
    })

    const favoriteStatus = note?.isFavorited;


    try {
        await db.note.update({
            where: {
                id: noteId
            },
            data: {
                isFavorited: !favoriteStatus
            }
        })
    }catch(err: unknown) {
        console.log(err);
        
    }
    revalidatePath('/home')
}