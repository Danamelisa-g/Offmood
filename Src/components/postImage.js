import Post from './post.js';

export class PostImage extends Post {
  /**
   * Extiende Post agregando soporte para imagen.
   * @param {Object} data - Igual que Post, pero con data.image (URL de la imagen)
   */
  constructor(data) {
    super(data);
    this.image = data.image;
  }

  // Solo sobreescribe el body para incluir la imagen
  renderBody() {
    return `
      <p class="post__content">${this.content}</p>
      <img src="${this.image}" alt="Post image" class="post__image">
    `;
  }
}

export default PostImage;