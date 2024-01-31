import { Skeleton } from "@/components/ui/skeleton";

export default function FolderListSkeleton() {
    return (
        <div className="p-4 flex flex-col gap-2 overflow-hidden min-h-screen max-h-screen">
            <div className="flex items-center justify-end">
                <div className="flex items-center gap-4 mr-auto">
                    <Skeleton className="w-[64px] h-[32px]"/>
                    <Skeleton className="w-[100px] h-[32px]"/>
                </div>
                <Skeleton className="w-[40px] h-[40px]"/>
            </div>
            <Skeleton className="w-full h-[40px]"/>
            <Skeleton className="w-full h-screen"/>
        </div>
    )
}