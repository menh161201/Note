import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from '@/components/ui/badge';
import { Button } from "../ui/button";

export default function TagCarousel() {
    return (
        <Carousel className='my-6 flex items-center gap-4'>
            <div className="border text-sm p-1 rounded-lg font-semibold">Tag</div>
            <CarouselContent>
                <CarouselItem className='basis-1/5'><Button variant='link' className='w-full flex justify-center items-center py-2'>important</Button></CarouselItem>
                <CarouselItem className='basis-1/5'><Button variant='link' className='w-full flex justify-center items-center py-2'>grocery</Button></CarouselItem>
                <CarouselItem className='basis-1/5'><Button variant='link' className='w-full flex justify-center items-center py-2'>hw</Button></CarouselItem>
                <CarouselItem className='basis-1/5'><Button variant='link' className='w-full flex justify-center items-center py-2'>gym</Button></CarouselItem>
                <CarouselItem className='basis-1/5'><Button variant='link' className='w-full flex justify-center items-center py-2'>interview</Button></CarouselItem>
                <CarouselItem className='basis-1/5'><Button variant='link' className='w-full flex justify-center items-center py-2'>bank</Button></CarouselItem>
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
        </Carousel>
    )
}