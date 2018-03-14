const { promisify: p } = require('util')
const fs = require('fs')

const readFile = p(fs.readFile)
const writeFile = p(fs.writeFile)

async function main() {
  const moviesJson = await readFile('./moviesList.json')
  const movies = JSON.parse(moviesJson).movies
  const moviesRes = movies.map((m, index) => ({
    ...m,
    id: index + 1
  }))
  const res = { movies: moviesRes }
  await fs.writeFile('./movies.json', JSON.stringify(res, null, 2))
}

main()
  .catch(e => console.error(e))