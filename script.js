

// giphy API key
const apiKey = 'BLYcLJA9Uc2SlY1iloQhooj9P85PTqzs'

const container = document.getElementById('container')
const resultsEl = document.getElementById('results')
const searchForm = document.getElementById('searchForm')
const searchInput = document.getElementById('searchInput')
const gifItem = document.getElementById('gif_item')
const show_gif_box = document.getElementById('show_gif')
const show_gif_image = document.getElementById('show_image')

// search button clicked
searchForm.addEventListener('submit', function(e) {
  e.preventDefault()
  const q = searchInput.value
  search(q)
});

// gif item clicked
function showGif(id) {
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

// Begining search function
function search(q) {
  const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}`
  fetch(path).then(function(res) {
    return res.json()
  }).then(function(json) {
    let resultsHTML = ""

    json.data.forEach(function(obj) {
      const largeImg = obj.images.downsized_still.url
      console.log(largeImg)
      const url = obj.images.fixed_width.url
      const width = obj.images.fixed_width.width
      const height = obj.images.fixed_width.height
      const title = obj.title
      resultsHTML += `<a href="#" id="${largeImg}" onclick="showGif(this.id)">
                        <img
                        class="item"
                        src="${url}"
                        width="${width}"
                        height="${height}"
                        alt="${title}">
                      </a>`
    })

    resultsEl.innerHTML = resultsHTML

  }).catch(function(err) {
    console.log(err.message)
  })
}


// End search function
search("cars")
