
const baseURL = "https://sharek-media.onrender.com";//for production
//const baseURL = "http://localhost:3001";//for development (localy)

import handleAddPost from './HandleAddPost.js';
import handleDisplayPosts from './HandleDisplayPosts.js';

main();
async function main() {
    await handleDisplayPosts(baseURL);
    handleDeletePost(baseURL);
    handleAddPost(baseURL);
}

function handleDeletePost(baseURL) {
    console.log("Deleting posts");
    const btnsDelete = document.querySelectorAll(".btn-delete");
    console.log(btnsDelete);
    btnsDelete.forEach(btn => {
        btn.addEventListener("click", deletePost);
    });

    function deletePost() {
        console.log("Delete post");
        const postDiv = this.closest(".card");
        //const id = postDiv.getAttribute("data-id");
        const id = postDiv.dataset.id;
        fetch(baseURL + "/api/posts/" + id, {
            method: "delete",
        })
            .then((reponse) => {
                console.log("Response: ");
                console.log(reponse);
                if (reponse.ok) {
                    alert("Product successfully Deleted!");
                    location.reload();
                } else {
                    alert("Error Deleting post!");
                }
            })
            .catch(err => console.log(err));
    }
}
