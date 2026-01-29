# Pastebin Lite

A fast, secure, and modern pastebin clone built with Next.js 16, React 19, and Redis. Share code snippets and notes with optional expiration times and view limits.

## Features

- 📝 **Create Pastes**: Easily paste text or code.
- ⏱️ **Expiration**: Set pastes to expire after a specific time (10 minutes, 1 hour, 1 day, 1 week, or never).
- 🔥 **View Limits**: Optional "Burn after reading" functionality. Set a maximum number of views before the paste is deleted.
- 🎨 **Modern UI**: Clean, responsive dark-mode interface built with TailwindCSS.
- 🔗 **Easy Sharing**: Generate unique, shareable links instantly.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Frontend**: [React 19](https://react.dev/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Database**: [Redis](https://redis.io/) (via [Upstash](https://upstash.com/) or self-hosted)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Redis instance (You can use [Upstash](https://upstash.com/) for a free, managed Redis database).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Khushi-83/PasteBin
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add your Redis connection URL:

   ```bash
   REDIS_URL="rediss://default:<password>@<host>:<port>" 
   ```

   > **Note:** Ensure your Redis URL is correct. If you are using Upstash, you can copy the TCP connection string directly from their dashboard.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Enter your text or code in the main text area.
2. Select an expiration time (e.g., 1 Hour, 1 Day).
3. (Optional) Enter a view limit (e.g., 1 for burn-after-reading).
4. Click **Create Paste**.
5. Copy the generated link and share it!

## Deployment

The easiest way to deploy this app is using [Vercel](https://vercel.com).

1. Push your code to a generic Git repository (GitHub, GitLab, Bitbucket).
2. Import the project into Vercel.
3. Add the `REDIS_URL` environment variable in the Vercel project settings.
4. Deploy!

## License

This project is open-source and available under the [MIT License](LICENSE).
