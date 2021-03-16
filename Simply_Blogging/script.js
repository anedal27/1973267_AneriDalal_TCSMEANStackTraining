var blogObjs = [];
var singleBlog = {};

function addBlog() {
    var data = readFormData();
    blogObjs.unshift(data);
    // console.log(blogObjs);
    storeInSession();
    // var blogs = JSON.parse(retrieveFromSession());
    // console.log(blogs);
    addToPage();
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
    // console.log(obj)
    return obj;
}

function storeInSession() {
    sessionStorage.setItem("blogInfo", JSON.stringify(blogObjs));
}

function retrieveFromSession() {
    var obj = sessionStorage.getItem("blogInfo");
    // console.log(obj);
    return obj;
}

function addToPage() {
    var blogs = [];
    if(JSON.parse(retrieveFromSession()) != null) {
        blogs = JSON.parse(retrieveFromSession());
    }
    for (var i = 0; i < blogs.length; i++) {
        // stores current blog in var blog
        var blog = blogs[i];
        console.log(blog);

        // select div tag where all blogs will be located
        var allBlogs = document.getElementById("allBlogs");

        // create a new column which will contain a single blog
        var newCol = document.createElement('div');
        newCol.className = 'col';

        // create a div tag where the title will go
        var titleDiv = document.createElement('div');
        titleDiv.id = "blogTitle";
        titleDiv.innerHTML = blog.title;
        newCol.appendChild(titleDiv);

        // // create a div tag where the article will go
        // var artDiv = document.createElement('div');
        // artDiv.id = "blogArt";
        // artDiv.innerHTML = blog.art;
        // newCol.appendChild(artDiv);

        // // create an img tag where the image will go
        // if (blog.image != "none") {
        //     var imgTag = document.createElement('img');
        //     imgTag.id = "blogImage";
        //     imgTag.src = blog.image;
        //     newCol.appendChild(imgTag);
        // }
        allBlogs.appendChild(newCol);
    }
}