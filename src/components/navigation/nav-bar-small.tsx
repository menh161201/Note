import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet";

  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

import { Separator } from "../ui/separator"; 
import { fetchFolderByUserId } from "@/db/queries/folders";
import { fetchFolderByStarStatus } from "@/db/queries/folders";
import { fetchNoteByFavoriteStatus } from "@/db/queries/notes";
import { fetchTagByUserId } from "@/db/queries/tags";

import { FaFolderOpen } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui/button";
import * as action from '@/actions';
import { HamburgerMenuIcon,ExitIcon } from "@radix-ui/react-icons";
import FolderList from "../folder/folder-list";
import CreateFolderForm from "../folder/create-folder-form";
import NoteList from "../note/note-list";
import User from "../user/user";
import TagList from "../tag/tag-list";

interface NavBarSmallProps {
    userImg: string,
    userId: string
}

export default function NavBarSmall({userImg,userId}:NavBarSmallProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='outline'><HamburgerMenuIcon /></Button>
            </SheetTrigger>
            <SheetContent side='left' className="p-0">
            <div className="flex flex-col min-h-screen max-h-screen py-4 gap-4 px-4 overflow-scroll">
                <User />
                
                <Separator />

                <Accordion type="multiple" className='flex flex-col gap-2'>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="hover:no-underline hover:shadow-md rounded-md mb-2">
                            <div className="flex gap-1 items-center">
                                <FaStar className="text-yellow-500"/>
                                Starred Folders
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <FolderList 
                            //@ts-ignore 
                            fetchData={() => fetchFolderByStarStatus(true, userId)}/>
                        </AccordionContent>
                    
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="hover:no-underline hover:shadow-md rounded-md mb-2">
                            <div className="flex gap-1 items-center">
                                {/* <img src="./folder-icon.svg" alt=""/> */}
                                <FaFolderOpen className="text-orange-500"/>
                                All Folders
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <CreateFolderForm />
                            <FolderList 
                            
                            fetchData={() => fetchFolderByUserId(userId)}/>
                        </AccordionContent>
                    
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="hover:no-underline hover:shadow-md rounded-md mb-2">
                            <div className="flex gap-1 items-center">
                                <FaTags className="text-green-500"/>
                                Tags
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <TagList
                            fetchData={() => fetchTagByUserId(userId)}/>
                        </AccordionContent>
                    
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="hover:no-underline hover:shadow-md rounded-md mb-2">
                            <div className="flex gap-1 items-center">
                                <FaHeart className="text-red-500" />
                                Favorite Notes
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <NoteList
                            fetchData={() => fetchNoteByFavoriteStatus(true, userId)}
                            />
                        </AccordionContent>
                    
                    </AccordionItem>
                </Accordion>
                
                <form action={action.signOut} className="mt-auto">
                    <Button variant='destructive' className="w-full gap-2"><ExitIcon />Sign out</Button>
                </form>
            </div>
            </SheetContent>
        </Sheet>
    )
}