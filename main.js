import { data } from './db.js';

let tags = data.flatMap(item => item.category);
tags = [...new Set(tags)].sort();
let i = tags.indexOf("general");
tags.splice(i, 1);

let selectedTags = [];


window.onload = function () {
    render(["general"]);
    slider();
    createTags();
}

function createTags() {
    const tagslist = document.querySelector(".tags");

    tags.forEach(tag => {
        let tagElement = document.createElement('button');
        tagElement.classList.add('tag');
        tagElement.value = tag;
        tagElement.innerHTML = tag.toLocaleUpperCase();
        tagElement.onclick = () => toggle(tagElement);
        tagslist.appendChild(tagElement);
    })

}


export function like(element) {
    let isActive = element.classList.contains('liked');

    if (isActive) {
        element.classList.remove('liked');
    } else {
        element.classList.add('liked');
    }
}

export function toggle(tag) {
    let isActive = tag.classList.contains('active-tag');

    if (isActive) {
        tag.classList.remove('active-tag');
        selectedTags = selectedTags.filter(e => e !== tag.value);
    } else {
        tag.classList.add('active-tag');
        selectedTags.push(tag.value);
    }

    if (selectedTags.length > 0) {
        render(selectedTags);
    } else {
        render(["general"]);  // Render general category when no tags are selected
    }
}

function render(tags) {
    const list = document.getElementById("list");

    // Clear previous list
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // Filter data to include items that match any of the selected tags
    let filteredData = data.filter(item => {
        return tags.some(tag => item.category.includes(tag));
    });

    // Render filtered data
    filteredData.forEach(item => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img loading="lazy" src="${item.src}" alt="item.src">
            <div class="card-body">
                <button class="like" onclick="like(this)"></button>
                <button class="open" onclick="openDialog(this.value)" value=${item.id} >OPEN</button>
                </div>`;
        list.appendChild(card);
    });
}

export function openDialog(val) {
    let body = document.querySelector('body');
    //create dialog
    const dialog = document.createElement('dialog');

    //create cover to maintain the dialog
    let cover = document.createElement('div');
    cover.classList.add('dialog-cover', 'center');

    //create wrapper to maintain the image and close button
    let wrapper = document.createElement('div');
    wrapper.classList.add('dialog-wrapper', 'center');
    wrapper.innerHTML = `<img id="dialog-img" src="images/img/image${val}.png" alt="">`;
    let close = document.createElement('button');
    close.innerHTML = '&#10006;';
    close.id = 'close';
    close.onclick = () => dialog.close();
    wrapper.appendChild(close);
    cover.appendChild(wrapper);
    dialog.appendChild(cover);
    body.appendChild(dialog);
    dialog.showModal();
}


function slider() {
    const slide = document.querySelector(".slide");

    const images = ["./images/img/image1.png", "./images/img/image2.png", "./images/img/image3.png", "./images/img/image4.png", "./images/img/image5.png"];
    let i = 0;

    function next() {
        slide.style.backgroundImage = `url(${images[i = (i + 1) % images.length]})`;
    }
    // setInterval(next, 5000);
}


window.openDialog = openDialog;
window.like = like;
window.toggle = toggle;