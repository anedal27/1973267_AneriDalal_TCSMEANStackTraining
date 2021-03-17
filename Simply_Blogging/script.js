function addBlogPost() {
    var post = readFormData();
    if (post.title == "" || post.content == "") {
        return;
    }
    if (!sessionStorage["counter"]) {
        sessionStorage.setItem("counter", 1);
    }
    storeInSession(post);
    var i = eval(sessionStorage.getItem("counter")) - 1;
    addSingleBlogPost(post, i);
    resetData();
}

function readFormData() {
    var obj = {};
    obj.title = document.getElementById("title").value;
    obj.content = document.getElementById("content").value;
    if (typeof (document.getElementById("image").files[0]) != 'undefined') {
        obj.image = document.getElementById("image").files[0].name;
    } else {
        obj.image = "none";
    }
    return obj;
}

function storeInSession(post) {
    var i = sessionStorage.getItem("counter");
    sessionStorage.setItem("post_" + i, JSON.stringify(post));
    i++;
    sessionStorage.setItem("counter", i);
}

function addSingleBlogPost(post, i) {
    // select div tag where all blog posts will be located
    var allBlogPosts = document.getElementById("allBlogPosts");

    // create a new row which will contain a single blog
    var newPost = document.createElement('div');
    newPost.className = 'col-5';
    newPost.id = "post_" + i;

    // create an h2 tag where the title will go
    var titleTag = document.createElement('h2');
    titleTag.className = "postTitle"
    titleTag.innerHTML = post.title;
    newPost.appendChild(titleTag);

    // create a div tag where the content will go
    var contentTag = document.createElement('div');
    contentTag.className = "postContent"
    contentTag.innerHTML = post.content;
    newPost.appendChild(contentTag);

    // if there is an image, set it as the background
    if (post.image != "none") {
        newPost.style.backgroundImage = 'url(' + post.image + ')';
        newPost.style.backgroundRepeat = 'no-repeat';
        newPost.style.backgroundSize = 'cover';
        newPost.style.backgroundPosition = 'center';
    }

    // prepend newPost to allBlogPosts
    allBlogPosts.insertBefore(newPost, allBlogPosts.firstChild);
}

function resetData() {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("image").value = "";
}

function loadAllBlogPosts() {
    for (var i = 1; i < sessionStorage.length; i++) {
        var post = retrieveFromSession(i);
        var postJSON = JSON.parse(post);
        addSingleBlogPost(postJSON, i);
    }
}

function retrieveFromSession(i) {
    var obj = sessionStorage.getItem("post_" + i);
    return obj;
}