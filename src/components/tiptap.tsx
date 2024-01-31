'use client'
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from '@tiptap/extension-color';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Image from '@tiptap/extension-image';
import FontFamily from '@tiptap/extension-font-family'
import type { NoteWithData } from "@/db/queries/notes";

import useDebounce from "@/useDebounce";
import { useEffect,useState } from "react";
import * as actions from '@/actions';

import { ScrollArea } from "@/components/ui/scroll-area"


import { HiMiniListBullet } from "react-icons/hi2";
import { MdFormatColorText } from "react-icons/md";
import { RiTaskFill } from "react-icons/ri";
import { VscHorizontalRule } from "react-icons/vsc";
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
  

import { GiHighlighter } from "react-icons/gi";
import { Mitr } from 'next/font/google';

import { TextAlignLeftIcon,TextAlignCenterIcon,TextAlignRightIcon,TextAlignJustifyIcon,FontBoldIcon,FontItalicIcon,UnderlineIcon,StrikethroughIcon,CaretSortIcon } from "@radix-ui/react-icons";
import { colors } from "@/color";
import { Button } from "./ui/button";


interface TiptapProps {
    note: NoteWithData
}
const mitr = Mitr({weight: ["200","300","400","500","600","700"], subsets: ['latin']})

export default function Tiptap({note}:TiptapProps) {
    
    const [type, setType] = useState('');
    
    const debouncedType = useDebounce(type, 1000)
    useEffect(() => {
        if (debouncedType) {
          actions.saveNote(note.id, debouncedType)
          
        }
      }, [debouncedType])

    const content = note.content;

    const editor = useEditor({
        editorProps: {
            attributes: {
              class: 'focus:outline-none',
            },
          },
        extensions: [
            StarterKit,
            Underline,
            TaskList,
            TaskItem,
            Highlight.configure({
                multicolor: true,
            }),
            Color.configure({
                types: ['textStyle'],
            }),
            TextStyle,
            Placeholder.configure({
                placeholder: 'Type here ...'
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Image.configure({
                inline: false
            }),
            FontFamily
            
        ],
        content: content,
        onUpdate:({editor}) => {
            setType(editor.getHTML())
        }
        
      
    },[note.id])

    if (!editor) {
        return null
    }


    function toggleText(type: string) {
        if(editor) {
            return editor.isActive(type) ? 'bg-black text-white p-1 rounded-sm' : 'bg-white text-black p-1'
        }
        
    }

    function toggleAlign(type: string) {
        if(editor) {
            return editor.isActive({textAlign: type}) ? 'bg-black text-white p-1 rounded-sm' : 'bg-white text-black p-1'
        }
        
    }

    function toggleHeading(type: string, size: number) {
        if(editor) {
            return editor.isActive(type, {level: size}) ? 'bg-black text-white p-1 rounded-sm' : 'bg-white text-black p-1'
        }
        
    }


  return (
    <div className={`relative ${mitr.className}`}>
        
        <div className="sticky top-0 bg-white z-10 border rounded-lg shadow-sm py-2 md:block hidden">
            <div className="flex">
                <div className="flex gap-2 border-r px-1">
                    <button 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={toggleHeading('heading',1)}><LuHeading1/></button>
                    <button 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={toggleHeading('heading',2)}><LuHeading2/></button>
                    <button 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={toggleHeading('heading',3)}><LuHeading3/></button>
                </div>
                <div className="flex gap-2 border-r px-1">
                    <button 
                    onClick={() => editor.chain().focus().toggleBold().run()} className={toggleText('bold')}><FontBoldIcon/></button>
                    <button 
                    onClick={() => editor.chain().focus().toggleItalic().run()} className={toggleText('italic')}><FontItalicIcon/></button>
                    <button 
                    onClick={() => editor.chain().focus().toggleUnderline().run()} className={toggleText('underline')}><UnderlineIcon/></button>
                    <button 
                    onClick={() => editor.chain().focus().toggleStrike().run()} className={toggleText('strike')}><StrikethroughIcon/></button>
                </div>
                <div className="flex gap-2 border-r px-1">
                    <button 
                    onClick={() => editor.chain().focus().setTextAlign('left').run()} className={toggleAlign('left')}><TextAlignLeftIcon/></button>
                    <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()} className={toggleAlign('center')}><TextAlignCenterIcon/></button>
                    <button 
                    onClick={() => editor.chain().focus().setTextAlign('right').run()} className={toggleAlign('right')}><TextAlignRightIcon/></button>
                    <button 
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={toggleAlign('justify')}><TextAlignJustifyIcon/></button>
                </div>
                <div className="flex gap-2 border-r px-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center" asChild>
                            <button className={toggleText('textStyle')}><MdFormatColorText/></button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex items-center gap-2 min-w-max">
                            <div 
                            className="p-1 w-6 h-6 rounded-sm bg-[#FF6868]"
                            onClick={() => editor.chain().focus().setColor('#FF6868').run()}></div>
                            <div 
                            className="p-1 w-6 h-6 rounded-sm bg-[#DCFFB7]"
                            onClick={() => editor.chain().focus().setColor('#DCFFB7').run()}></div>
                            <div 
                            className="p-1 w-6 h-6 rounded-sm bg-[#F3D7CA]"
                            onClick={() => editor.chain().focus().setColor('#F3D7CA').run()}></div>
                            <div 
                            className="p-1 w-6 h-6 rounded-sm bg-[#9DBC98]"
                            onClick={() => editor.chain().focus().setColor('#9DBC98').run()}></div> 
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center" asChild>
                            <button className={toggleText('highlight')}><GiHighlighter/></button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex items-center gap-2 min-w-max">
                            {
                                colors.map((color,index) => (
                                    <div 
                                    key={index}
                                    className={`p-1 w-6 h-6 rounded-sm bg-[#${color}]`}
                                    onClick={() => editor.chain().focus().toggleHighlight({color: '#'+color}).run()}></div>
                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex gap-2 border-r px-1">
                    <button 
                    onClick={() => editor.chain().focus().toggleBulletList().run()} className={toggleText('bulletList')}><HiMiniListBullet/></button>
                    <button 
                    onClick={() => editor.chain().focus().toggleTaskList().run()} className={toggleText('taskList')}><RiTaskFill/></button>
                </div>
                <div className="flex gap-2 border-r px-1">
                    <button 
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}><VscHorizontalRule/></button>
                </div>
            </div>
            
        </div>

        <Collapsible className="md:hidden sticky top-0 bg-white z-10">
            <CollapsibleTrigger className="py-2 mb-2" asChild>
                <Button variant='outline' className="flex items-center gap-2">
                    <CaretSortIcon />
                    Tool Bar    
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className=" relative border rounded-lg shadow-sm py-2">
                <div className="flex flex-wrap gap-2">
                    <div className="flex gap-2 px-1">
                        <button 
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={toggleHeading('heading',1)}><LuHeading1/></button>
                        <button 
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={toggleHeading('heading',2)}><LuHeading2/></button>
                        <button 
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={toggleHeading('heading',3)}><LuHeading3/></button>
                    </div>
                    <div className="flex gap-2 px-1">
                        <button 
                        onClick={() => editor.chain().focus().toggleBold().run()} className={toggleText('bold')}><FontBoldIcon/></button>
                        <button 
                        onClick={() => editor.chain().focus().toggleItalic().run()} className={toggleText('italic')}><FontItalicIcon/></button>
                        <button 
                        onClick={() => editor.chain().focus().toggleUnderline().run()} className={toggleText('underline')}><UnderlineIcon/></button>
                        <button 
                        onClick={() => editor.chain().focus().toggleStrike().run()} className={toggleText('strike')}><StrikethroughIcon/></button>
                    </div>
                    <div className="flex gap-2 px-1">
                        <button 
                        onClick={() => editor.chain().focus().setTextAlign('left').run()} className={toggleAlign('left')}><TextAlignLeftIcon/></button>
                        <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()} className={toggleAlign('center')}><TextAlignCenterIcon/></button>
                        <button 
                        onClick={() => editor.chain().focus().setTextAlign('right').run()} className={toggleAlign('right')}><TextAlignRightIcon/></button>
                        <button 
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={toggleAlign('justify')}><TextAlignJustifyIcon/></button>
                    </div>
                    <div className="flex gap-2 px-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center" asChild>
                                <button className={toggleText('textStyle')}><MdFormatColorText/></button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="flex items-center gap-2 min-w-max">
                                <div 
                                className="p-1 w-6 h-6 rounded-sm bg-[#FF6868]"
                                onClick={() => editor.chain().focus().setColor('#FF6868').run()}></div>
                                <div 
                                className="p-1 w-6 h-6 rounded-sm bg-[#DCFFB7]"
                                onClick={() => editor.chain().focus().setColor('#DCFFB7').run()}></div>
                                <div 
                                className="p-1 w-6 h-6 rounded-sm bg-[#F3D7CA]"
                                onClick={() => editor.chain().focus().setColor('#F3D7CA').run()}></div>
                                <div 
                                className="p-1 w-6 h-6 rounded-sm bg-[#9DBC98]"
                                onClick={() => editor.chain().focus().setColor('#9DBC98').run()}></div> 
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center" asChild>
                                <button className={toggleText('highlight')}><GiHighlighter/></button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="flex items-center gap-2 min-w-max">
                                {
                                    colors.map((color,index) => (
                                        <div 
                                        key={index}
                                        className={`p-1 w-6 h-6 rounded-sm bg-[#${color}]`}
                                        onClick={() => editor.chain().focus().toggleHighlight({color: '#'+color}).run()}></div>
                                    ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex gap-2 px-1">
                        <button 
                        onClick={() => editor.chain().focus().toggleBulletList().run()} className={toggleText('bulletList')}><HiMiniListBullet/></button>
                        <button 
                        onClick={() => editor.chain().focus().toggleTaskList().run()} className={toggleText('taskList')}><RiTaskFill/></button>
                    </div>
                    <div className="flex gap-2 px-1">
                        <button 
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}><VscHorizontalRule/></button>
                    </div>
                </div>    
            </CollapsibleContent>
        </Collapsible>
        <div className="px-4">
            
            <EditorContent editor={editor} />
           
        </div>
        
    </div>
    
  )
}

