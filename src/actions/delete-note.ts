'use server';

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function deleteNote(noteId: string) {
    try {
        await db.note.delete({
            where: {
                id: noteId
            }
        })
    }catch(err:unknown) {
        console.log(err);
        
    }
    revalidatePath('/home')
}
