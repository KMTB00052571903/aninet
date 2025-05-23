class CategoriesPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.fetchGenres();
    }

    async fetchGenres() {
        try {
            const response = await fetch('https://api.jikan.moe/v4/genres/anime');
            const data = await response.json();
            this.renderGenres(data.data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    }

    renderGenres(genres: any[]) {
        const container = this.shadowRoot!.querySelector('.genres-container');
        if (container) {
            container.innerHTML = genres.map(genre => `
                <div class="genre-card" data-id="${genre.mal_id}">
                    <h3>${genre.name}</h3>
                    <span class="count">${genre.count} animes</span>
                </div>
            `).join('');
        }
    }

    render() {
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

                .genres-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                }

                .genre-card {
                    background: #1a1a1a;
                    border-radius: 10px;
                    padding: 20px;
                    transition: all 0.3s;
                    cursor: pointer;
                    border-left: 4px solid #FF0808;
                }

                .genre-card:hover {
                    transform: translateY(-5px);
                    background: #222222;
                }

                .genre-card h3 {
                    margin: 0 0 10px 0;
                    font-size: 1.2rem;
                }

                .count {
                    color: #A4A4A4;
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .genres-container {
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    }
                }

                @media (max-width: 480px) {
                    .genres-container {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <div class="page-container">
                <h1 class="page-title">Anime Categories</h1>
                <div class="genres-container"></div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.shadowRoot!.querySelectorAll('.genre-card').forEach(card => {
            card.addEventListener('click', () => {
                const genreId = card.getAttribute('data-id');
                // Aquí puedes navegar a una página con animes de este género
                console.log('Selected genre ID:', genreId);
            });
        });
    }
}

customElements.define('categories-page', CategoriesPage);
export default CategoriesPage;