import Prisma from '@prisma/client'
import Better from 'better-sqlite3'

const prisma = new Prisma.PrismaClient()
const better = new Better('test.db')



await prisma.test.deleteMany()
await new Promise(resolve => setTimeout(resolve, 500))

console.log('inserting 10,000 rows')

console.time('  prisma')

await prisma.$transaction(async prisma => {
	for(let i=0; i<10000; i++){
		await prisma.test.create({
			data: {
				value: Math.round(Math.random() * 1000)
			}
		})
	}
})

console.timeEnd('  prisma')



await prisma.test.deleteMany()
await new Promise(resolve => setTimeout(resolve, 500))

console.time('  better-sqlite3')
better.exec(`BEGIN`)

for(let i=0; i<10000; i++){
	better.exec(`INSERT INTO Test ("value") VALUES (${Math.round(Math.random() * 1000)})`)
}

better.exec(`COMMIT`)
console.timeEnd('  better-sqlite3')