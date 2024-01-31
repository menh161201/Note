'use server';

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { paths } from "@/path";
import {z} from 'zod';


const renameFolderSchema = z.object({
    title: z.string().min(1)
})

interface RenameFolderProps {
    error: {
        title?: string[],
        _form?: string[]
    }
}

export async function RenameFolder(folderId: string,formState:RenameFolderProps,formData: FormData) : Promise<RenameFolderProps> {
    const result = renameFolderSchema.safeParse({
        title: formData.get('title')
    })
    
    if (!result.success) {
        return {error: result.error.flatten().fieldErrors}
    }
    
    try {
        await db.folder.update({
            data: {
                title: result.data.title
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
    revalidatePath(paths.showFolder(folderId))

    return {error:{}}
}