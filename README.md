# LinkShortener

A link shortener built with [Next.js](https://nextjs.org/), leveraging [MongoDB](https://www.mongodb.com/) and [Redis](https://redis.io/) for efficient link management and rapid redirection. The application includes rate limiting and Google reCAPTCHA for enhanced security.

## Features

- **Shorten URLs**: Easily create compact, shareable links.
- **Fast Redirects**: Uses Redis for quick redirection, minimizing latency.
- **Persistent Storage**: Stores links and metadata in MongoDB.
- **Rate Limiting**: Prevents abuse with per-user rate limits.
- **Security**: Google reCAPTCHA integration to protect against bots and spam.

## Tech Stack

- **Frontend & API**: Next.js
- **Database**: MongoDB
- **Caching & Speed**: Redis (via Upstash)
- **Security**: Google reCAPTCHA

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A running MongoDB instance
- A running Upstash Redis instance
- Google reCAPTCHA site and secret keys

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/peterpacka/linkshortener.git
   cd linkshortener
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   `.env.example`

   ```
   NEXT_PUBLIC_BASE_URL=your_app_base_url
   MONGODB_URI=your_mongodb_connection_string
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
   ```

   **! Don't forget to change the client Google reCAPTCHA key in the code !**

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage

- Create and manage short links via the web interface.
- The app will enforce rate limits and require reCAPTCHA verification for link creation.

## Deployment

You can deploy this application to platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Ensure your environment variables are set in the deployment dashboard.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and fixes.

## License

This project is licensed under the GNU General Public License v3.0 (GPLv3).
See the [LICENSE](./LICENSE) file for details.


--iampitr
