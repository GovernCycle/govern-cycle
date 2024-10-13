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
import { useState } from 'react'
import { Jurisdiction, Role, UserRequest } from '@app/declarations/home/home.did'
import { useHome } from '@app/hooks/useHome'
import Swal from 'sweetalert2'

interface SelectedJurisdiction {
  continent: string;
  country: string;
  city: string;
}

interface CountryOption {
  name: string;
  flag: string;
  callingCode: string;
}

export default function Signup() {

  const [selectedJurisdictions, setSelectedJurisdictions] = useState<SelectedJurisdiction[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [imageData, setImageData] = useState<Uint8Array | number[] | null>(null); // Estado para guardar los datos
  const { createProfile } = useHome();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedJurisdictions.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Please select a jurisdiction',
        icon: 'error',
      })
      return
    }

    if (selectedRoles.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Please select a role',
        icon: 'error',
      })
      return
    }

    if (imageData === null) {
      Swal.fire({
        title: 'Error',
        text: 'Please upload a logo',
        icon: 'error',
      })
      return
    }

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)

    const newUser: UserRequest = {
      name: data['first-name'] as string,
      manager: [],
      email: data['email'] as string,
      phone: phoneNumber,
      logo: imageData,
      role: selectedRoles.map((role) => ({ [role]: null })) as Role[],
      jurisdiction: selectedJurisdictions.map((jurisdiction) => ({
        continent: [jurisdiction.continent],
        country: [jurisdiction.country],
        region: [jurisdiction.city]
      })) as Jurisdiction[],
    }
    const result = await createProfile(newUser)

    if ('ok' in result && 'SuccessText' in result.ok) {
      Swal.fire({
        title: 'Success',
        text: result.ok.SuccessText,
        icon: 'success',
      })
    }
    if ('err' in result && 'UserAlreadyExists' in result.err) {
      Swal.fire({
        title: 'Error',
        text: 'User already exists',
        icon: 'error',
      })
    }

    if ('err' in result && 'UserNotAuthenticated' in result.err) {
      Swal.fire({
        title: 'Error',
        text: 'User Not Authenticated',
        icon: 'error',
      })
    }
  }

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
            <form onSubmit={handleSubmit} className='mt-9 px-6 pb-10 sm:px-10'>
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

                <ImageUpload setImageData={setImageData} />
                <JurisdictionDropdown selectedJurisdictions={selectedJurisdictions} setSelectedJurisdictions={setSelectedJurisdictions} />
                <PhoneNumberInput selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
                  phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
                <RoleDropdown selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
              </div>

              <div className='mt-5 flex items-center justify-between space-x-4'>

                <Button type='submit' className='sm:px-5'>
                  <span>Registrar</span>
                  <ChevronRightIcon className='h-4 w-4' />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </AuthLayout>
  )
}
