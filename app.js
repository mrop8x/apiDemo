var postAPI = 'http://localhost:3000/posts';
function start(){
    getPosts(function(posts){
        //console.log(posts);
        renderPosts(posts);
    });
    hanlderCreatePosts();
}
start();

// Functions
function getPosts(callback){
    fetch(postAPI)
    .then(function(responve){
        return responve.json();
    }).then(callback);
}
function createPosts(data){
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) 
    }
    fetch(postAPI, options)
    .then(function(responve){
        return responve.json();
    })
    .then(function(){

    });
}
function deletePost(id){
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    fetch(postAPI + '/' + id, options)
    .then(function(responve){
        return responve.json();
    })
    .then(function(){

    });
}
function renderPosts(posts){
    var contentBlock = document.getElementById('contentBlock');
    var html = posts.map(function(post){
        return `<h2>${post.title}</h2>
        Views: ${post.views}
        <button onclick="deletePost('${post.id}')">Xóa</button>
        `
    });
    contentBlock.innerHTML = html.join('');
}

function hanlderCreatePosts(){
    var createBtn = document.querySelector('#createBtn');
    createBtn.onclick = function(){
        var title = document.querySelector('input[name="title"]').value;
        var views = document.querySelector('input[name="views"]').value;
        var dataForm = {
            title: title,
            views: views
        }
        createPosts(dataForm);
    }
}