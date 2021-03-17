function addBlog() {
    if (!sessionStorage["counter"]) {
        sessionStorage.setItem("counter", 1);
    }
    var data = readFormData();
    if(data.title == "" || data.art == "") {
        return;
    }
    storeInSession(data);
    var i = eval(sessionStorage.getItem("counter")) - 1;
    // console.log(i);
    addNewBlog(data, i);
    resetData();
}

function readFormData() {
    var obj = {};
    obj.title = document.getElementById("title").value;
    obj.art = document.getElementById("art").value;
    if (typeof (document.getElementById("image").files[0]) != 'undefined') {
        obj.image = document.getElementById("image").files[0].name;
    } else {
        obj.image = "none";
    }
    return obj;
}

function storeInSession(data) {
    var i = sessionStorage.getItem("counter");
    sessionStorage.setItem("blog_" + i, JSON.stringify(data));
    i++;
    sessionStorage.setItem("counter", i);
}

function addNewBlog(blog, i) {
    // select div tag where all blogs will be located
    var allBlogs = document.getElementById("allBlogs");

    // create a new column which will contain a single blog
    var newRow = document.createElement('div');
    newRow.className = 'row';
    newRow.id = "blog_" + i;
    // console.log(newRow.id)

    // create an h2 tag where the title will go
    var titleDiv = document.createElement('h2');
    titleDiv.className = "blogTitle"
    titleDiv.innerHTML = blog.title;
    newRow.appendChild(titleDiv);

    // create a p tag where the article will go
    var artDiv = document.createElement('p');
    artDiv.className = "blogArt"
    artDiv.innerHTML = blog.art;
    newRow.appendChild(artDiv);

    // create an img tag where the image will go
    if (blog.image != "none") {
        // var imgTag = document.createElement('img');
        // imgTag.src = blog.image;
        // imgTag.className = "blogImage"
        // newRow.appendChild(imgTag);
        newRow.style.backgroundImage = 'url('+blog.image+')';
    }

    // append newRow to allBlogs
    // allBlogs.appendChild(newRow);
    allBlogs.insertBefore(newRow, allBlogs.firstChild);
}

function resetData() {
    document.getElementById("title").value = "";
    document.getElementById("art").value = "";
    document.getElementById("image").value = "";
}

function loadAllBlogs() {
    for (var j = 1; j < sessionStorage.length; j++) {
        var data = retrieveFromSession(j);
        var dataJson = JSON.parse(data);
        console.log(dataJson);
        addNewBlog(dataJson, j);
    }
}

function retrieveFromSession(j) {
    var obj = sessionStorage.getItem("blog_" + j);
    return obj;
}