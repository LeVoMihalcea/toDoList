let PROTOCOL = "http://";
let IP = "localhost:";
let PORT = "19999";
let GET_ALL_PATH = "/server/getall";
let SEND_PATH = "/server/add";
let EDIT_PATH = "/server/edit";
let DELETE_PATH = '/server/delete';

addButton = document.getElementById("addButton");
addButton.addEventListener("click", openAdd);

// activityNameField = document.getElementById("activityName");
// dateField = document.getElementById("date");
// locationField = document.getElementById("location");
// deleteField = document.getElementById("deleteIndex");

repopulate();

function openAdd(){
    window.location.replace("add.html");
}

function generateButtons(id){
    let buttons = document.createElement("div");
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-link";
    deleteButton.innerHTML = '<img src=\"icons/trash-var-solid/trash-var-solid.svg\" style=\"max-height: 20px\">';
    deleteButton.style.width = "100px";
    deleteButton.style.height = "50px";
    deleteButton.style.float = "right";
    deleteButton.addEventListener("click",
        () => {
            let request = new XMLHttpRequest();
            let url = PROTOCOL + IP + PORT + DELETE_PATH + "/" + id;
            request.open('DELETE', url, false);
            request.send();
            repopulate();
        }
    );
    buttons.appendChild(deleteButton);

    let editButton = document.createElement("button");
    editButton.className = "btn btn-link";
    editButton.innerHTML = '<img src=\"icons/document-edit-solid/document-edit-solid.svg\" style=\"max-height: 20px\">';
    editButton.style.width = "100px";
    editButton.style.height = "50px";
    editButton.style.float = "right";
    editButton.style.marginRight = "10px";
    editButton.addEventListener("click",
        () => window.location.replace("edit.html?id="+id)
    );

    buttons.appendChild(deleteButton);
    buttons.appendChild(editButton);
    return buttons;
}

function repopulate(){
    let request = new XMLHttpRequest();
    let url = PROTOCOL+IP+PORT+GET_ALL_PATH;
    console.log(url);
    request.open('GET', url, false);
    request.onload = function() {
        // Begin accessing JSON data here
        let data = JSON.parse(this.response);

        let Parent = document.getElementById("tableBody");
        while(Parent.hasChildNodes())
        {
            Parent.removeChild(Parent.firstChild);
        }

        if (request.status >= 200 && request.status < 400) {
            data.forEach(activity => {
                console.log(activity.name);
                let table = document.getElementById("tableBody");
                let row = table.insertRow(-1);
                let activityName = row.insertCell(0);
                let activityDate = row.insertCell(1);
                let activityLocation = row.insertCell(2);
                let buttons = row.insertCell(3);
                activityName.innerHTML = activity.name;
                activityDate.innerHTML = activity.date;
                activityLocation.innerHTML = activity.location;
                buttons.appendChild(generateButtons(activity.id));
            })
        } else {
            console.log('error');
        }
    };

    request.send();
}
