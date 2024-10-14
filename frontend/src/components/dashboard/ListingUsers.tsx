import React from 'react'

import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { ContentPill } from '@/components/shared/ContentPill'
import { cn } from '@/lib/utils'
import { ChevronRightIcon } from '@heroicons/react/16/solid'

import longGradient from '@/images/long-gradient.png'
import avatar from '@/images/avatars/avatar-2.png'

import windowCode from '@/icons/nucleo/window-code-16.svg'
import magicWand from '@/icons/nucleo/magic-wand-16.svg'
import trendUp from '@/icons/nucleo/trend-up-16.svg'



const jobListings = [
    {
        category: 'Engineering',
        icon: windowCode,
        jobs: [
            {
                title: 'Staff Fullstack Engineer',
                location: 'Remote - United States',
            },
            {
                title: 'Senior - Front-End Developer',
                location: 'Remote - Europe',
            },
            {
                title: 'Intern - Security Analyst',
                location: 'Remote - North America',
            },
            {
                title: 'Senior - DevOps Engineer',
                location: 'Remote - South America',
            },
        ],
    },
    {
        category: 'Product and Design',
        icon: magicWand,
        jobs: [
            {
                title: 'Executive Product Manager',
                location: 'Remote - Anywhere on Earth',
            },
            {
                title: 'Senior - UX/UI Designer',
                location: 'Remote - North America',
            },
            {
                title: 'Entry - Graphic Designer',
                location: 'Remote - Europe',
            },
        ],
    },
    {
        category: 'Sales and Marketing',
        icon: trendUp,
        jobs: [
            {
                title: 'Digital Marketing Specialist',
                location: 'Remote - South America',
            },
            {
                title: 'Sales Representative',
                location: 'Remote - United States',
            },
            {
                title: 'Content Strategist',
                location: 'Remote - Asia',
            },
        ],
    },
]

const ListingUsers = () => {
    return (
        <div>      {/* Job listings */}
            <div className='mt-16 space-y-16 sm:mt-24'>
                {jobListings.map((jobsGroup) => (
                    <div key={`jobs-${jobsGroup.category}`} className='space-y-6'>
                        <ContentPill Icon={jobsGroup.icon} text={jobsGroup.category} />
                        <ul role='list'>
                            {jobsGroup.jobs.map((job, index) => (
                                <li
                                    key={`jobs-${jobsGroup.category}-${index}`}
                                    className='relative bg-zinc-950/[.01] shadow-inner-blur first:rounded-t-2xl last:rounded-b-2xl'
                                >
                                    <div
                                        className={cn(
                                            'flex items-center justify-between space-x-3 border border-violet-200/[.06] border-t-transparent p-6 md:space-x-4 md:p-8',
                                            index === 0 &&
                                            'rounded-t-2xl border-b-violet-200/[.06] border-t-violet-200/[.06]',
                                            jobsGroup.jobs.length - 1 === index && 'rounded-b-2xl'
                                        )}
                                    >
                                        <div className='flex sm:w-2/5'>
                                            <p className='text-[15px] font-semibold text-violet-100 md:text-base'>
                                                {job.title}
                                            </p>
                                        </div>
                                        <div className='flex items-center justify-between space-x-4 sm:w-3/5'>
                                            <p className='hidden text-[15px] font-medium text-zinc-400 sm:block md:text-base'>
                                                {job.location}
                                            </p>
                                            <a
                                                href='#'
                                                className='flex items-center text-sm font-semibold leading-4 text-violet-400 duration-200 ease-in-out hover:text-violet-300'
                                            >
                                                <span className='absolute inset-x-0 -top-px bottom-0 sm:hidden' />
                                                <p className='hidden items-center sm:flex'>
                                                    Apply
                                                    <span className='ml-1 hidden md:block'> today</span>
                                                </p>
                                                <ChevronRightIcon className='ml-2 h-5 w-5 text-violet-300 duration-200 ease-in-out sm:h-4 sm:w-4' />
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div></div>
    )
}

export default ListingUsers