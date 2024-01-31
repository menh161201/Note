
import NoteEditor from "@/components/note/note-editor";
import { Suspense } from "react";
import NoteEditorSkeleton from "@/components/skeleton/note-editor-skeleton";

export default function NotePage({
    params,
    searchParams,
  }: {
    params: { slug: string };
    searchParams: { [key: string]: string};
  }) {
    

    const noteId = searchParams?.note;
    
    return (
        <>
            {
                searchParams.note && noteId && 
                <div>
                    <div>
                    <Suspense fallback={<NoteEditorSkeleton />}>
                        <NoteEditor noteId={noteId}/>
                    </Suspense>
                    </div>
                </div>
            }
        </>
    )
}