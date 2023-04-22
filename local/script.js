let imgs =Array.from(document.getElementById('emoji-grid').getElementsByTagName('img'));

let visible_images = imgs; //imgs.slice(0, 10); // ten first images

let search = document.getElementById('search')

function showVisible(){
    for(let img of imgs){
        img.className=''
    }
    for(let img of visible_images){
        img.className='visible';
    }
}

search.addEventListener('input',e=>{
    str = search.value;
    visible_images = Array.from(imgs).filter(image => {
        const title = image.getAttribute('title'); 
        return title.toLowerCase().includes(str.toLowerCase());
      });
    showVisible();
})

showVisible();