export class Post {
    constructor(avatar, nombreUsuario, content, emocion, likes, comments) {
        this.avatar = avatar;
        this.nombreUsuario = nombreUsuario;
        this.content = content;
        this.emocion = emocion;        
        this.likes = likes;
        this.comments = comments;
    }
    render() {
        const html = `
        <style>
            .username {
                font-weight: bold;
                font-size: 18px;
            }
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
            }
            .emotion {
                width: 30px;
                height: 30px;
                margin-left: 10px;
                }
                .content {
                    font-weight: bold;
                    font-size: 16px;
                    }
                </style>
        <div>
        <div>
            <h3 class="username">${this.nombreUsuario}</h3>
            <img src="${this.avatar}" alt="Avatar" class="avatar">
            <img src="${this.emocion}" alt="Emotion" class="emotion">
        </div>
        <p class="content">${this.content}</p>
        <p class="likes">❤️${this.likes}</p>
        <p class="comments">💬${this.comments}</p>
    </div>` 
        
    const postContainer = document.getElementById('postContainer');
        postContainer.innerHTML += html;
    }
} 



export default Post;