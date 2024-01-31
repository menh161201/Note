
import {db} from '@/db';
import type { Tag } from '@prisma/client';

export type TagWithData = (
    Tag & {
        notes: {
            id: string,
            title: string
        }[],
        
    }
)

export function fetchTagByUserId(userId: string) : Promise<TagWithData[]> {
    return db.tag.findMany({
        where: {
            userId: userId
        },
        include: {
            notes: {
                select: {
                    id: true,
                    title: true
                }
            },
           
        }
    })
}
