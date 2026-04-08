
 
import { offmoodsidebar } from './src/components/sidebar.js';
import { OffmoodNavbar } from './src/components/navbar.js';
 
// Estos IDs ahora si existen en el index.html
const appLayout = document.getElementById('app-layout');
const mainContent = document.getElementById('main-content');
 
class App {
    constructor() {
        this.sidebar = new offmoodsidebar();
        this.navbar = new OffmoodNavbar();
    }
 
    renderSidebar() {
        const sidebarElement = this.sidebar.render();
        // Inserta la sidebar antes del main-content dentro del app-layout
        appLayout.insertBefore(sidebarElement, mainContent);
        this.sidebar.setupNavigation();
    }

    renderNavbar() {
        const navbarElement = this.navbar.render();
        document.body.appendChild(navbarElement);
        this.navbar.setupNavigation(navbarElement);
    }
 
    setupRouting() {
        document.addEventListener('navigate', (event) => {
            this.loadPage(event.detail);
        });
 
        window.addEventListener('popstate', () => {
            this.loadPage(window.location.pathname);
        });
    }
 
    
    init() {
        this.renderSidebar();
        this.renderNavbar();
        this.setupRouting();
        this.loadPage(window.location.pathname || '/home');
    }
}
 
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});