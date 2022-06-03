<img width="716" alt="nextjs on demand example" src="https://user-images.githubusercontent.com/10114716/155897601-50346747-8bb6-462f-aa5e-665cc1dd8672.png">

Next.js 12.1 has an on-demand ISR feature; with this feature, you can refresh your cache anytime. In this example, We have one hour revalidate duration, and if you update anything from your CMS or database, it can not reflect before one hour. You have to wait for the revalidate period. Next.js released a great feature that calls On-Demand ISR to override this issue.

When you click revalidate button, It calls revalidate endpoint and triggers the` unstable_revalidate` function with a route parameter if the secret key is valid.

## Getting Started

Create a ".env" file and fill it with your variables from the ".env.example".

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000/api/revalidate?secret=<env_secret_key>](http://localhost:3000) or [http://localhost:3000/api/revalidate/articles/article-1?secret=<env_secret_key>](http://localhost:3000) with your browser to see the result.
