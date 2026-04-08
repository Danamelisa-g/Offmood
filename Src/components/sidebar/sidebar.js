//definos la clase del componenete sidebar
export class offmoodsidebar {

    // Método que se encarga de crear y renderizar el sidebar en el DOM
    render() {
        // Se crea un elemento <aside> que será el contenedor principal del sidebar
        const sidebar = document.createElement('aside');
        // Aqui le asignamos una clase al css para los estilo
        sidebar.className = 'sidebar';
        // Se define el contenido interno del sidebar usando template literals
        sidebar.innerHTML = `
            <div class="sidebar-logo">
                <img src="./Src/assets/Frame 20.png" alt="offmood logo" class="sidebar-logo-icon">
                
            </div>
 
            <nav class="sidebar-menu">
 
                <div class="sidebar-item active" data-route="/home">
                    <svg class="sidebar-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                    <span>Feed</span>
                </div>
 
                <div class="sidebar-item" data-route="/emotions">
                    <svg class="sidebar-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                    <span>Emotion History</span>
                </div>
 
                <button class="sidebar-btn-create" data-route="/create">
                    <svg viewBox="0 0 24 24" fill="white" class="sidebar-icon">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/>
                    </svg>
                    Create Post
                </button>
 
            </nav>
 
            <div class="sidebar-bottom">
 
                <div class="sidebar-profile" data-route="/profile">
                    <div class="sidebar-avatar">AS</div>
                    <span class="sidebar-profile-name">Adam Smith</span>
                </div>
 
                <div class="sidebar-logout" id="logout-btn">
                    <svg class="sidebar-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"/>
                    </svg>
                    <span>Log out</span>
                </div>
 
            </div>
        `;
        // Se guarda el elemento creado en la propiedad this.element
        this.element = sidebar;
        // Se retorna el sidebar para poder insertarlo en el DOM 
        return sidebar;
    }
    // Método para configurar la navegación (eventos de click)
    setupNavigation() {
        // Se seleccionan todos los items del menú
        const items = this.element.querySelectorAll('.sidebar-item');
        // Se recorre cada item para agregarle un evento de click
        items.forEach(item => {
            item.addEventListener('click', () => {
                // Se elimina la clase 'active' de todos los items
                items.forEach(i => i.classList.remove('active'));
                // Se añade la clase 'active' al item clickeado
                item.classList.add('active');
                // Se navega a la ruta definida en data-route
                navigate(item.getAttribute('data-route'));
            });
        });
        // Evento para el botón "Create Post" esto es 
        this.element.querySelector('.sidebar-btn-create')
            .addEventListener('click', () => navigate('/create'));
        //evento para ir a perfil no funciona paorque le quite la ruta :)
        this.element.querySelector('.sidebar-profile')
            .addEventListener('click', () => navigate('/profile'));
        //evento para cerrar o salir
        this.element.querySelector('#logout-btn')
            .addEventListener('click', () => navigate('/logout'));
    }
}
// Se exporta la clase como exportación por defecto
export default offmoodsidebar;
