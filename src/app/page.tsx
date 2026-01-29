'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [content, setContent] = useState('');
  const [expiry, setExpiry] = useState('3600'); // Default 1 hour
  const [viewLimit, setViewLimit] = useState('');
  const [loading, setLoading] = useState(false);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCreatedUrl(null);

    try {
      const res = await fetch('/api/paste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          expiry: expiry === 'never' ? undefined : parseInt(expiry),
          viewLimit: viewLimit ? parseInt(viewLimit) : undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create paste');
      }

      const data = await res.json();
      setCreatedUrl(data.url);
      setContent('');
      setViewLimit('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 sm:text-5xl">
            Pastebin Lite
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Share code, notes, and snippets securely.
          </p>
        </div>

        <div className="bg-neutral-800/50 backdrop-blur-sm shadow-xl rounded-2xl border border-neutral-700/50 p-6 sm:p-10">
          {!createdUrl ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-neutral-300">
                  New Paste
                </label>
                <div className="mt-2">
                  <textarea
                    id="content"
                    name="content"
                    rows={12}
                    className="block w-full rounded-xl bg-neutral-900 border-neutral-700 text-neutral-200 placeholder-neutral-500 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-4 font-mono transition-colors"
                    placeholder="// Paste your code here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-neutral-300">
                    Expiration
                  </label>
                  <select
                    id="expiry"
                    name="expiry"
                    className="mt-2 block w-full rounded-lg bg-neutral-900 border-neutral-700 text-neutral-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2.5"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  >
                    <option value="600">10 Minutes</option>
                    <option value="3600">1 Hour</option>
                    <option value="86400">1 Day</option>
                    <option value="604800">1 Week</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="viewLimit" className="block text-sm font-medium text-neutral-300">
                    View Limit (Optional)
                  </label>
                  <input
                    type="number"
                    id="viewLimit"
                    name="viewLimit"
                    className="mt-2 block w-full rounded-lg bg-neutral-900 border-neutral-700 text-neutral-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2.5"
                    placeholder="Enter number (e.g. 5)"
                    value={viewLimit}
                    onChange={(e) => setViewLimit(e.target.value)}
                    min="1"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.01]"
                >
                  {loading ? 'Creating...' : 'Create Paste'}
                </button>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white">Paste Created!</h3>

              <div className="bg-neutral-900 rounded-lg p-4 flex items-center justify-between border border-neutral-700">
                <code className="text-purple-400 text-sm truncate">{createdUrl}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(createdUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="ml-4 text-xs bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-md transition-colors min-w-[60px]"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <button
                onClick={() => setCreatedUrl(null)}
                className="text-sm text-neutral-400 hover:text-white underline transition-colors"
              >
                Create another
              </button>

              <div className="pt-4">
                <Link href={createdUrl || '#'} className="inline-block px-5 py-2.5 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm font-medium transition-colors">
                  View Paste
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
