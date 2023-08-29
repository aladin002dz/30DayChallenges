# SharekMedia

A social media network made in Expressjs Web Api

- Database engine used is **SQLite**, the file `data.db`.
- Passwords encryption use the library **bcrypt**.
- Token is generated using the library **jsonwebtoken**.
- Images uploading/downloading use the middleware **multer**.

**First Use**: download or clone the code, and then use the command

```bash
    npm install
```

**Running Server**:

```bash
    node index.js
```

## Get All Posts

`http://localhost:3001/api/posts`

## Signup

**post** http request to `http://localhost:3001/api/auth/signup`

**body**:

```json
{
  "email": "example@email.com",
  "pwd": "password"
}
```

## login

**post** http request to `http://localhost:3001/api/auth/login`

**body**:

```json
{
  "email": "example@email.com",
  "pwd": "password"
}
```

## Add Post

**post** http request to `http://localhost:3001/api/posts`

**FormData**:

```js
const postData = {
  content,
};

const postInfo = new FormData();
postInfo.append("postData", JSON.stringify(postData));
postInfo.append("myfile", selectedImage);
```

## ToDos

- [ ] Get All Posts.
- [ ] Signup.
- [ ] Login.
- [ ] Add Post.
- [ ] Delete Post.
- [ ] Token in Http Requests.
- [ ] Update Post.
