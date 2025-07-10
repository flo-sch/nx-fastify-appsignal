# NX Fastify AppSignal

Reproduction project for appsignal instrumentation with fastify

## Environment parameters

To debug locally, setup Appsignal environment parameters:

```ini
APPSIGNAL_APP_NAME="Test App"
APPSIGNAL_PUSH_API_KEY=""
```

You can define those as system environments, or take advantage of dotenv:

Create a local `.env` file either here at the root level, in the fastify app folder: `apps/fastify-app/.env`

## Getting started

You need to have a local version of node.js.

This repository was setup and initially tested using node v22.16.

[pnpm](https://pnpm.io/) is used as a package manager, install it using corepack (or any other way that suits your preferences):

```bash
corepack enable pnpm
corepack prepare pnpm --activate
```

Then use it to install local dependencies:

```bash
pnpm install
```

## Run the application locally

```bash
pnpm start
```

This script is merely a shortcut to the NX command used to build then serve the application locally:

```bash
pnpm nx run fastify-app:serve
```

It should run by default on http://localhost:3000.

## Trigger a test error

The root GET endpoint can trigger a test error if a query string parameter named "error" is set (the value is not relevant):

```bash
curl http://localhost:3000/?error=true
```