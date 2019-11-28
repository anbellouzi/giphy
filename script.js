

// giphy API key
const apiKey = 'BLYcLJA9Uc2SlY1iloQhooj9P85PTqzs'

const resultsEl = document.getElementById('results')
const searchForm = document.getElementById('searchForm')
const searchInput = document.getElementById('searchInput')

// search button clicked
searchForm.addEventListener('submit', function(e) {
  e.preventDefault()
  const q = searchInput.value
  search(q)
})

// Begining search function
function search(q) {
  const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}`
  fetch(path).then(function(res) {
    return res.json()
  }).then(function(json) {
    let resultsHTML = ""

    json.data.forEach(function(obj) {
      const url = obj.images.fixed_width.url
      const width = obj.images.fixed_width.width
      const height = obj.images.fixed_width.height
      const title = obj.title
      resultsHTML += `<img class="item" src="${url}" "width=${width}" height="${height}" alt="${title}">`
    })

    resultsEl.innerHTML = resultsHTML

  }).catch(function(err) {
    console.log(err.message)
  })
}
// End search function
search("cars")
