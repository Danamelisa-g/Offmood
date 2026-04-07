export class OffmoodNavbar {
    constructor(){
         this.currentActive = 'home';

        }
        render() {
        const html = `
            <nav class="navbar" id="offmood-navbar">
 
                <div class="navbar-item active" data-nav="home" data-route="/home">
                    <svg class="navbar-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6 8 6v12h-7v-6h-2v6z"/>
                    </svg>
                    <span>Feed</span>
                </div>
 
                <div class="navbar-item" data-nav="emotions" data-route="/emotions">
                    <svg class="navbar-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                    <span>Emotions</span>
                </div>
 
                <div class="navbar-item" data-nav="profile" data-route="/profile">
                    <svg class="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/>
                        <circle cx="12" cy="7" r="3"/>
                    </svg>
                    <span>Profile</span>
                </div>
 
            </nav>
        `;
            const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstChild;
    }
    setupNavigation(navbarElement) {
        const items = navbarElement.querySelectorAll('.navbar-item');
 
        items.forEach(item => {
            item.addEventListener('click', () => {
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
 
                const route = item.getAttribute('data-route');
                if (route) navigate(route);
            });
        });
    }
 
}

function navigate(route) {
    const event = new CustomEvent('navigate', {
        detail: route,
        bubbles: true,
        composed: true
    });
    document.dispatchEvent(event);
 
    if (window.history && window.history.pushState) {
        window.history.pushState(null, '', route);
    }
}
 
export default OffmoodNavbar;