function onFormSubmit() {
    if (!sessionStorage["counter"]) {
        sessionStorage.setItem("counter", 1);
    }
    var data = readFormData();
    var dataString = JSON.stringify(data);
    storeInSession(dataString);
    resetData();
}

function readFormData() {
    var obj = {};
    obj.client = document.getElementById("client").value;
    obj.project = document.getElementById("project").value;
    obj.budget = document.getElementById("budget").value;
    return obj;
}

function storeInSession(data) {
    var i = sessionStorage.getItem("counter");
    sessionStorage.setItem("budget_" + i, data);
    i++;
    sessionStorage.setItem("counter", i);
}

function resetData() {
    document.getElementById("client").value = "";
    document.getElementById("project").value = "";
    document.getElementById("budget").value = "";
}

function updateTable() {
    var sum = 0;
    for (var j = 1; j < sessionStorage.length; j++) {
        var data = retrieveFromSession(j);
        var dataJson = JSON.parse(data);
        insertNewRecord(dataJson);
        sum += eval(dataJson.budget);
    }
    document.getElementById("totalBudget").innerHTML = "Total Budget: $" + sum;
}

function retrieveFromSession(j) {
    var obj = sessionStorage.getItem("budget_" + j);
    return obj;
}

function insertNewRecord(data) {
    var table = document.getElementById("annualBudget");
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(body.length);

    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.client;

    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.project;

    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = "$" + data.budget;
}