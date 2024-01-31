import { db } from "@/db";
import type { Folder } from "@prisma/client";

export type FolderWithData = (
    Folder & {
        _count: {
            notes: number
        }
    }
)

export async function fetchFolderByUserId(userId: string) : Promise<FolderWithData[]> {
    return db.folder.findMany({
        where: {
            userId: userId
        },
        include: {
            _count: {
                select: {
                    notes: true
                }
            }
        }
    })
}

export function fetchFolderByStarStatus(starStatus: boolean, userId: string) {
    return db.folder.findMany({
        where: {
            isStarred: starStatus,
            userId: userId
        },
        include: {
            _count: {
                select: {
                    notes: true
                }
            }
        }
    })
}