import { offmoodsidebar } from './Src/components/sidebar/sidebar.js';
import { OffmoodNavbar } from './Src/components/navbar/navbar.js';
import { renderMoodSelector } from "./Src/components/moodSelector/moodSelector.js";

import Post from './Src/components/post/post.js';
import PostImage from './Src/components/post/postImage.js';

const appLayout = document.getElementById('app-layout');
const mainContent = document.getElementById('main-content');

class App {
    constructor() {
        this.sidebar = new offmoodsidebar();
        this.navbar = new OffmoodNavbar();
    }

    renderSidebar() {
        const sidebarElement = this.sidebar.render();
        appLayout.insertBefore(sidebarElement, mainContent);
        this.sidebar.setupNavigation();
    }

    renderNavbar() {
        const navbarElement = this.navbar.render();
        document.body.appendChild(navbarElement);
        this.navbar.setupNavigation(navbarElement);
    }

    async renderPosts() {
        const response = await fetch('./Src/postdat.json');
        const posts = await response.json();

        posts.forEach(data => {
            const post = data.image ? new PostImage(data) : new Post(data);
            post.render();
        });
    }

    setupRouting() {
        document.addEventListener('navigate', (event) => {
            // this.loadPage(event.detail);
        });

        window.addEventListener('popstate', () => {
            // this.loadPage(window.location.pathname);
        });
    }

    async init() {
        this.renderSidebar();
        this.renderNavbar();
        this.setupRouting();

        renderMoodSelector();
        await this.renderPosts();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});