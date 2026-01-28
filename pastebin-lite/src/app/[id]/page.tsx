import { getPaste } from '@/lib/redis';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PastePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const paste = await getPaste(id);

    if (!paste) {
        notFound();
    }

    // Handle single-view/burn logic visually if needed, though getPaste already handled incrementing.
    // We can show "Views: X" if we want, but Redis hash returns strings mostly.

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl space-y-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-sm text-purple-400 hover:text-purple-300 flex items-center transition-colors">
                        ← Create New
                    </Link>
                    <h1 className="text-xl font-bold text-neutral-200">Paste: {id}</h1>
                </div>

                <div className="bg-neutral-800/50 backdrop-blur-sm shadow-xl rounded-2xl border border-neutral-700/50 p-6 sm:p-10 overflow-hidden">

                    {paste.viewLimit && (
                        <div className="mb-4 inline-block px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs text-yellow-500">
                            View Limit: {paste.viewLimit} (Current Views: {paste.views})
                        </div>
                    )}

                    <pre className="w-full overflow-x-auto text-sm sm:text-base font-mono text-neutral-300 whitespace-pre-wrap break-words">
                        {paste.content}
                    </pre>
                </div>

                <div className="text-center text-xs text-neutral-500">
                    Raw content available via API
                </div>
            </div>
        </div>
    );
}
