
import Tiptap from "../tiptap"
import { db } from "@/db"
import EditNoteForm from "./edit-note-form"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { CiShoppingTag } from "react-icons/ci";

import { Suspense } from "react"
import { Tag } from "@prisma/client"


interface NoteEditorProps {
    noteId: string
}

export default async function NoteEditor({noteId}:NoteEditorProps) {
    const session = await auth();

    if (!session || !session.user) {
        redirect('/')
    }
    const note = await db.note.findFirst({
        where: {
            id: noteId
        },
        include: {
            tags: {
                select: {
                    name: true
                }
            },
           
        }
    }) 
    if (!note) {
        return null
    }
    const tags = await db.tag.findMany({
        where: {
            userId: session.user.id
        }
    })
    
    
    return (
        <div className="flex flex-col min-h-screen max-h-screen xl:p-4 pt-14 px-4">
            <div className="flex gap-2 justify-end mb-2">
                <div className="flex items-center gap-6 mr-auto">
                    <h1 className="font-bold text-2xl">{note.title}</h1>
                    <div className="flex gap-2 items-center text-sm">
                        <CiShoppingTag className="scale-x-[-1]"/>
                        {note.tags.map((tag,index) => (
                            <div key={index} className="border max-w-max p-[.15rem] rounded-md shadow-md">
                                {tag.name}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* <CreateTagForm noteId={noteId} tags={tags}/> */}
                <EditNoteForm noteId={noteId} state={note.isFavorited} tags={tags} noteTitle={note.title}/>
            </div>
            <div className="overflow-scroll">
                <Tiptap note={note} />
            </div>
            
        </div>
    )
}