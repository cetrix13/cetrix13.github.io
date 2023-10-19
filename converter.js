const { promisify: p } = require('util')
const fs = require('fs')

const readFile = p(fs.readFile)
const writeFile = p(fs.writeFile)


function checkImageExist(url, id) {
  return fetch(url, { method: 'HEAD'}).then(res => {
    if (res.ok) {
      return id
    } else {
      return false
    }
  }).catch(err => console.log(err))
}

async function main() {
  const moviesJson = await readFile('./moviesListOrigin.json')
  const movies = JSON.parse(moviesJson).movies
  const moviesRes = movies.map(({title, originalTitle, ...m}, index) => ({
    ...m,
    id: index + 1,
    title: originalTitle || title
  }))

  const promises = moviesRes.map((m) => checkImageExist(m.posterurl, m.id));
  const ids = (await Promise.all(promises)).filter((p) => p)

  const moviesWithValidImages = moviesRes.filter((m) => ids.includes(m.id));

  const res = { movies: moviesWithValidImages }
  await fs.writeFile('./movies.json', JSON.stringify(res, null, 2), (err) => err && console.error(err))  
}

main()
  .catch(e => console.error(e))