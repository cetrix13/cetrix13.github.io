const { promisify: p } = require('util')
const fs = require('fs')

const readFile = p(fs.readFile)
const writeFile = p(fs.writeFile)

async function main() {
  const moviesJson = await readFile('./moviesListOrigin.json')
  const movies = JSON.parse(moviesJson).movies
  const moviesRes = movies.map(({title, originalTitle, ...m}, index) => ({
    ...m,
    id: index + 1,
    title: originalTitle || title
  }))
  const res = { movies: moviesRes }
  await fs.writeFile('./movies.json', JSON.stringify(res, null, 2), (err) => err && console.error(err))
}

main()
  .catch(e => console.error(e))