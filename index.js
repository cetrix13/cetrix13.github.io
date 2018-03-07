const faker = require('faker')

const randomeInt = (a, b) => {
  const [min, max] = b ? [a, b] : [0, a]
  return min + Math.round((max - min) * Math.random())
}

const randomeArray = (a, b) => Array.from({ length: randomeInt(a, b) })
const takeRandome = (array, a, b) => {
  const arrayCopy = array.slice()
  let number = randomeInt(a, b)
  const res = []
  while (number-- > 0) {
    const index = randomeInt(arrayCopy.length - 1)
    res.push(arrayCopy[index])
    arrayCopy.splice(index, 1)
  }
  return res
}

module.exports = () => {
  const genres = ['comedy', 'action', 'sci-fi', 'criminal', 'drama', 'horror', 'detective']
  const movies = randomeArray(50, 150)
    .map(() => ({
      year: randomeInt(1980, new Date().getFullYear()),
      name: faker.random.words(),
      director: `${faker.name.firstName()} ${faker.name.lastName()}`,
      genres: takeRandome(genres, 1, 3),
      rate: Math.round(Math.random() * 100) / 10
    }))

  return { movies }
}