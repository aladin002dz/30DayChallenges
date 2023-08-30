main();
function main() {
    fetch('http://localhost:3001/api/posts')
        .then(res => res.json())
        .then(post => displayPosts(post))
        .catch(err => console.log(err));

    function displayPosts(posts) {
        const postContainer = document.querySelector('#posts');
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'card w-full h-[25rem] bg-base-100 shadow-xl mb-6';
            postDiv.innerHTML = `
            <figure class="h-2/3"><img class="h-full w-full object-cover object-center"
            src="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg"
            alt="Shoes" /></figure>
            <div class="card-body h-1/3">
                <p>${post.content}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Edit</button>
                </div>
            </div>
        `;
            postContainer.appendChild(postDiv);
        })
    }
}
