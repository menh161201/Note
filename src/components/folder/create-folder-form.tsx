'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import * as actions from '@/actions';
import { useFormState } from "react-dom";

export default function CreateFolderForm() {
    const [formState, action] = useFormState(actions.createFolder, {error: {}})
    
    return (
        <Dialog>
            <DialogTrigger asChild><Button variant='outline' className="mb-2 w-full gap-2 shadow-md"><PlusCircledIcon /> Create Folder</Button></DialogTrigger>
            <DialogContent className="w-[50vw]">
                <DialogHeader>
                    <DialogTitle>Create a Folder</DialogTitle>
                    <DialogDescription>Create a new folder</DialogDescription>
                    <form action={action} className="flex flex-col gap-2" >
                        <Input placeholder="Title" name="title"/>
                        {
                            formState?.error.title ? <div>Title must contain at least 1 character(s)</div> : null
                        }
                        {
                            formState?.error._form ? <div>{formState.error._form}</div> : null
                        }
                        
                        <Button type="submit">Create</Button>
                    </form>
                    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}