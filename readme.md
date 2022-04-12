# Prisma SQLite vs better-sqlite3

To generate the prisma client and create the SQLite test database, run:
```
npm i
npx prisma migrate dev
```

Then to run the test:
```
node run.js
```

## Average results
````
inserting 10,000 rows
  prisma: 4.808s
  better-sqlite3: 37.436ms
```