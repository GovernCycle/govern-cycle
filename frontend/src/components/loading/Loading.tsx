import Image from 'next/image'
import tree1 from '@/images/l-tree1.png'
import tree2 from '@/images/l-tree2.png'
import tree3 from '@/images/l-tree3.png'
import grass from '@/images/l-grass.png'
import cloudLeft from '@/images/Cloud1.png'
import cloudRight from '@/images/Cloud2.png'
import forestLignthing from '@/images/forest-light-background.png'

export default function Loading() {
    return (
        <div className='relative w-[300px] h-[180px] overflow-hidden bg-blue-300 rounded-full '>
            <h1 className='absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-lg font-bold text-[var(--text-label-primary)]'>
                Cargando...
            </h1>

            <div className="absolute bottom-0 left-0 z-10 w-full">
                <Image
                    src={grass}
                    alt="Grass"
                    className="h-auto w-full object-cover"
                />
            </div>
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0'>
                <Image
                    src={forestLignthing}
                    alt=''
                    className='w-full h-auto object-cover custom-scale'
                    sizes='(max-width: 1024px) 100vw, 1024px'
                    priority
                />
            </div>

            {/* Tree 1 */}
            <div className="absolute bottom-0 left-[10%] z-5 tree-fade-in-1s">
                <Image
                    src={tree1}
                    alt="Tree 1"
                    className="h-auto w-[60px] object-cover"
                />
            </div>

            {/* Tree 2 */}
            <div className="absolute bottom-0 left-[40%] z-5 tree-fade-in-3s">
                <Image
                    src={tree2}
                    alt="Tree 2"
                    className="h-auto w-[60px] object-cover"
                />
            </div>

            {/* Tree 3 */}
            <div className="absolute bottom-0 right-[10%] z-5 tree-fade-in-6s">
                <Image
                    src={tree3}
                    alt="Tree 3"
                    className="h-auto w-[60px] object-cover"
                />
            </div>

            {/* Cloud left */}
            <div className="absolute top-10 left-[-5%] z-4 cloud-slide-in-left"> {/* Ajusta left para comenzar más lejos */}
                <Image
                    src={cloudLeft}
                    alt="Cloud Left"
                    className="h-auto w-[80px] object-cover"
                />
            </div>

            {/* Cloud right */}
            <div className="absolute top-20 right-[-5%] z-4 cloud-slide-in-right"> {/* Ajusta right para comenzar más lejos */}
                <Image
                    src={cloudRight}
                    alt="Cloud Right"
                    className="h-auto w-[80px] object-cover"
                />
            </div>
        </div>
    )
}
