'use server';
import {z} from 'zod';
import type { Folder } from '@prisma/client';
import { db } from '@/db';
import {auth} from '@/auth';
import { revalidatePath } from 'next/cache';
import { paths } from '@/path'; 
import { redirect } from 'next/navigation';


const createFolderSchema = z.object({
    title: z.string().min(1)
})

interface createFolderProps {
    error: {
        title?: string[],
        _form?: string[]
    }
}

export async function createFolder(formState: createFolderProps, formData: FormData) : Promise<createFolderProps> {
    const session = await auth();
    if (!session || !session.user) {
        return {
            error: {
                _form: ['You must signed in to do this']
            }
        }
    }
    const result = createFolderSchema.safeParse({
        title: formData.get('title')
    })
    
    if (!result.success) {
        return {error: result.error.flatten().fieldErrors}
    }

    let folder : Folder;
    
    try {
        folder = await db.folder.create({
            //@ts-ignore
            data: {
                title: result.data.title,
                userId: session.user.id,
            }
        })
    }catch(err: unknown) {
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
    

    redirect(paths.showFolder(folder.id))

    return {
        error: {}
    }

    
}