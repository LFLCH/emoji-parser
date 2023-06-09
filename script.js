const grid = document.getElementById('emoji-grid');
let search = document.getElementById('search')
let image_files;
let visible_images;

const max_results = 50;

// If you loaded all the emojis on you machine, you do not need to fetch emojipedia's images
const local_load = false; 

search.setAttribute('placeholder', 'smiling face...')

async function fetchImageFiles() {
  const response = await fetch("emoji-names.json");
  return await response.json();
}

fetchImageFiles().then(data => {
  image_files = data;
  visible_images = image_files.slice(0, max_results);
  showFilteredImages()
})


// datetime of the latest time that showFilteredImages has been called (in order to avoid duplicates)
let latestDisplayCall = 0; 

async function showFilteredImages() {
  const uniqueId = Date.now();
  latestDisplayCall = uniqueId;
  grid.innerHTML = '';
  for (let img of visible_images) {
    let src = local_load ? img['src'] :img['data_src']
    let final_src =src; 
    const imgel = new Image();
    imgel.onload = function() {
      // when the data is loaded and it is not already present
      if(Array(...grid.children).filter(el=>{return el.getAttribute('src')===final_src}).length==0){
        grid.appendChild(imgel)
      }
    };
    imgel.title=img['name'];
    imgel.src = src;    
    if (uniqueId !== latestDisplayCall) {
      return;
    }
  }
}

search.addEventListener('input', async e => {
  str = search.value;
  visible_images = image_files.filter(image => {
    const title = image['name']
    return title.toLowerCase().includes(str.toLowerCase());
  }).slice(0, max_results);
  await showFilteredImages();
})

