
export default function handleAddPost(baseURL) {
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

        fetch(baseURL + "/api/posts", {
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
                    location.reload();
                } else {
                    alert("Error Adding post!");
                }
            })
            .catch(err => console.log(err));
    }
}


