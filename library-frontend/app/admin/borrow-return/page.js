
import Image from 'next/image';
export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center w-full pt-10 pr-20 bg-gray-900 text-white overflow-hidden">
            <h1 className="text-7xl font-extrabold text-red-600 mb-4">404</h1>
            <p className="text-2xl text-gray-400 mb-6">Page Not Found</p>
            <Image
                src="/img/error404.gif"
                alt="Unauthorized GIF"
                width={498}
                height={282}
                className=" object-contain mb-6"
            />
            <p className="text-gray-500">Looks like you wandered off the path...</p>
        </div>
    );
}