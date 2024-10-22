import { useState } from "react";
import { TextField } from "./TextField";
import { Button } from '@/components/shared/Button'
import { LinkOption } from "@app/utils";

export const LinkList = ({
    listedLinks,
    setListedLinks,
}: {
    listedLinks: LinkOption[];
    setListedLinks: React.Dispatch<React.SetStateAction<LinkOption[]>>;
}) => {
    const [currentDescription, setCurrentDescription] = useState<string>();
    const [currentUrl, setCurrentUrl] = useState<string>();
    const [currentLink, setCurrentLink] = useState<LinkOption>();

    const addLink = () => {
        if (!currentDescription || !currentUrl) {
            return;
        }
        const newLink: LinkOption = {
            description: currentDescription,
            url: currentUrl,
        };
        setListedLinks([...listedLinks, newLink]);
        setCurrentDescription('');
        setCurrentUrl('');
    }

    const removeLink = (link: LinkOption) => {
        setListedLinks(listedLinks.filter((l) => l !== link));
    }

    const handleCurrentDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentDescription(e.target.value);
    }

    const handleCurrentUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentUrl(e.target.value);
    }


    return (
        <div className="flex flex-col space-x-3">

            <div className="flex items-center space-x-4">
                <TextField
                    className="w-full"
                    name='description'
                    value={currentDescription}
                    onChange={handleCurrentDescriptionChange}
                    placeholder='Descripción'
                />
                <TextField
                    className="w-full"
                    name='url'
                    value={currentUrl}
                    onChange={handleCurrentUrlChange}
                    placeholder='https://example.com'
                />
                <Button type='button'
                    onClick={addLink}>
                    Agregar Enlace
                </Button>

            </div>
            <div>
                <ul className="grid grid-cols-2 gap-4">
                    {listedLinks.map((link) => (
                        <li key={link.url} className="block text-sm text-[var(--color-text-ternary)] py-2.5 px-2.5">
                            {link.description} - {link.url}
                            <button
                                type="button"
                                onClick={() => removeLink(link)}
                                className="ml-4 py-1 px-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 cursor-pointer"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
