
export default async function handleDisplayPosts(baseURL) {
    await fetch(baseURL + "/api/posts")
        .then(res => res.json())
        .then(posts => {
            console.log(posts);
            displayPosts(posts, baseURL)
        })
        .catch(err => console.log(err));
}

function displayPosts(posts, baseURL) {
    const postContainer = document.querySelector('#posts');
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'card w-full max-h-[25rem] bg-base-100 shadow-xl mb-6';
        postDiv.setAttribute("data-id", post.id);
        postDiv.innerHTML = `
        ${post.imgUrl ?
                `<figure class="h-[16rem]">
                    <img class="h-full w-full object-cover object-center"
                        src="${baseURL + post.imgUrl}"
                        alt="post picture" />
                 </figure>` :
                ``
            }
        <div class="card-body max-h-[9rem]">
            <p>${post.content}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-outline btn-error btn-delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `;
        postContainer.appendChild(postDiv);
    })
}
