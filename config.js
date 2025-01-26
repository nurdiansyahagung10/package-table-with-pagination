// ubah tampilan isi table di sini
const display_body_table = (item, iteration) => {
    return `
     <tr>
        <td class=" border-b border-gray-200 text-center">${iteration}</td>
        <td class="border-b border-gray-200" id="task-${iteration}" >
            ${item.Task}
        </td >
            <td class="border-b border-gray-200" id="status-${iteration}">
                ${item.Status}
        </td >
            <td class="border-b border-gray-200" >
                ${item.Last_Update}
        </td >
            <td class="border-b border-gray-200" >
                ${item.Date_Added}
        </td >
            <td class="border-b items-center py-3 text-center p-1 border-gray-200">
        <input type="checkbox" name="" id="checkbox-${iteration}">
        </td>
        </tr>
    `;
}

// if you want add some function for your data in the body table you can add here
const extra_function_for_body_table = (mindata, maxdata) => {
    let finish = JSON.parse(sessionStorage.getItem("arrayfinish")) != null ? JSON.parse(sessionStorage.getItem("arrayfinish")) : [];
    console.log(finish);

    for (let i = mindata; i <= maxdata; i++) {
        const checkbox = document.getElementById(`checkbox-${i}`);
        const task = document.getElementById(`task-${i}`);
        const status = document.getElementById(`status-${i}`);

        if (checkbox) {
            finish.forEach(finishlist => {
                if (i == finishlist) {
                    checkbox.checked = true;
                    task.classList.add("line-through");
                    status.innerHTML = "Complete";

                }
            });



            checkbox.addEventListener('change', (event) => {
                if (event.target.checked) {
                    finish.push(i);
                    sessionStorage.setItem("arrayfinish", JSON.stringify(finish));
                    task.classList.add("line-through");
                    status.innerHTML = "Complete";
                } else {
                    finish = finish.filter(item => item !== i);
                    sessionStorage.setItem("arrayfinish", JSON.stringify(finish));
                    task.classList.remove("line-through");
                    status.innerHTML = "In Progress";
                }

            });

        }
    }

}




const file_or_link_data = "../../dump.json";

// setting this if you use api for getting data
// const apikey = ``;

const api_config = {
    method: "get",
    headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer " + apikey
    }
}

export { display_body_table, file_or_link_data, api_config, extra_function_for_body_table };
