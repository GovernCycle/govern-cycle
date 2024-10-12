import { useState } from 'react';
import { Label } from './Label';
import { Button } from '../shared/Button';

// Definimos los roles como strings
const roles: string[] = [
    'Academy',
    'TechnicalExpert',
    'ProjectDeveloper',
    'Register',
    'TechnicalSecretariat',
    'Government',
    'Standard',
    'Validator',
    'Community'
];

export const RoleDropdown: React.FC = () => {
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [currentRole, setCurrentRole] = useState<string>('');

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentRole(e.target.value);
    };

    const addRole = () => {
        if (currentRole && !selectedRoles.includes(currentRole)) {
            setSelectedRoles([...selectedRoles, currentRole]);
        }
    };

    const removeRole = (role: string) => {
        setSelectedRoles(selectedRoles.filter((r) => r !== role));
    };

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <Label name="role-dropdown" >
                    Select Role
                </Label>
                <div className='flex space-x-2'>
                    <select
                        id="role-dropdown"
                        value={currentRole}
                        onChange={handleRoleChange}
                        className="block w-full text-sm text-[var(--color-text-ternary)] opacity-50 py-2.5 rounded-md border-0 bg-form-input"
                    >
                        <option value="" disabled>Selecciona un rol</option>
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                    <Button
                        type="button"
                        onClick={addRole}

                    >
                        Add Role
                    </Button>
                </div>
            </div>


            {selectedRoles.length > 0 && (
                <div>
                    <p className="text-sm text-[var(--color-text-ternary)] opacity-50 py-2.5">Selected Roles:</p>
                    <ul className="grid grid-cols-2 gap-4">
                        {selectedRoles.map((role) => (
                            <li key={role} className="block text-sm text-[var(--color-text-ternary)] py-2.5 px-2.5">
                                {role}
                                <button
                                    type="button"
                                    onClick={() => removeRole(role)}
                                    className="ml-4 py-1 px-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 cursor-pointer"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

            )}
        </div>
    );
};
