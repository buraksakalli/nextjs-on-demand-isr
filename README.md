<img width="716" alt="nextjs on demand example" src="https://user-images.githubusercontent.com/10114716/155897601-50346747-8bb6-462f-aa5e-665cc1dd8672.png">

Next.js 12.1 has on-demand ISR feature, with this feature you can refresh your cache anytime. In this example, We have 1h revalidate duration and if you update anything from your CMS or database, it can not reflect before 1h. You have to wait revalidate duration. For overriding this issue, Next.js released a great feature that calls On-Demand ISR.

When you click revalidate button, It calls revalidate endpoint and triggers `unstable_revalidate` function with a route parameter if secret key is valid.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
