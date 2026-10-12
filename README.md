# Crusher Materials Co.

Premium construction materials ordering platform for sand, stone, gravel, and aggregate deliveries.

## Local setup

From the project root:

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in the browser.

## Project highlights

- Premium construction-themed landing page
- Materials catalogue and quantity controls
- 1 unit = 4,200 weight units pricing logic
- Booking form with validation and order summary
- Direct call-to-book links
- Order history and status blocks
- Admin overview cards for orders, sales, and stock

## Production build

```bash
npm run build
```

## Deploy to Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js settings.
4. Add any required environment variables before production deploy.
5. Trigger a deployment from the Vercel dashboard.

## Notes

This codebase is a front-end ordering prototype built in the empty workspace. It includes the full storefront experience and local order validation, but a real database/API layer should be connected later for persistent customer and admin data.
