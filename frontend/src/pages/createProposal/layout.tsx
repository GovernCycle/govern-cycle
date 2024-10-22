import Image from 'next/image'
import { HeroContainer } from '@/components/shared/HeroContainer'
import { Button } from '@/components/shared/Button'
import { XMarkIcon } from '@heroicons/react/24/solid'
import forestLignthing from '@/images/forest-light-background.png'
import FortestLeft from '@/images/forest-sunset-left.png'
import FortestRight from '@/images/forest-sunset-right.png'
import birdsLeft from '@/images/birds1.png'
import birdsRight from '@/images/birds2.png'
import cloudLeft from '@/images/Cloud-sunset-1.png'
import cloudRight from '@/images/Cloud-sunset-1.png'

export default function ProposalLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <HeroContainer
            header={false}
            starField={true}
            starfieldWhite={true}
            form={true}
            className='flex min-h-screen items-center justify-center overflow-hidden '
            bgGradientClassName='-top-48 bottom-0 h-[calc(100%_+_320px)]'
            innerContainerClassName='w-full overflow-hidden sm:overflow-visible'
        >
            <div className='absolute bottom-0 left-0 right-0 z-0'>
                <Image
                    src={forestLignthing}
                    alt=''
                    className='w-full h-auto object-cover custom-scale'
                    sizes='(max-width: 1024px) 100vw, 1024px'
                    priority
                />
            </div>

            <div className="absolute bottom-0 left-0 z-3 animate-slide-in-left">
                <Image
                    src={FortestLeft}
                    alt=""
                    className="h-auto w-[60vw] object-cover lg:w-[60vw]"
                    sizes="(max-width: 1024px) 60vw, 512px"
                    priority
                />
            </div>

            <div className="absolute bottom-0 right-0 z-4 animate-slide-in-right ">
                <Image
                    src={FortestRight}
                    alt=""
                    className="h-auto w-[70vw] object-cover lg:w-[70vw]"
                    sizes="(max-width: 1024px) 60vw, 512px"
                    priority
                />
            </div>

            {/* Cambiar `fixed` por `absolute` */}
            <div className="absolute top-10 left-[20%] z-5 animate-combined-left">
                <Image
                    src={birdsLeft}
                    alt=""
                    className="h-auto w-[20vw] object-cover"
                />
            </div>

            <div className="absolute top-10 right-[20%] z-5 animate-combined-right">
                <Image
                    src={birdsRight}
                    alt=""
                    className="h-auto w-[20vw] object-cover"
                />
            </div>
            <div className="absolute top-10 left-[5%] z-5 animate-cloud-left">
                <Image
                    src={cloudLeft}
                    alt=""
                    className="h-auto w-[20vw] object-cover"
                />
            </div>
            <div className="absolute top-96 right-[20%] z-5 animate-cloud-right">
                <Image
                    src={cloudRight}
                    alt=""
                    className="h-auto w-[10vw] object-cover"
                />
            </div>
            <Button
                href='/'
                variant='secondary'
                size='md'
                className='absolute right-4 top-4 hidden p-2 sm:flex lg:right-12 lg:top-12 lg:p-2.5'
            >
                <XMarkIcon className='h-4.5 w-4.5 lg:h-5 lg:w-5' />
            </Button>

            {children}
        </HeroContainer>
    )
}
