// Mapeo de emociones: nombre → { clase CSS, icono emoji, label }
const EMOTION_MAP = {
  Sad:       { clase: 'sad',       icon: './Src/assets/emotions/Triste.png', label: 'Sad'       },
  Anxious:   { clase: 'anxious',   icon: './Src/assets/emotions/Ansioso.png', label: 'Anxious'   },
  Happy:     { clase: 'happy',     icon: './Src/assets/emotions/Feliz.png', label: 'Happy'     },
  Angry:     { clase: 'angry',     icon: './Src/assets/emotions/Enojado.png', label: 'Angry'     },
  Disgusted: { clase: 'disgusted', icon: './Src/assets/emotions/Disgustado.png', label: 'Disgusted' },
};

export class Post {
  constructor(data) {
    this.id       = data.id;
    this.avatar   = data.user.avatar;
    this.username = data.user.name;
    this.time     = data.time;
    this.feeling  = data.feeling;
    this.content  = data.content;
    this.shares   = data.shares;
    
///

    const savedLikes = localStorage.getItem(`post_likes_${this.id}`);
    const savedBaseLikes = localStorage.getItem(`post_base_likes_${this.id}`);

    // 🔁 si el JSON cambió
    if (savedBaseLikes === null || parseInt(savedBaseLikes) !== data.likes) {
      this.likes = data.likes;

      // 👇 RESET TOTAL
      this.liked = false;

      localStorage.setItem(`post_base_likes_${this.id}`, data.likes);
      localStorage.setItem(`post_likes_${this.id}`, this.likes);
      localStorage.setItem(`post_liked_${this.id}`, this.liked);
    } else {
      this.likes = parseInt(savedLikes);
      this.liked = localStorage.getItem(`post_liked_${this.id}`) === 'true';
    }

    // Comentarios: combinar los del JSON con los guardados en localStorage
    const savedComments = JSON.parse(localStorage.getItem(`post_comments_${this.id}`) || '[]');
    this.comments = [...(data.comments || []), ...savedComments];
  }

  // ── Partes reutilizables ──────────────────────────

  renderHeader() {
  const emotion = EMOTION_MAP[this.feeling] || { clase: '', icon: '', label: this.feeling };

  return `
    <div class="post__header">
      <div class="post__user">
        <img src="${this.avatar}" alt="${this.username}" class="post__avatar">
        <div class="post__info">
          <p class="post__username">${this.username}</p>
          <span class="post__time">${this.time}</span>
        </div>
      </div>
      <span class="post__emotion-tag ${emotion.clase}">
        <img src="${emotion.icon}" alt="${emotion.label}" class="post__emotion-icon">
        ${emotion.label}
      </span>
    </div>
    `;
    }

  renderBody() {
    return `<p class="post__content">${this.content}</p>`;
  }

  renderActions() {
    const likedClass = this.liked ? 'post__action-btn--liked' : '';
    return `
      <div class="post__actions">
        <button class="post__action-btn post__action-btn--like ${likedClass}" data-id="${this.id}">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span class="post__like-count">${this.likes}</span>
        </button>
        <button class="post__action-btn" data-id="${this.id}">
          <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span class="post__comment-count">${this.comments.length}</span>
        </button>
      </div>
    `;
  }

  renderComments() {
    const commentItems = this.comments.map(c => `
      <div class="post__comment">
        <span class="post__comment-author">${c.user}</span>
        <span class="post__comment-text">${c.text}</span>
      </div>
    `).join('');

    return `
      <div class="post__comments">
        ${commentItems}
        <div class="post__comment-input-wrap">
          <img src="${this.avatar}" alt="me" class="post__comment-avatar">
          <input class="post__comment-input" type="text" placeholder="Write your comment...">
        </div>
      </div>
    `;
  }

  // ── Eventos ───────────────────────────────────────

  bindEvents(article) {
    // — Like —
    const likeBtn = article.querySelector('.post__action-btn--like');
    likeBtn.addEventListener('click', () => {
      this.liked = !this.liked;
      this.likes += this.liked ? 1 : -1;

      localStorage.setItem(`post_liked_${this.id}`, this.liked);
      localStorage.setItem(`post_likes_${this.id}`, this.likes);

      likeBtn.classList.toggle('post__action-btn--liked', this.liked);
      likeBtn.querySelector('.post__like-count').textContent = this.likes;
    });

    // — Comentario con Enter —
    const input = article.querySelector('.post__comment-input');
    input.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const text = input.value.trim();
      if (!text) return;

      // Persistir en localStorage
      const saved = JSON.parse(localStorage.getItem(`post_comments_${this.id}`) || '[]');
      const newComment = { user: 'You', text };
      saved.push(newComment);
      localStorage.setItem(`post_comments_${this.id}`, JSON.stringify(saved));

      // Insertar en el DOM sin re-renderizar todo el post
      const commentsContainer = article.querySelector('.post__comments');
      const inputWrap = article.querySelector('.post__comment-input-wrap');
      const commentEl = document.createElement('div');
      commentEl.className = 'post__comment';
      commentEl.innerHTML = `
        <span class="post__comment-author">You</span>
        <span class="post__comment-text">${text}</span>
      `;
      commentsContainer.insertBefore(commentEl, inputWrap);

      // Actualizar contador en el botón
      this.comments.push(newComment);
      article.querySelector('.post__comment-count').textContent = this.comments.length;

      input.value = '';
    });
  }

  // ── Render principal ──────────────────────────────

  render() {
    const html = `
      <article class="post" data-id="${this.id}">
        ${this.renderHeader()}
        ${this.renderBody()}
        ${this.renderActions()}
        ${this.renderComments()}
      </article>
    `;

    document.getElementById('postContainer').insertAdjacentHTML('beforeend', html);

    // Bindear eventos al article recién insertado
    const article = document.querySelector(`.post[data-id="${this.id}"]`);
    this.bindEvents(article);
  }
}

export default Post;