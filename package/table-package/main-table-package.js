// main-table-package.js
import { display_body_table, file_or_link_data, api_config, extra_function_for_body_table } from '/config.js';


let data = null;
let prevvar = 0;
let nextvar = 10;
let paginationstart = 0;
let paginationend = 0;
let pagenow = 1;
const table_body_data = document.getElementById("table_body_data");
const list_pagination = document.getElementById("list_pagination");
const prevbutton = document.getElementById("prevbutton-table-pagination");
const nextbutton = document.getElementById("nextbutton-table-pagination");
const tailwindpagination = document.getElementById("tw-pagination");



async function fetchdata() {
    const response = await fetch(file_or_link_data, {
        api_config
    });
    data = await response.json();
    console.log(data);
    showdata(prevvar, nextvar);
    pagination(pagenow);
}

function pagination(page) {
    list_pagination.innerHTML = "";

    let length = Math.floor(data.length / 10);
    if (data.length % 10 != 0) {
        length = length + 1;
    }

    if (paginationstart + 5 - 1 < page || page < 3) {
        paginationstart = Math.max(0, (page - 1) - 3)
    } else if (paginationstart + 1 == page) {
        paginationstart = paginationstart - 1;
    }


    if (paginationstart != 0) {
        list_pagination.innerHTML += `
        <button class="cursor-pointer" id="page-1"><span class ="text-gray-300" >1</span></button>
        <span class ="text-gray-300" >...</span>
        `;
    }

    paginationend = Math.min(length, paginationstart + 5 - 1);

    for (let i = paginationstart !== 0 ? paginationstart + 1 : paginationstart; i < paginationend; i++) {
        if (i + 1 == page) {
            list_pagination.innerHTML += `<span>${i + 1}</span>`;
        } else {
            list_pagination.innerHTML += `<button class="cursor-pointer" id="page-${i + 1}"><span class="text-gray-300">${i + 1}</span></button>`;
        }
    }

    if (paginationend < length) {
        list_pagination.innerHTML += `
        <span class="text-gray-300">...</span>
        <button class="cursor-pointer" id="page-${length}"><span class="text-gray-300">${length}</span></button>
        `;
    }

    // Menambahkan event listeners ke tombol pagination
    for (let i = 1; i <= length; i++) {
        const button = document.getElementById(`page-${i}`);
        if (button) {
            button.addEventListener('click', () => {
                pagenow = i;
                pagination(pagenow);
                showdata(prevvar = (i - 1) * 10, nextvar = i * 10);
            });
        }
    }

}



async function showdata(mindata, maxdata) {
    table_body_data.innerHTML = "";

    let iteration = mindata;
    data.slice(mindata, maxdata).forEach(item => {
        iteration++;
        table_body_data.innerHTML += display_body_table(item, iteration);
    });


    extra_function_for_body_table(mindata, maxdata);

    
}



tailwindpagination.classList.add("w-full", "mt-3", "flex", "gap-4", "items-center", "justify-center");


prevbutton.addEventListener('click', () => {
    if (nextvar != 10) { pagenow = pagenow - 1 }; pagination(pagenow); showdata(prevvar = nextvar == 10 ? 0 : prevvar - 10, nextvar = nextvar == 10 ? 10 : nextvar - 10)
});
nextbutton.addEventListener('click', () => {
    if (data.length > nextvar) { pagenow = pagenow + 1 }; pagination(pagenow); showdata(prevvar = data.length > nextvar ? prevvar + 10 : prevvar, nextvar = data.length > nextvar ? nextvar + 10 : nextvar)
});


fetchdata();