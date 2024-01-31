'use server';

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { paths } from "@/path";
import {z} from 'zod';


const renameNoteSchema = z.object({
    title: z.string().min(1)
})

interface RenameNoteProps {
    error: {
        title?: string[],
        _form?: string[]
    }
}

export async function renameNote(noteId: string,formState:RenameNoteProps,formData: FormData) : Promise<RenameNoteProps> {
    const result = renameNoteSchema.safeParse({
        title: formData.get('title')
    })
    
    if (!result.success) {
        return {error: result.error.flatten().fieldErrors}
    }
    
    try {
        await db.note.update({
            data: {
                title: result.data.title
            },
            where: {
                id: noteId
            }
        })
    } catch (err:unknown) {
        if (err instanceof Error) {
            return {
                error: {
                    _form: [err.message]
                }
            }
        }else {
            return {
                error: {
                    _form: ['Something went wrong']
                }
            }
        }
        
    }    
    revalidatePath('/home')
    // revalidatePath(paths.showFolder(folderId))

    return {error:{}}
}