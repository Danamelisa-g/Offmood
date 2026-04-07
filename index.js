import { faker } from './node_modules/@faker-js/faker/dist/index.js';
console.log(faker.person.fullName());
import Post from './Src/components/post.js';
import PostImage from './Src/components/postImage.js';

const post1 = new Post(
    faker.image.avatar(),
    faker.person.fullName(),
    "content",
    "./Src/assets/Triste.png",
    10,
    5,
)

const post2 = new PostImage(
    faker.image.avatar(),
    faker.person.fullName(),
    "content",
    faker.image.url(),
    "./Src/assets/Triste.png",
    10,
    5
);


post1.render();
post2.render();