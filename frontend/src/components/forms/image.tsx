import { useState } from 'react';
import { Label } from './Label';

export const ImageUpload = ({
    setImageData,
}: {
    setImageData: React.Dispatch<React.SetStateAction<Uint8Array | number[] | null>>;
}) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name); // Guarda el nombre del archivo seleccionado

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string); // Muestra la vista previa de la imagen
            };
            reader.readAsDataURL(file);
            // Convertir la imagen a Uint8Array o number[]
            const arrayBufferReader = new FileReader();
            arrayBufferReader.onloadend = () => {
                const arrayBuffer = arrayBufferReader.result as ArrayBuffer;

                // Convertir ArrayBuffer a Uint8Array
                const uint8Array = new Uint8Array(arrayBuffer);
                setImageData(uint8Array); // Guardar Uint8Array en el estado
            };
            arrayBufferReader.readAsArrayBuffer(file); // Leer como ArrayBuffer

        }
    };

    return (
        <div className="space-x-4 flex">
            <div className='items-center justify-center space-y-5' >
                <Label name={"image-upload"}>
                    Logo
                </Label>
                <div className='image-input'>
                    <label
                        htmlFor="image-upload"
                        className=" block  text-sm text-[var(--color-text-ternary)] opacity-50 py-2.5 px-2.5 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[var(--color-text-ternary)] hover:file:bg-blue-100 cursor-pointer "
                    >
                        {fileName ? fileName : "Subir Logo"}
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/png"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
            </div>

            {preview && (
                <div className="">
                    {/* <p className="text-sm font-medium text-gray-700">Vista del logo:</p> */}
                    <img src={preview} alt="Selected Image" className="mt-2 w-32 h-32 object-cover rounded-md" />
                </div>
            )}
        </div>
    );
};
