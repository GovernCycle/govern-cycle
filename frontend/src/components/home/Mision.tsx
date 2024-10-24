import { ChevronDownIcon, GlobeAltIcon, HeartIcon, LightBulbIcon, BeakerIcon } from '@heroicons/react/16/solid'
import { Container } from '@/components/shared/Container'
import { StarField } from '@/components/shared/StarField'
import { cn } from '@/lib/utils'

const careerBenefits = [
    {
        title: 'Empoderar a las personas',
        icon: GlobeAltIcon,
        description: 'Queremos que todos puedan influir en la conservación de nuestro planeta.',
        borderClassName:
            'after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-violet-200/[0.025] md:after:from-transparent after:to-violet-200/[0.075] md:after:to-violet-200/[0.125]',
    },
    {
        title: 'Votación segura',
        icon: HeartIcon,
        description: 'Garantizamos que cada voto sea seguro y transparente, gracias a la tecnología de blockchain.',
        borderClassName:
            'after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-violet-200/[0.075] after:to-violet-200/[0.15] lg:after:to-violet-200/[0.25] md:after:via-violet-200/[0.25] md:after:to-violet-200/[0.125] lg:after:via-violet-200/[0.1875] before:content-[""] before:hidden sm:before:block before:absolute before:left-0 before:h-full before:w-px before:bg-gradient-to-b before:from-violet-200/[.01] before:to-violet-200/[0.075] md:before:to-violet-200/[0.125]',
    },
    {
        title: 'Reconocimiento de tus ideas',
        icon: LightBulbIcon,
        description: 'Si tu propuesta es seleccionada, recibirás un NFT que demuestra que eres el autor, protegiéndola como tuya.',
        borderClassName:
            'after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r lg:after:from-violet-200/[0.25] lg:after:to-violet-200/[0.125] after:from-violet-200/[0.15] after:to-violet-200/[0.075] md:after:from-violet-200/[0.125] md:after:to-transparent before:md:block before:hidden before:content-[""] before:absolute before:left-0 before:h-full before:w-px before:bg-gradient-to-b before:from-violet-200/[.015] lg:before:to-violet-200/[0.25] before:to-violet-200/[0.125]',
    },
    {
        title: 'Fomentar la participación',
        icon: BeakerIcon,
        description: 'Incentivamos a la comunidad a involucrarse en decisiones ambientales y recompensamos su compromiso.',
        borderClassName:
            'md:hidden before:hidden before:sm:block lg:block after:inset-x-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-violet-200/[0.075] after:to-violet-200/[0.025] lg:after:from-violet-200/[0.125] lg:after:to-transparent before:content-[""] before:absolute before:left-0 before:h-full before:w-px before:bg-gradient-to-b md:before:from-violet-200/[.01] md:before:to-violet-200/[0.125] before:from-violet-200/[0.075] before:to-violet-200/[0.025]',
    },

]

export function Mision() {
    return (
        <section className='relative overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-24'>
            <Container>
                {/* Mision of the app*/}
                <div className='relative flex flex-col items-center'>
                    <h1 className='max-w-4xl text-center text-4xl font-bold leading-extratight text-text-secondary sm:text-5xl sm:leading-extratight'>
                        ¿Qué hacemos en &nbsp;
                        <span className='relative inline-block text-nowrap'>
                            <span className='relative z-10 bg-gradient-to-b from-cream-500 via-carafe-500 to-cream-500 bg-clip-text text-transparent'>
                                GabbiiDAO
                            </span>
                            <span className='absolute -top-px left-0 -z-10 text-charcoal-200'>
                                GabbiiDAO
                            </span>
                        </span>
                        &nbsp;?
                    </h1>
                    <p className='mt-5 max-w-xl text-center text-lg leading-8 text-text-tertiary'>
                        Te ayudamos a participar en decisiones importantes para proteger el medio ambiente.
                        Utilizamos tecnología segura para que puedas registrarte y votar sin preocupaciones, asegurando que tu identidad esté protegida.

                    </p>
                </div>

                {/* Objetives of the app */}
                <div className='relative mt-12 sm:mt-18'>
                    <div className='relative mt-8 flex flex-wrap items-stretch justify-center gap-6'>
                        {careerBenefits.map((benefit) => (
                            <div
                                key={`benefit-${benefit.title}`}
                                className={cn(
                                    "group relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-gradient-to-b after:absolute after:content-['']",
                                    benefit.borderClassName
                                )}
                            >
                                <div className='relative flex h-full w-full flex-col '>
                                    <div
                                        className='absolute inset-0 opacity-0 duration-300 ease-in-out group-hover:opacity-100'
                                        aria-hidden='true'
                                    >
                                        <StarField density='high' maxRadius={1.75} minRadius={1} />
                                    </div>
                                    <div className='hover-gradient absolute inset-0 -z-10 bg-gradient-to-b from-[#875F59]/30 to-[#B49870]/30 opacity-0 blur-4xl duration-300 ease-in-out group-hover:opacity-100' />
                                    <div className='relative z-10 flex flex-col flex-grow justify-center px-6 py-8 sm:px-8'>
                                        <benefit.icon className='h-8 w-8 text-text-tertiary sm:h-9 sm:w-9' />
                                        <h4 className='mt-6 text-lg font-bold text-text-tertiary'>
                                            {benefit.title}
                                        </h4>
                                        <p className='mt-3 text-base text-text-primary'>
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </Container>
        </section>
    )
}
