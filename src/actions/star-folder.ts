'use server';

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function StarFolder(folderId: string) {
    const folder = await db.folder.findFirst({
        where: {
            id: folderId
        }
    })

    const starStatus = folder?.isStarred;

    try {
        await db.folder.update({
            data: {
                isStarred: !starStatus
            },
            where: {
                id: folderId
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
    
}

