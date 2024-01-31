'use client';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import type { Tag } from "@prisma/client";
  
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFormState } from "react-dom";
import * as actions from '@/actions'

interface CreateTagFormProps {
    noteId: string,
    tags: Tag[]
}

export default function CreateTagForm({noteId,tags}: CreateTagFormProps) {
    const [formState, action] = useFormState(actions.createTag.bind(null,noteId), {error:{}})
    const addTagFunc = actions.addTag.bind(null, noteId);
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="bg-black shadow-md w-full">Add tags</Button>
                </PopoverTrigger>
                <PopoverContent side="left" className="mt-4">
                    <div className="flex flex-col gap-4">
                        <div>
                            <form action={addTagFunc} className="flex-col flex gap-2">
                                <Select name="select">
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select current tags'/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            tags.map((tag) => (
                                                <SelectItem value={tag.id} key={tag.id}>{tag.name}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <Button type="submit">Add</Button>
                            </form>
                        </div>
                        <form action={action} className="flex-col flex gap-2">
                            <Input name="name" placeholder="Enter new tag"/>
                            {
                                formState?.error._form ? <div>{formState.error._form}</div> : null
                            }
                            <Button type="submit">Create</Button>
                        </form>
                    </div>
                    
                </PopoverContent>
            </Popover>
        </div>
    )
}