## Prisma - Create the migration file

Use this only locally (development environment).
This creates and runs migration, saves state in the `/migrations` folder.

```bash
npm run migrate:dev -- my-migration-name
```

Use this in production. It only aplies what was created in the `/migrations` folder.

```bash
npm run migrate:prod
```

## Prisma - generate Prisma client

```bash
npx prisma generate
```
