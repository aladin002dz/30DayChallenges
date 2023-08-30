main();
function main() {
    handleDisplayPosts();
    handleAddPost();
}

function handleDisplayPosts() {
    fetch('http://localhost:3001/api/posts')
        .then(res => res.json())
        .then(post => displayPosts(post))
        .catch(err => console.log(err));
}

function displayPosts(posts) {
    const postContainer = document.querySelector('#posts');
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'card w-full max-h-[25rem] bg-base-100 shadow-xl mb-6';
        postDiv.innerHTML = `
        ${post.imagUrl ?
                `<figure class="h-[16rem]"><img class="h-full w-full object-cover object-center"
                    src="${post.imagUrl}"
                    alt="Shoes" /></figure>` :
                ``
            }
        <div class="card-body max-h-[9rem]">
            <p>${post.content}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-outline btn-info btn-disabled"  disabled="disabled">Edit</button>
            </div>
        </div>
    `;
        postContainer.appendChild(postDiv);
    })
}

function handleAddPost() {
    document.querySelector("#add-post").addEventListener("submit", addPost);

    function addPost(e) {
        console.log("Add post");
        e.preventDefault();
        const txtContent = document.getElementById("inputTxtContent").value;
        const selectedImage = document.getElementById("inputImage").files[0];
        const postData = {
            content: txtContent,
        };

        const postInfo = new FormData();
        postInfo.append("postData", JSON.stringify(postData));
        postInfo.append("myfile", selectedImage);

        fetch("http://localhost:3001/api/posts", {
            method: "post",
            /*     headers: {
              Authorization: `Bearer ${user.token}`,
            }, */
            body: postInfo,
        })
            .then((reponse) => {
                console.log("Response: ");
                console.log(reponse);
                if (reponse.ok) {
                    alert("Product successfully Added!");
                    //location.reload();
                } else {
                    alert("Error Adding product!");
                }
            })
            .catch(err => console.log(err));
    }
}


