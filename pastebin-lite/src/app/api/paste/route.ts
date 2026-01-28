import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { savePaste } from '@/lib/redis';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { content, expiry, viewLimit } = body;

        if (!content) {
            return NextResponse.json({ error: 'Content is required' }, { status: 400 });
        }

        const id = nanoid(8); // Short ID

        // Parse expiry to number if present
        const expiryInt = expiry ? parseInt(expiry) : undefined;
        const viewLimitInt = viewLimit ? parseInt(viewLimit) : undefined;

        await savePaste(id, content, expiryInt, viewLimitInt);

        const url = `${req.nextUrl.origin}/${id}`;

        return NextResponse.json({ id, url });
    } catch (error) {
        console.error('Error creating paste:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
