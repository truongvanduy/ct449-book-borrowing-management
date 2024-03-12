import axios from 'axios'
import fs from 'fs'
import book from './books/economicBooks.js'

// let book = []
;(async function getBook() {
  const books = book.items

  books.forEach((book) => {
    axios({
      method: 'get',
      url: book.volumeInfo.imageLinks.thumbnail,
      responseType: 'stream'
    })
      .then(function (response) {
        const outputFilename = `frontend/public/images/covers/${book.id}.jpg`
        const writeStream = fs.createWriteStream(outputFilename)
        response.data.pipe(writeStream)
      })
      .catch(function (error) {
        console.log(`Failed to download book ${book.title}: ${error.message}`)
      })
  })
})()
