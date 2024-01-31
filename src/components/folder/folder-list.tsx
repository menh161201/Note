import { FolderWithData } from "@/db/queries/folders";
import { CiFolderOn } from "react-icons/ci";
import Link from "next/link";
import { paths } from "@/path";
import { SheetClose } from "../ui/sheet";
interface FolderListProps {
    fetchData: () => Promise<FolderWithData[]>,
}

export default async function FolderList({fetchData}:FolderListProps) {
    const folders = await fetchData();
    
    return (
            <div className="flex flex-col">
                {
                    folders.map((folder) => (
                        <Link href={paths.showFolder(folder.id)} key={folder.id}>
                            {/* <SheetClose className="w-full"> */}
                                <div className="border mb-2 p-2 flex items-center rounded-md gap-2 shadow-md">
                                    <CiFolderOn />
                                    <h5>{folder.title}</h5>
                                    
                                    <h5 className="ml-auto font-light text-sm">
                                        {folder.createdAt.toLocaleDateString()}
                                    </h5>
                                </div>
                            {/* </SheetClose> */}
                        </Link>
                        
                    ))
                }
            </div>    
 
    )
}