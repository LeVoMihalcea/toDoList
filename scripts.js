let PROTOCOL = "http://";
let IP = "localhost:";
let PORT = "19999";
let GET_ALL_PATH = "/server/getall";
let SEND_PATH = "/server/add";
let EDIT_PATH = "/server/update";
let DELETE_PATH = '/server/delete';
let GET_ONE_PATH = "/server/getone";

addButton = document.getElementById("add");
if(addButton != null)
    addButton.addEventListener("click", addToList);

editButton = document.getElementById("editButton");
if(editButton != null)
    editButton.addEventListener("click", update);

activityNameField = document.getElementById("activityName");
dateField = document.getElementById("date");
locationField = document.getElementById("location");

function autofill(){
    let request = new XMLHttpRequest();

    let url_string = window.location.href;
    let params = new URL(url_string);
    let id = params.searchParams.get("id");
    if(id.length >= 1){
        let url = PROTOCOL+IP+PORT+GET_ONE_PATH+"/"+id;
        request.open('GET', url, false);
        request.onload = function(){
            let data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                activityNameField.value = data.name;
                locationField.value = data.location;
                dateField.value = data.date;
            }
        }
    }
    request.send();
}

autofill();

function addToList() {
    if(activityNameField.length <= 0){
        alert("The activity name can't be empty!");
    }
    if(locationField.length <= 0){
        alert("The location name can't be empty!");
    }
    console.log("a intrat in add");
    let activity = {
        "name": activityNameField.value,
        "location": locationField.value,
        "date": ""+dateField.value
    };

    //TODO: post
    let request = new XMLHttpRequest();
    let url = PROTOCOL+IP+PORT+SEND_PATH;
    request.open("POST", url, false);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(activity));

    //setTimeout(() => window.location.replace("index.html"), 500);
    window.location.replace("index.html");
    console.log("merge");
}

function update(){
    if(activityNameField.length <= 0){
        alert("The activity name can't be empty!");
    }
    if(locationField.length <= 0){
        alert("The location name can't be empty!");
    }
    console.log("a intrat in edit");
    let activity = {
        "name": activityNameField.value,
        "location": locationField.value,
        "date": ""+dateField.value
    };

    //TODO: post
    let request = new XMLHttpRequest();

    let url_string = window.location.href;
    let params = new URL(url_string);
    let id = params.searchParams.get("id");

    let url = PROTOCOL+IP+PORT+EDIT_PATH+"/"+id;
    request.open("PATCH", url, false);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(activity));

    //setTimeout(() => window.location.replace("index.html"), 500);
    window.location.replace("index.html");
    console.log("merge");
}
