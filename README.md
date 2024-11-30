# dotcom

`npm install`

# setup env

`cp .env.example .env`

# setup db string

DB is postgres

`DATABASE_URL="postgresql://<username>:<password>@localhost:5432/dotcom?schema=public"`

# run migrations

`npx prisma migrate dev`

```bash
npm run dev
```

runs the dev server and opens the browser to the app.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
