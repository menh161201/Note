import {auth} from '@/auth';
import { redirect } from "next/navigation";
import { Button } from '@/components/ui/button';
import NoteList from '@/components/note/note-list';
import { fetchNoteByFolderId } from '@/db/queries/notes';
import { PlusCircledIcon,StarFilledIcon,ReaderIcon } from '@radix-ui/react-icons';
import EditFolderForm from '@/components/folder/edit-folder-form';
import { db } from '@/db';
import * as action from '@/actions';
import Link from 'next/link';
import { paths } from '@/path';
import { CiFolderOn } from "react-icons/ci";
import { CiShoppingTag } from "react-icons/ci";
import { Suspense } from 'react';
import FolderListSkeleton from '@/components/skeleton/folder-list-skeleton';
import { Note } from '@prisma/client';

export default async function ListPage({
    params,
    searchParams,
  }: {
    params: { slug: string };
    searchParams: { [key: string]: string};
  }) {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/')
    }
    
    const folderId = searchParams?.id
    const folder = await db.folder.findFirst({
      where: {
        id: folderId
      }
    })

    const tagId = searchParams?.tagId
    const tag = await db.tag.findFirst({
      where: {
        id: tagId
      },
      include: {
        notes: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    const CreateNoteFunc = action.CreateNote.bind(null, folderId);
    

    return (
      <Suspense fallback={<FolderListSkeleton />}>
        <div className='border-r'>
          {
            searchParams.id && folder && folder.userId === session.user.id &&
            <div className='xl:min-h-screen xl:max-h-screen overflow-scroll p-4 min-h-max'>
              <div className='mb-2 flex items-center'>
                <div>
                  <h1 className='font-bold text-3xl flex items-center gap-2'><CiFolderOn />{folder?.title}</h1>
                  {folder.createdAt.toLocaleDateString()}
                  
                </div>
                
                
              </div>
              
              <div className='flex justify-between gap-2'>
                <form action={CreateNoteFunc}>
                  <Button variant='outline' className="mb-2 w-full gap-2 shadow-md"><PlusCircledIcon />Create Note</Button>
                </form>
                
                <EditFolderForm folderId={folderId} state={folder.isStarred} folderTitle={folder.title}/>
              </div>
              
              <NoteList fetchData={() => fetchNoteByFolderId(folderId)} />
              
              
            </div>
          }

          {
            searchParams.tagId && tag && tag.userId === session.user.id &&
            <div className='xl:min-h-screen xl:max-h-screen overflow-scroll p-4 min-h-max'>
              <div className='mb-2 flex items-center'>
                <div>
                  <h1 className='font-bold text-3xl flex items-center gap-2'><CiShoppingTag className='scale-x-[-1]'/> {tag.name}</h1>
                  
                  
                </div>
                
                
              </div>
              
              <div className='flex flex-col gap-2'>
                {
                  tag.notes.map((note) => (
                    <Link href={paths.showNoteTag(tag.id,note.id)} key={note.id}>
                        <div className="border p-2 flex items-center rounded-md gap-2 shadow-md">
                            <ReaderIcon />
                            <h5>{note.title}</h5>
                            
                        </div>
                    </Link>
                  ))
                }
              </div>   
            </div>
          }

        </div>
      </Suspense>  
    )
}