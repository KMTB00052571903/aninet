class CategoriesPage extends HTMLElement {
    private currentView: 'categories' | 'anime-list' = 'categories';
    private currentGenreId: string | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    async fetchAnimeByGenre(genreId: string) {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${genreId}`);
            const data = await response.json();
            this.renderAnimeList(data.data);
            this.currentView = 'anime-list';
            this.currentGenreId = genreId;
        } catch (error) {
            console.error('Error fetching anime by genre:', error);
        }
    }

    renderAnimeList(animes: any[]) {
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    background-color: #111111;
                    color: white;
                    font-family: 'Lato', sans-serif;
                }

                .page-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .back-button {
                    background-color: #FF0808;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-bottom: 20px;
                    font-weight: bold;
                    transition: background-color 0.3s;
                }

                .back-button:hover {
                    background-color: #cc0000;
                }

                .anime-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                }

                .anime-card {
                    background: #1a1a1a;
                    border-radius: 10px;
                    overflow: hidden;
                    transition: all 0.3s;
                }

                .anime-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
                }

                .anime-image {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                }

                .anime-info {
                    padding: 15px;
                }

                .anime-title {
                    margin: 0;
                    font-size: 1rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                @media (max-width: 768px) {
                    .anime-list {
                        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    }

                    .anime-image {
                        height: 200px;
                    }
                }

                @media (max-width: 480px) {
                    .anime-list {
                        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    }

                    .anime-image {
                        height: 150px;
                    }
                }
            </style>

            <div class="page-container">
                <button class="back-button">← Back to Categories</button>
                <div class="anime-list">
                    ${animes.map(anime => `
                        <div class="anime-card">
                            <img class="anime-image" src="${anime.images?.jpg?.image_url || 'https://via.placeholder.com/200x300'}" alt="${anime.title}">
                            <div class="anime-info">
                                <h3 class="anime-title">${anime.title}</h3>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.shadowRoot!.querySelector('.back-button')?.addEventListener('click', () => {
            this.currentView = 'categories';
            this.render();
        });
    }

    renderCategories() {
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    background-color: #111111;
                    color: white;
                    font-family: 'Lato', sans-serif;
                }

                .page-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .page-title {
                    font-size: 2rem;
                    color: #FF0808;
                    margin-bottom: 30px;
                }

                .categories-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                }

                .category-card {
                    position: relative;
                    height: 200px;
                    border-radius: 10px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .category-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
                }

                .category-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .category-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
                    padding: 20px;
                }

                .category-name {
                    margin: 0;
                    font-size: 1.5rem;
                    color: white;
                }

                @media (max-width: 768px) {
                    .categories-container {
                        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    }
                }

                @media (max-width: 480px) {
                    .categories-container {
                        grid-template-columns: 1fr;
                    }

                    .category-card {
                        height: 150px;
                    }
                }
            </style>

            <div class="page-container">
                <h1 class="page-title">Animation Categories</h1>
                <div class="categories-container">
                    <div class="category-card" data-id="1">
                        <img class="category-image" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748380593/Anime_i538vx.jpg" alt="Anime">
                        <div class="category-overlay">
                            <h3 class="category-name">Anime</h3>
                        </div>
                    </div>
                    <div class="category-card" data-id="2">
                        <img class="category-image" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748380594/American_fx6pd6.jpg" alt="American Animation">
                        <div class="category-overlay">
                            <h3 class="category-name">American Animation</h3>
                        </div>
                    </div>
                    <div class="category-card" data-id="3">
                        <img class="category-image" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748380594/Donghua_sx7sj0.jpg" alt="Chinese Animation (Donghua)">
                        <div class="category-overlay">
                            <h3 class="category-name">Chinese Animation (Donghua)</h3>
                        </div>
                    </div>
                    <div class="category-card" data-id="4">
                        <img class="category-image" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748380382/West_uflpje.png" alt="Western Animation">
                        <div class="category-overlay">
                            <h3 class="category-name">Western Animation</h3>
                        </div>
                    </div>
                    <div class="category-card" data-id="5">
                        <img class="category-image" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748380592/3D_uqqzew.jpg" alt="3D Animation">
                        <div class="category-overlay">
                            <h3 class="category-name">3D Animation</h3>
                        </div>
                    </div>
                    <div class="category-card" data-id="6">
                        <img class="category-image" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748380593/Stop-Motion_licyif.jpg" alt="Stop-Motion">
                        <div class="category-overlay">
                            <h3 class="category-name">Stop-Motion</h3>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    render() {
        if (this.currentView === 'categories') {
            this.renderCategories();
        } else if (this.currentView === 'anime-list' && this.currentGenreId) {
            this.fetchAnimeByGenre(this.currentGenreId);
        }
    }

    setupEventListeners() {
        this.shadowRoot!.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const genreId = card.getAttribute('data-id');
                if (genreId === '1') { // Solo Anime carga la lista de animes
                    this.fetchAnimeByGenre(genreId);
                }
                // Para otras categorías podrías añadir lógica similar cuando tengas APIs para ellas
            });
        });
    }
}

customElements.define('categories-page', CategoriesPage);
export default CategoriesPage;