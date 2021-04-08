let http = require("http");
let url = require("url");
let fs = require("fs");
let port = 8080;

let addTask = `
    <h1>Add Task</h1>
    <form action="" method="get">
        <label>Employee ID</label>
        <input type="text" name="empID"/><br/>
        <label>Task ID</label>
        <input type="text" name="taskID"/><br/>
        <label>Task Description</label>
        <input type="text" name="desc"/><br/>
        <label>Deadline</label>
        <input type="date" name="deadline"/><br/>
        <input type="submit" value="Add Task">
        <input type="reset" value = "Reset">
    </form>
    <br/>
    <a href="/delete">Delete Task</a>
    <br/>
    <a href="/display">Display All Tasks</a>
    <br/>
`;

let deleteTask = `
    <h1>Delete Task</h1>
    <form action="delete" method="get">
        <label>Task ID</label>
        <input type="text" name="taskID"/><br/>
        <input type="submit" value="Delete">
        <input type="reset" value = "Reset">
    </form>
    <br/>
    <a href="/">Add Task</a>
    <br/>
    <a href="/display">Display All Tasks</a>
    <br/>
`;

let tableTop = `
    <h1>Display All Task</h1>
    <table>
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>Task ID</th>
                <th>Task Description</th>
                <th>Deadline</th>
            </tr>
        </thead>
        <tbody>
`
let tableBottom = `
        </tbody>
    </table>
    <br/>
    <a href="/">Add Task</a>
    <br/>
    <a href="/delete">Delete Task</a>
    <br/>
`;

let server = http.createServer((req, res) => {
    res.setHeader("content-type", "text/html");

    // read tasks.json
    // if JSON file is not empty, store old tasks in array
    let taskString = fs.readFileSync("tasks.json").toString();
    let allTasks = new Array();
    if (taskString != "") {
        allTasks = JSON.parse(taskString);
    }

    if (req.url != "/favicon.ico") {            // ignore favicon.ico
        if (req.url == "/") {                   // Add Task page
            res.write(addTask);
        } else if (req.url.startsWith("/?")) {  // Add Task page after a task has been added
            res.write(addTask);
            // take data from url
            let urlDetails = req.url;
            let data = url.parse(urlDetails, true).query;
            // check for duplicate or empty Task ID
            let duplicateTask = false;
            for (let i = 0; i < allTasks.length; i++) {
                if (allTasks[i].taskID == data.taskID) {
                    duplicateTask = true;
                }
            }
            if (duplicateTask) {
                res.write("Task ID already exists")
            } else if(data.taskID == "") {
                res.write("Missing Task ID")
            } else {
                // convert data to task
                let task = { "empID": data.empID, "taskID": data.taskID, "desc": data.desc, "deadline": data.deadline };
                // store task in array using push
                allTasks.push(task);
                res.write("Task Added Successfully");
            }
            // convert array to string
            allTasksString = JSON.stringify(allTasks);
            // store array in JSON file
            fs.writeFileSync("tasks.json", allTasksString);
        } else if (req.url == "/delete") {              // Delete Task page
            res.write(deleteTask);
        } else if (req.url.startsWith("/delete?")) {    // Delete Task page after a task has been deleted
            res.write(deleteTask);
            // take data from url
            let urlDetails = req.url;
            let data = url.parse(urlDetails, true).query;
            // find data.taskID in array
            // if data.taskID matches, then delete task from array
            let foundTask = false;
            for (let i = 0; i < allTasks.length; i++) {
                if (allTasks[i].taskID == data.taskID) {
                    allTasks.splice(i, 1);
                    foundTask = true;
                }
            }
            if (!foundTask) {
                res.write("Task ID not found");
            } else {
                res.write("Task Deleted Successfully");
            }
            // convert array to string
            allTasksString = JSON.stringify(allTasks);
            // store array in JSON file
            fs.writeFileSync("tasks.json", allTasksString);
        } else if (req.url == "/display") { // Display All Tasks page
            // display top part of html code
            res.write(tableTop);
            // loop through array, create row for each task, and display row
            for (let i = 0; i < allTasks.length; i++) {
                let row = `
                    <tr>
                        <td>${allTasks[i].empID}</td>
                        <td>${allTasks[i].taskID}</td>
                        <td>${allTasks[i].desc}</td>
                        <td>${allTasks[i].deadline}</td>
                    </tr>
                `
                res.write(row);
            }
            // display bottom part of html code
            res.write(tableBottom);
        }
    }
    res.end();
});

server.listen(port, () => console.log(`Server running on port ${port}`));