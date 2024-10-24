import { FormHeader } from '@/components/auth/FormHeader'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'
import { TextField } from '@/components/forms/TextField'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import AuthLayout from '../layout'
import { RoleDropdown } from '@app/components/forms/roleDropDown'
import { JurisdictionDropdown } from '@app/components/forms/JurisdictionDropdown'
import { PhoneNumberInput } from '@app/components/forms/PhoneNumberInput'
import { useContext, useState } from 'react'
import { Jurisdiction, Role, UserRequest } from '@app/declarations/home/home.did'
import { useHome } from '@app/hooks/useHome'
import Swal from 'sweetalert2'
import { SelectedJurisdiction } from '@app/utils/jurisdiction'
import { CountryOption, handleProfileResult } from '@app/utils'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { UserContext } from '@app/context/userContext'
import { Alert } from '@mui/material'
import Loading from '@app/components/loading/Loading'

export default function Signup() {

  const [selectedJurisdictions, setSelectedJurisdictions] = useState<SelectedJurisdiction[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const { createProfile } = useHome();
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedJurisdictions.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Please select a location',
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

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)

    const newUser: UserRequest = {
      name: data['first-name'] as string,
      manager: [],
      email: data['email'] as string,
      phone: phoneNumber,
      logo: data.logo as string,
      role: selectedRoles.map((role) => ({ [role]: null })) as Role[],
      jurisdiction: selectedJurisdictions.map((jurisdiction) => ({
        continent: [jurisdiction.continent],
        country: [jurisdiction.country],
        region: [jurisdiction.city]
      })) as Jurisdiction[],
    }
    setIsLoading(true)
    const result = await createProfile(newUser)

    if ('ok' in result && 'SuccessText' in result.ok) {
      Swal.fire({
        title: 'Quedas pendiente de aprobación por Secretaría Técnica',
        text: result.ok.SuccessText,
        icon: 'success',
      })
    }
    if ('err' in result) {
      const handleError = handleProfileResult(result.err);
      Swal.fire({
        title: 'Error',
        text: handleError,
        icon: 'error',
      });
    }
    setIsLoading(false)
  }

  return (
    <AuthLayout>
      <Container className='max-w-lg py-5 sm:max-w-xl lg:max-w-6xl m-6'>
        {user.role.length != 0 && (
          <Alert
            severity='info'
            className='z-[1000] absolute'
          >
            <strong>¡Hola {user.name}!</strong> Ya tienes una cuenta.
          </Alert>
        )}


        <div className={`${user.role.length == 0 ? 'lg:grid lg:grid-cols-1 lg:gap-x-8 xl:gap-x-36' : 'hidden'}`}>
          <SimpleBar style={{ maxHeight: '90vh' }} className='relative z-0 flex flex-col shadow-inner-blur bg-[var(--color-background-ternary-op)] rounded-2xl'>

            {/* Contenido dentro de SimpleBar */}
            <FormHeader
              title='Bienvenidos a Gabbi DAO'
              description='Completa los datos para comenzar'
            />
            {isLoading && (
              <div className='flex justify-center w-full items-center'>
                <Loading />
              </div>
            )}
            {!isLoading && (
              <form onSubmit={handleSubmit} className='mt-9 px-6 pb-10 sm:px-10'>
                <div className='space-y-6'>
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

                  <TextField
                    label='Logo'
                    name='logo'
                    placeholder='Sube tu logo'
                    required
                  />
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
            )}
          </SimpleBar>
        </div>
      </Container>
    </AuthLayout>
  )
}
