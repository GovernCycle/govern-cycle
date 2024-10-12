import Link from 'next/link'
import { TestimonialSlider } from '@/components/auth/TestimonialSlider'
import { FormHeader } from '@/components/auth/FormHeader'
import { Container } from '@/components/shared/Container'
import { ContainerOutline } from '@/components/shared/ContainerOutline'
import { Button } from '@/components/shared/Button'
import { TextField } from '@/components/forms/TextField'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import AuthLayout from '../layout'
import { ImageUpload } from '@app/components/forms/image'
import { RoleDropdown } from '@app/components/forms/roleDropDown'
import { JurisdictionDropdown } from '@app/components/forms/JurisdictionDropdown'
import { PhoneNumberInput } from '@app/components/forms/PhoneNumberInput'


export default function Signup() {
  return (
    <AuthLayout>
      <Container className='max-w-lg py-5 sm:max-w-xl lg:max-w-6xl'>
        <div className='lg:grid lg:grid-cols-1 lg:gap-x-8 xl:gap-x-36 '>
          <div className='relative z-10 flex flex-col shadow-inner-blur'>
            <ContainerOutline />

            <FormHeader
              title='Bienvenidos a Gabbi DAO'
              description='Completa los datos para comenzar'
            />
            {/* 
            <div className='mt-8 flex w-full items-center px-10'>
              <div className='h-px flex-1 bg-gradient-to-r from-violet-200/5 to-violet-200/10'></div>
              <h4 className='flex-shrink-0 px-4 text-xs text-[var(--color-text-inverse)]'>

                or sign up with
              </h4>
              <div className='h-px flex-1 bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-secondary)]'></div>
            </div> */}
            <form action='#' method='POST' className='mt-9 px-6 pb-10 sm:px-10'>
              <div className='space-y-8'>
                <div className='space-y-8 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0'>
                  <TextField
                    label='Nombre'
                    name='first-name'
                    autoComplete='Nombres'
                    placeholder='Escribe tu nombre'
                    required
                  />
                  <TextField
                    label='Email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    placeholder='johnnybravo@gmail.com'
                    required
                  />

                </div>

                <ImageUpload />
                <JurisdictionDropdown />
                <PhoneNumberInput />
                <RoleDropdown />
              </div>

              <div className='mt-5 flex items-center justify-between space-x-4'>

                <Button type='submit' className='sm:px-5'>
                  <span>Continue</span>
                  <ChevronRightIcon className='h-4 w-4' />
                </Button>
              </div>
            </form>
          </div>
          {/* <TestimonialSlider /> */}
        </div>
      </Container>
    </AuthLayout>
  )
}
