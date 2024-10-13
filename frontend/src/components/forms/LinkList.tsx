import { SetStateAction, useState } from "react";
import { TextField } from "./TextField";
import { Button } from '@/components/shared/Button'

export const LinkList = ({
    listedLinks,
    setListedLinks,
}: {
    listedLinks: string[];
    setListedLinks: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const [currentLink, setCurrentLink] = useState<string>('');
    const addLink = () => {
        if (currentLink && !listedLinks.includes(currentLink)) {
            setListedLinks([...listedLinks, currentLink]);
        }
    };

    const removeLink = (link: string) => {
        setListedLinks(listedLinks.filter((l) => l !== link));
    }

    const handleLinkChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setCurrentLink(e.target.value);
    }

    return (
        <div className="space-y-2">
            <TextField
                name='link'
                value={currentLink}
                onChange={handleLinkChange}
                placeholder='https://example.com'
            />
            <Button type='button' onClick={addLink}>
                Agregar Enlace
            </Button>

            <ul className="grid grid-cols-2 gap-4">
                {listedLinks.map((link) => (
                    <li key={link} className="block text-sm text-[var(--color-text-ternary)] py-2.5 px-2.5">
                        {link}
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
    )
}
