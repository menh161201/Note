'use server';

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import {z} from 'zod';
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const createTagSchema = z.object({
    name: z.string().min(1)
})

interface createTagProps {
    error: {
        name?: string[],
        _form?: string[]
    }
}


export async function createTag(noteId: string,formState: createTagProps, formData: FormData) : Promise<createTagProps>{
    const session = await auth();
    if(!session || !session.user) {
        redirect('/')
    }
    const result = createTagSchema.safeParse({
        name: formData.get('name')
    })

    if(!result.success) {
        return {
            error: result.error.flatten().fieldErrors
        }
    }
    

    try {
        await db.note.update({
            where: {
                id: noteId
            },
            data: {
                tags: {
                    //@ts-ignore
                    create: {
                        name: result.data.name,
                        userId: session.user.id
                    }
                }
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
    return {error:{}}
}