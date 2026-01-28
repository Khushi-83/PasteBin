import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col items-center justify-center p-4 text-center font-sans">
            <div className="space-y-6 max-w-md">
                <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    404
                </h1>
                <h2 className="text-2xl font-bold text-neutral-200">Paste Not Found</h2>
                <p className="text-neutral-400">
                    This paste might have expired, reached its view limit, or never existed in the first place.
                </p>
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all transform hover:scale-[1.02]"
                    >
                        Create New Paste
                    </Link>
                </div>
            </div>
        </div>
    );
}
