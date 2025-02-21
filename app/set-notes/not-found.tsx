import Image from "next/image";

export default function NotFound() {
    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col gap-y-8">
                    <Image 
                        src={'/not_found.svg'}
                        alt="not found"
                        width={280}
                        height={280}
                    />
                    <h1 className="text-2xl font-bold text-center">Upps notes not found</h1>
                </div>
            </div>
        </>
    )
}