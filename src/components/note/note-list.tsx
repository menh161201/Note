import { NoteWithData } from "@/db/queries/notes"
import { paths } from "@/path";
import { ReaderIcon } from "@radix-ui/react-icons";
import Link from "next/link";


interface NoteListProps {
    fetchData: () => Promise<NoteWithData[]>
}

export default async function NoteList({fetchData}: NoteListProps) {
    
    const notes = await fetchData();
    
    return (
        <div className="flex flex-col gap-2">
            {
                notes.map((note) => (
                    <Link href={paths.showNote(note.id,note.folderId)} key={note.id}>
                        <div>
                            <div className="border p-2 flex items-center rounded-md gap-2 shadow-md hover:shadow-lg">
                                <ReaderIcon />
                                <h5>{note.title}</h5>
                                
                                
                            </div>
                        </div>
                    </Link>
                    
                ))
            }
        </div>
    )
}