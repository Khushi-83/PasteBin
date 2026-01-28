import { NextRequest, NextResponse } from 'next/server';
import { getPaste } from '@/lib/redis';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // In Next.js 15+, params is a Promise
) {
    try {
        const { id } = await params;

        const paste = await getPaste(id);

        if (!paste) {
            return NextResponse.json({ error: 'Paste not found or expired' }, { status: 404 });
        }

        return NextResponse.json(paste);
    } catch (error) {
        console.error('Error fetching paste:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
