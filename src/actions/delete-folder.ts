'use server';

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function deleteFolder(folderId: string) {
    try {
        await db.folder.delete({
            where: {
                id: folderId
            }
        })
    }catch(err: unknown) {
        console.log(err);
        
    }
    revalidatePath('/home')
    
}