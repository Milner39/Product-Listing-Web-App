## Developing

Configure a `/.env` file using the `/.env.example` file as a guide

Install dependencies with `npm install`

Create a database:

```bash
npm run db:generate
npm run db:migrate
```

Start a development server:

```bash
npm run app:dev
```


## Testing

Run test scripts:

```bash
npm run app:test
```


## Building

Create a production build:

```bash
npm run app:build
```

You can preview the production build with `npm run app:preview`