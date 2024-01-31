'use server';

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function saveNote(noteId: string, content: string) {
    try {
        await db.note.update({
            where: {
                id: noteId
            },
            data: {
                content: content
            }
        })
    } catch (error) {
        console.log(error);
    }
    revalidatePath('/home')
}