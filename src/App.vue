<script setup lang="ts">
import type { ImageInfo } from 'src/ImageInfo';

import { ref, onMounted } from 'vue';
const visible_images = ref<ImageInfo[]>([]);
const image_files = ref<ImageInfo[]>([]);
const max_results = 50;
let searchvalue = ref<string>("");


// If you loaded all the emojis on you machine,
// you do not need to fetch emojipedia's images
const local_load = false;

async function fetchImageFiles(): Promise<ImageInfo[]> {
    const response = await fetch("emoji-names.json");
    return await response.json();
}

onMounted(async () => {
    fetchImageFiles().then(data => {
        image_files.value = data;
        let toshow = image_files.value.slice(0, max_results);
        showFilteredImages(toshow);
    })
});

async function search() {
    visible_images.value=[];
    let toshow = image_files.value.filter(image => {
        const title = image['name']
        return title.toLowerCase().includes(searchvalue.value.toLowerCase());
    }).slice(0, max_results);
    showFilteredImages(toshow)
}

// the following function is only heure to have the same "fluent" effect as in the vanilla solution.
// we could skip it, and just have visible_images.value = toshow; (this fetch is not neccessary).
async function showFilteredImages(toshow : ImageInfo[]){
    for(let img of toshow){
        let src = local_load ? img.src : img.data_src;
        const imgel = new Image();
        imgel.onload = function () {
            // when the data is loaded and it is not already present
            if(!visible_images.value.includes(img)) visible_images.value.push(img);
        };
        imgel.title=img['name'];
        imgel.src = src;
    }
}


</script>
<template>
    <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="searchvalue" placeholder="Smiling face" class="p-inputtext-lg" @update:model-value="search" />
    </span>
    <div id="emoji-grid">
        <a v-for="imginfo in visible_images" v-bind:key="imginfo.name" v-bind:href="imginfo.data_src" target="_blank">
            <img v-bind:src="local_load ? imginfo.src : imginfo.data_src" v-bind:title="imginfo.name">
        </a>
    </div>
</template>
