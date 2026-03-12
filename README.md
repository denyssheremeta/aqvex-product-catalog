# Product Catalog

A frontend app for browsing the product catalog and viewing individual product pages.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Axios
- ESLint

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Create a local `.env` file from the example:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
npm run dev
```

After startup, the app will be available at the address shown by Vite in the console, usually `http://localhost:5173`.

## Additional commands

```bash
npm run build
npm run preview
npm run lint
```

## Environment

- `VITE_API_URL` - base API URL
