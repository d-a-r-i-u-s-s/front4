const template = function(id, title, body){
    let el = document.createElement("template")
    el.innerHTML = `
    <tr>
      <th scope="row">${id}</th>
      <td>${title}</td>
      <td>${body}</td>
      <td><button value="${id}">Редактировать</button></td>
    </tr>`.trim()

    return el.content.firstChild;
}
window.onload = function(){
    let form = document.getElementById("PostForm");
    let posts;
    form.addEventListener('submit', function(e){
        e.preventDefault()
        let data = {
            title: form.title.value,
            body: form.body.value
        }
        request("POST", 'https://jsonplaceholder.typicode.com/posts', (response)=>{
            if (response.target.readyState === XMLHttpRequest.DONE && response.target.status === 201) {
                // Request finished. Do processing here.
                console.log(response.target.response)
            }
        })

    })
    request('GET', 'https://jsonplaceholder.typicode.com/posts/', function(response) { // Call a function when the state changes.
        if (response.target.readyState === XMLHttpRequest.DONE && response.target.status === 200) {
            // Request finished. Do processing here.
            posts = response.target;
            JSON.parse(response.target.response).slice(0,5).forEach(post => {
                let temp_post = template(post.id, post.title, post.body)
                let table = document.getElementById("TableContent");
                table.append(temp_post)
            });
        }
        $("button").click(function (e) {
            e.preventDefault();
            var but_id = this.value;
            $("#PutForm").css("display", "flex");
            console.log(posts);
            $("#PutForm input[name='title']").val(posts[but_id - 1].title);
            $("#PutForm input[name='body']").val(posts[but_id - 1].body);
            $("#PutForm").submit(function (e) {
            e.preventDefault();
            let put_data = {
            title: $("#PutForm input[name='title']").val(),
            body: $("#PutForm input[name='body']").val()
            };
    
            $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts/'+ but_id,
            type: 'PUT',
            data: JSON.stringify(put_data),
            success: function(data_2) {
            console.log(data_2);
            }
            });
    
            $("#PutForm").css("display", "none");
        });
        });
    })
}
const request = function(method, url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = callback

    xhr.send(`&post=21`);
}