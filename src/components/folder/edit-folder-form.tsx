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

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
  

import * as actions from '@/actions';

import { DotsVerticalIcon,TrashIcon,StarFilledIcon,Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useFormState } from "react-dom";
import { useState } from "react";
interface EditFolderFormProps {
    folderId: string,
    state: boolean,
    folderTitle: string
}

export default function EditFolderForm({folderId,state,folderTitle}:EditFolderFormProps) {
    const [formState, action] = useFormState(actions.RenameFolder.bind(null,folderId), {error: {}})
    
    const DeleteFolderFunc = actions.deleteFolder.bind(null, folderId);
    const StarFolderFunc = actions.StarFolder.bind(null, folderId);
    const [isPress, setIsPress] = useState(state)
    const toggleStar = () => {
        setIsPress(!isPress)
    }
    return (
        <Popover>
            <PopoverTrigger className='ml-auto' asChild>
                <Button variant='outline' size='sm'><DotsVerticalIcon /></Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-max">
                <div className="flex flex-col gap-2">
                    <Dialog>
                        <DialogTrigger asChild><Button variant='outline' className="gap-2 shadow-md"><Pencil2Icon/>Rename</Button></DialogTrigger>
                        <DialogContent className="w-[50vw]">
                            <DialogHeader>
                                <DialogTitle>Rename</DialogTitle>
                                <DialogDescription>Rename this folder</DialogDescription>
                                <form action={action} className="flex flex-col gap-2">
                                    <Input placeholder="Title" name="title" defaultValue={folderTitle}/>
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
                    
                    <form action={StarFolderFunc}>
                        <TooltipProvider delayDuration={400}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant='ghost' onClick={toggleStar} className="shadow-md border w-full">
                                        {/* <StarFilledIcon className="text-yellow-500"/> */}
                                        {isPress &&  <div className="flex items-center gap-2"><StarFilledIcon className="text-yellow-400"/>Starred</div> }
                                        {!isPress && <div className="flex items-center gap-2"><StarFilledIcon/>Starred</div>}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {isPress && <div>Remove from starred folder</div>}
                                    {!isPress && <div>Add to starred folder</div>}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        
                    </form>
                    
                    <form action={DeleteFolderFunc}>
                        <Button variant='destructive' className="gap-2 shadow-md w-full"><TrashIcon />Delete</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>    
    )
}