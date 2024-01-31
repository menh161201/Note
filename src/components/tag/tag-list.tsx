import { TagWithData } from "@/db/queries/tags";
import Link from "next/link";
import { paths } from "@/path";
import { CiShoppingTag } from "react-icons/ci";
interface TagListProps {
    fetchData: () => Promise<TagWithData[]>,
}

export default async function TagList({fetchData}:TagListProps) {
    const tags = await fetchData();
    
    return (
            <div className="flex flex-col">
                {
                    tags.map((tag) => (
                        <Link href={paths.showTag(tag.id)} key={tag.id}>
                            
                            <div className="border mb-2 p-2 flex items-center rounded-md gap-2 shadow-md">
                                <CiShoppingTag className="scale-x-[-1]"/>
                                <h5>{tag.name}</h5>
                                
                            </div>
                            
                        </Link>
                        
                    ))
                }
            </div>    
 
    )
}