var blogObjs = [];

function addBlog() {
    var data = readFormData();
    blogObjs.unshift(data);
    // console.log(blogObjs);
    storeInSession();
    var blogs = JSON.parse(retrieveFromSession());
    // console.log(blogs);
    addToPage(blogs);
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
    // document.getElementById("blogTitle").innerHTML = title;
    // document.getElementById("blogArt").innerHTML = art;
    // document.getElementById("blogImage").src = image;
}

function storeInSession() {
    sessionStorage.setItem("blogInfo", JSON.stringify(blogObjs));
}

function retrieveFromSession() {
    var obj = sessionStorage.getItem("blogInfo");
    // console.log(obj);
    return obj;
}

function addToPage(blogs) {
    for (var i = 0; i < blogs.length; i++) {
        console.log(blogs[i]);
    }
}