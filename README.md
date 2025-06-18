## Prisma - Create the migration file

```bash
npx prisma migrate dev --name init
```

## Prisma - aplikowanie migracji na bazie danych

Tej komendy używam, gdy mam już pliki z migracjami
ale jeszcze nie mam postawionej bazy danych (np. wyczyściłem bazę danych
albo pobrałem repo i na świeżo odpalam aplikację).

```bash
npx prisma migrate deploy
```

## Prisma - generate Prisma client

```bash
npx prisma generate
```
