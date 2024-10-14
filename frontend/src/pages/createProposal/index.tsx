import { FormHeader } from '@/components/auth/FormHeader'
import { Container } from '@/components/shared/Container'
import { ContainerOutline } from '@/components/shared/ContainerOutline'
import { Button } from '@/components/shared/Button'
import { TextField } from '@/components/forms/TextField'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { ImageUpload } from '@app/components/forms/image'
import { RoleDropdown } from '@app/components/forms/roleDropDown'
import { JurisdictionDropdown } from '@app/components/forms/JurisdictionDropdown'
import { useState } from 'react'
import Swal from 'sweetalert2'
import AuthLayout from '../auth/layout'
import { LinkList } from '@app/components/forms/LinkList'
import { useProposal } from '@app/hooks/useProposal'
import { ProposalRequest } from '@app/declarations/proposal/proposal.did'
import { Jurisdiction, Role } from '@app/declarations/home/home.did'
import { LinkOption } from '@app/utils'
import { Link } from '@app/declarations/proposal/proposal.did'
import { SelectedJurisdiction } from '@app/utils/jurisdiction'

export default function CreateProposal() {

    const [selectedJurisdictions, setSelectedJurisdictions] = useState<SelectedJurisdiction[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [listedLinks, setListedLinks] = useState<LinkOption[]>([]);
    const [imageData, setImageData] = useState<Uint8Array | number[] | null>(null); // Estado para guardar los datos
    const { createProposal } = useProposal();

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

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const date = new Date(data.LimitDate as string);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0, por eso se suma 1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}:${hours}:${minutes}`;

        const newProposal: ProposalRequest = {
            name: data.name as string,
            threshold: BigInt(data.threshold as string),
            description: [data.descriptions as string],
            location: selectedJurisdictions.map((jurisdiction) => ({
                continent: [jurisdiction.continent],
                country: [jurisdiction.country],
                region: [jurisdiction.city]
            })) as Jurisdiction[],
            invitedRoles: selectedRoles.map((role) => ({ [role]: null })) as Role[],
            environmentalUnits: BigInt(data.UnidadesAmbientales as string),
            deadline: formattedDate,
            links: listedLinks.map((link) => ({
                url: link.url,
                description: link.description,
            })) as Link[],
            photo: imageData,
        }

        const result = await createProposal(newProposal);

        if ('ok' in result && 'SuccessText' in result.ok) {
            Swal.fire({
                title: 'Success',
                text: result.ok.SuccessText,
                icon: 'success',
            })
        }
        if ('err' in result) {
            if ('UserNotAuthenticated' in result.err) {
                Swal.fire({
                    title: 'Error',
                    text: 'User Not Authenticated',
                    icon: 'error',
                })
            }
            if ('ProposalNotFound' in result.err) {
                Swal.fire({
                    title: 'Error',
                    text: 'Proposal Not Found',
                    icon: 'error',
                })
            }
            if ('NoUsersFound' in result.err) {
                Swal.fire({
                    title: 'Error',
                    text: 'No Users Found',
                    icon: 'error',
                })
            }
            if ('UserNotApproved' in result.err) {
                Swal.fire({
                    title: 'Error',
                    text: 'User Not Approved',
                    icon: 'error',
                })
            }
            if ('InvalidDate' in result.err) {
                Swal.fire({
                    title: 'Error',
                    text: 'Invalid Date',
                    icon: 'error',
                })
            }
            if ('UserNotAuthorized' in result.err) {
                Swal.fire({
                    title: 'Error',
                    text: 'User Not Authorized',
                    icon: 'error',
                })
            }
        }
    }

    return (
        <AuthLayout>
            <Container className='max-w-lg py-5 sm:max-w-xl lg:max-w-6xl'>
                <div className='lg:grid lg:grid-cols-1 lg:gap-x-8 xl:gap-x-36 '>
                    <div className='relative z-10 flex flex-col shadow-inner-blur'>
                        <ContainerOutline />

                        <FormHeader
                            title='Agrega Tu Proyecto'
                            description='Completa los datos para registrar tu propuesta'
                        />
                        <form onSubmit={handleSubmit} className='mt-9 px-6 pb-10 sm:px-10 '>
                            <div className='space-y-8 lg:grid-cols-2'>
                                <div className='space-y-8 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0'>
                                    <TextField
                                        label='Nombre'
                                        name='name'
                                        placeholder='Escribe el nombre del proyecto'
                                        required
                                    />
                                    <TextField
                                        label='Umbral'
                                        name='threshold'
                                        type='number'
                                        min={0}
                                        autoComplete='email'
                                        placeholder='Cantidad mínima de votos para aprobar la propuesta'
                                        required
                                    />
                                    <TextField
                                        label='Unidades ambientales'
                                        name='UnidadesAmbientales'
                                        type='number'
                                        autoComplete='UnidadesAmbientales'
                                        placeholder='0'
                                        required
                                    />
                                    <TextField
                                        label='Fecha Limite'
                                        name='LimitDate'
                                        type='datetime-local'
                                        required
                                    />
                                </div>

                                <JurisdictionDropdown selectedJurisdictions={selectedJurisdictions} setSelectedJurisdictions={setSelectedJurisdictions} />

                                <RoleDropdown selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
                                <TextField
                                    label='Descripción'
                                    name='descriptions'
                                    elementType="textarea"
                                    placeholder='Escribe una descripción de la propuesta'
                                    required
                                />
                                <ImageUpload setImageData={setImageData} />

                                <LinkList listedLinks={listedLinks} setListedLinks={setListedLinks} />

                            </div>

                            <div className='mt-5 flex items-center justify-between space-x-4'>

                                <Button type='submit' className='sm:px-5'>
                                    <span>Crear propuesta</span>
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
