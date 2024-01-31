'use client';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import * as actions from '@/actions';

import { DotsVerticalIcon,TrashIcon,Pencil2Icon,HeartFilledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useFormState } from "react-dom";
import type { Tag } from "@prisma/client";

import CreateTagForm from "../tag/create-tag-form";

interface EditFolderFormProps {
    noteId: string,
    state: boolean,
    tags: Tag[],
    noteTitle: string
}

export default function EditNoteForm({noteId,state,tags,noteTitle}:EditFolderFormProps) {
    const [formState, action] = useFormState(actions.renameNote.bind(null,noteId), {error: {}})

    const deleteNoteFunc = actions.deleteNote.bind(null, noteId);
    const starNoteFunc = actions.starNote.bind(null, noteId);
    const [isPress, setIsPress] = useState(state)
    const toggleStar = () => {
        setIsPress(!isPress)
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' size='sm'><DotsVerticalIcon /></Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-max mt-4" side="left">
                <div className="flex gap-2 flex-col">
                    <Dialog>
                        <DialogTrigger asChild><Button variant='outline' className="gap-2 shadow-md"><Pencil2Icon/>Rename</Button></DialogTrigger>
                        <DialogContent className="w-[50vw]">
                            <DialogHeader>
                                <DialogTitle>Rename</DialogTitle>
                                <DialogDescription>Rename this note</DialogDescription>
                                <form action={action} className="flex flex-col gap-2">
                                    <Input placeholder="Title" name="title" defaultValue={noteTitle}/>
                                    {
                                        formState?.error.title ? <div>Title must contain at least 1 character(s)</div> : null
                                    }
                                    {
                                        formState?.error._form ? <div>{formState.error._form}</div> : null
                                    }
                                    <Button type="submit">Submit</Button>
                                </form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <CreateTagForm noteId={noteId} tags={tags}/>
                    <form action={starNoteFunc}>
                        <Button variant='ghost' className="border shadow-md w-full" onClick={toggleStar}>
                            {isPress && <div className="flex items-center gap-2"><HeartFilledIcon className="text-red-500"/>Favorites</div>}
                            {!isPress && <div className="flex items-center gap-2"><HeartFilledIcon />Favorites</div>}
                            
                        </Button>
                        
                    </form>
                    
                    
                    <form action={deleteNoteFunc}>
                        <Button variant='destructive' className="gap-2 w-full"><TrashIcon />Delete</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>    
         
    )
}