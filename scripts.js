addButton = document.getElementById("addButton")
addButton.addEventListener("click", addToList);

deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", deleteFromList);

activityNameField = document.getElementById("activityName");
dateField = document.getElementById("date");
locationField = document.getElementById("location");
deleteField = document.getElementById("deleteIndex");


let currentIndex = 1;

function addToList() {
    if(activityNameField.length <= 0){
        alert("The activity name can't be empty!");
    }
    if(locationField.length <= 0){
        alert("The location name can't be empty!");
    }

    let table = document.getElementById("tableBody");
    let row = table.insertRow(-1);
    let indexCell = row.insertCell(0);
    let activityName = row.insertCell(1);
    let activityDate = row.insertCell(2);
    let activityLocation = row.insertCell(3);

    indexCell.innerHTML = String(currentIndex);
    currentIndex++;
    activityName.innerHTML = activityNameField.value;
    activityDate.innerHTML = dateField.value;
    activityLocation.innerHTML = locationField.value;
}

function deleteFromList(){
    if(deleteField.length <= 0)
        alert("Please provide an index to delete!");

    let table = document.getElementById("tableBody");
    let rows = $(table).find('> tr');
    let toDelete = Number(deleteField.value);
    for(let i = 0; i<rows.length; i++){
        console.log(rows[i].cells[0].innerHTML + " - " + toDelete);
        if(Number(rows[i].cells[0].innerHTML) === toDelete){
            console.log("deleting" + toDelete);
            table.deleteRow(i);
        }
    }
}