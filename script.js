// giphy API key
const apiKey = 'BLYcLJA9Uc2SlY1iloQhooj9P85PTqzs'

// attributes
const container = document.getElementById('container')
const resultsEl = document.getElementById('results')
const searchForm = document.getElementById('searchForm')
const searchInput = document.getElementById('searchInput')
const searchSize = document.getElementById('searchSize')
const gifItem = document.getElementById('gif_item')
const show_gif_box = document.getElementById('show_gif')
const show_gif_image = document.getElementById('show_image')
const next_button = document.getElementById('button_next')
const back_button = document.getElementById('button_back')

var queryTerm = ""
var imageSize = "large"
var page = 0
var pageIndex = 10
var gifLimit = 10

// next page button clicked
next_button.addEventListener('click', function(e) {
  e.preventDefault()
  page += pageIndex
  search(queryTerm)
})

// back page button clicked
back_button.addEventListener('click', function(e) {
  e.preventDefault()
  if (page <= pageIndex) {
      page = 0
  }
  else {
    page -= pageIndex
  }
  search(queryTerm)
})

// search input changed
searchForm.addEventListener('change', function(e) {
  e.preventDefault()
  getSearch()
});

// search button clicked
searchForm.addEventListener('submit', function(e) {
  e.preventDefault()
  getSearch()
})

// image size changed
searchSize.addEventListener('change', function(e) {
  // e.preventDefault()
  imageSize = searchSize.value
  changeToSize(imageSize)

});

// prepare search
function getSearch() {
  queryTerm = searchInput.value
  imageSize = searchSize.value
  if(queryTerm != "") {
      search(queryTerm, imageSize, pageIndex)
  }
  else {

      search(queryTerm, imageSize, pageIndex)
  }
}

// Begining search function
function search(q) {
  var path = ''
  if (q.toLowerCase() == "trending") {
    path = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${gifLimit}&offset=${page}`
  }
  else {
    path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifLimit}&offset=${page}`
  }
  fetch(path).then(function(res) {
    return res.json()
  }).then(function(json) {
    let resultsHTML = ""

    json.data.forEach(function(obj) {
      resultsHTML += createGif(obj)
    })
    resultsEl.innerHTML = resultsHTML

  }).catch(function(err) {
    console.log(err.message)
  })
}

// create a gif html here
function createGif(obj) {
  let resultsHTML = ""
  var url = null
  var width = null
  var height = null
  const title = obj.title
  const largeImg = obj.images.downsized_large.url

  // console.log(obj.images)

  if (imageSize == "small") {
    url = obj.images.fixed_height_small.url
    width = obj.images.fixed_height_small.width
    height = obj.images.fixed_height_small.height
  }
  else if(imageSize == "medium") {
    url = obj.images.fixed_width.url
    width = obj.images.fixed_width.width
    height = obj.images.fixed_width.height
  }
  else {
    url = obj.images.downsized.url
    width = obj.images.downsized.width
    height = obj.images.downsized.height
  }

  resultsHTML += `<a class="gif_anchor w3-animate-zoom" href="#" id="${largeImg}" onclick="showGif(this.id)">
                    <img
                    class="item w3-animate-zoom"
                    src="${url}"
                    width="100%"
                    height="auto"
                    alt="${title}">
                    ${title}
                  </a>`

  changeToSize(imageSize)
  return resultsHTML
}

// adjust image size to small, medium or large
function changeToSize(size) {
  if (size == 'small') {
    container.classList.remove('medium')
    container.classList.remove('large')
    resultsEl.classList.remove('column-small')
    resultsEl.classList.remove('column-large')

    container.classList.add('small')
    resultsEl.classList.add('column-small')
  }
  else if (size == 'medium') {
    container.classList.remove('large')
    container.classList.remove('small')
    resultsEl.classList.remove('column-small')
    resultsEl.classList.remove('column-large')

    container.classList.add('medium')
    resultsEl.classList.add('column-medium')
  }
  else {
    container.classList.remove('medium')
    container.classList.remove('small')
    resultsEl.classList.remove('column-small')
    resultsEl.classList.remove('column-medium')

    container.classList.add('large')
    resultsEl.classList.add('column-large')
  }
}

// gif item onclick
function showGif(id) {
  const caption = document.getElementById('caption')
  caption.innerHTML = document.getElementById(id).text
  show_gif_image.src = id
  show_gif_box.classList.remove("display_off");
  show_gif_box.classList.add("display_on");
  container.classList.add("fade");
}

// x close icon
function closeGif() {
  show_gif_image.src = ""
  container.classList.remove("fade");
  show_gif_box.classList.remove("display_on");
  show_gif_box.classList.add("display_off");
}

// End search function
search("trending")
