'use server';

import { db } from "@/db";
import { revalidatePath } from "next/cache";


export async function addTag( noteId: string, formData: FormData) {
    const tagId = formData.get('select');
    
    if (typeof tagId === 'string') {
        try {
            await db.note.update({
                where: {
                    id: noteId,
                },
                data: {
                    tags: {
                        connect: [{ id: tagId }],
                    },
                },
            });
        } catch (error) {
            // Handle the error appropriately
            
            
            console.error(error);
        }
        revalidatePath('/home')
        console.log('here');
        
    } else {
        // Handle the case where tagId is not a string
        console.error('Tag ID must be a string');
    }
    
}