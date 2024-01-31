
import {db} from '@/db';
import type { Note } from '@prisma/client';

export type NoteWithData = (
    Note & {
        tags: {
            name: string
        }[],
        
    }
)

export function fetchNoteByFolderId(folderId: string) : Promise<NoteWithData[]> {
    return db.note.findMany({
        where: {
            folderId: folderId
        },
        include: {
            tags: {
                select: {
                    name: true
                }
            },
           
        }
    })
}

export function fetchNoteByFavoriteStatus(status: boolean, userId: string) : Promise<NoteWithData[]> {
    return db.note.findMany({
        where: {
            isFavorited: status,
            userId: userId
        },
        include: {
            tags: {
                select: {
                    name: true
                }
            },
           
        }
    })
}