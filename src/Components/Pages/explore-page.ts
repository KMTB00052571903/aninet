class ExplorePage extends HTMLElement {
    private currentPage = 1;
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.fetchCombinedContent();
    }

    async fetchCombinedContent(page = 1) {
        try {
            // 1. Fetch top anime from Jikan API
            const animeResponse = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
            const animeData = await animeResponse.json();
            
            // 2. Fetch local content (solo título e imagen)
            const localContent = await this.fetchLocalContent();
            
            // 3. Combinar y formatear los datos manteniendo la estructura original
            const combinedContent = [
                ...animeData.data.map((anime: any) => ({
                    title: anime.title,
                    image_url: anime.images?.jpg?.image_url,
                    type: anime.type || 'TV',
                    score: anime.score || 'N/A',
                    episodes: anime.episodes || '?',
                    status: anime.status || 'Unknown',
                    synopsis: anime.synopsis?.substring(0, 100) || 'No synopsis available'
                })),
                ...localContent.map((item: any) => ({
                    title: item.title,
                    image_url: item.image_url,
                    type: item.type || 'Animation',
                    score: 'N/A',
                    episodes: '?',
                    status: 'Unknown',
                    synopsis: 'Description not available'
                }))
            ];

            this.renderAnimeCards(combinedContent);
            this.currentPage = page;
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    }

    async fetchLocalContent(): Promise<any[]> {
        try {
            const [disney, donghua, animation3d, stopMotion, western] = await Promise.all([
                fetch('../src/Assets/disney.json').then(res => res.json()),
                fetch('../src/Assets/donghua.json').then(res => res.json()),
                fetch('../src/Assets/3d-animation.json').then(res => res.json()),
                fetch('../src/Assets/Stop-Motion.json').then(res => res.json()),
                fetch('../src/Assets/Western-Animation.json').then(res => res.json())
            ]);

            return [
                ...disney.disney.map((item: any) => ({ title: item.title, image_url: item.image_url, type: 'Disney' })),
                ...donghua.donghua.map((item: any) => ({ title: item.title, image_url: item.image_url, type: 'Donghua' })),
                ...animation3d["3d_animation"].map((item: any) => ({ title: item.title, image_url: item.image_url, type: '3D' })),
                ...stopMotion.stop_motion.map((item: any) => ({ title: item.title, image_url: item.image_url, type: 'Stop Motion' })),
                ...western.western_animation.map((item: any) => ({ title: item.title, image_url: item.image_url, type: 'Western' }))
            ];
        } catch (error) {
            console.error('Error loading local content:', error);
            return [];
        }
    }

    renderAnimeCards(animes: any[]) {
        const container = this.shadowRoot!.querySelector('.anime-grid');
        if (container) {
            container.innerHTML = animes.map(anime => `
                <div class="anime-card">
                    <div class="anime-image">
                        <img src="${anime.image_url || 'https://via.placeholder.com/300x450?text=No+Image'}" alt="${anime.title}">
                        <div class="anime-score">⭐ ${anime.score}</div>
                    </div>
                    <div class="anime-info">
                        <h3>${anime.title}</h3>
                        <div class="anime-details">
                            <span>${anime.type}</span>
                            <span>${anime.episodes} eps</span>
                            <span>${anime.status}</span>
                        </div>
                        <p class="anime-synopsis">${anime.synopsis}...</p>
                    </div>
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

                .explore-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    border-radius: 20px;
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }

                .page-title {
                    font-size: 2rem;
                    color: #FF0808;
                    margin: 0;
                }

                .search-bar {
                    display: flex;
                    gap: 10px;
                }

                .search-input {
                    padding: 10px 15px;
                    border-radius: 20px;
                    border: none;
                    background: #2a2a2a;
                    color: white;
                    width: 300px;
                    font-size: 1rem;
                }

                .search-btn {
                    background: #FF0808;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    padding: 10px 20px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .search-btn:hover {
                    background: #E00707;
                }

                .anime-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 25px;
                    margin-top: 30px;
                }

                .anime-card {
                    background: #1a1a1a;
                    border-radius: 15px;
                    overflow: hidden;
                    transition: transform 0.3s, box-shadow 0.3s;
                    cursor: pointer;
                }

                .anime-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(255, 8, 8, 0.2);
                }

                .anime-image {
                    position: relative;
                    height: 350px;
                    overflow: hidden;
                }

                .anime-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s;
                }

                .anime-card:hover .anime-image img {
                    transform: scale(1.05);
                }

                .anime-score {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(0, 0, 0, 0.7);
                    padding: 5px 10px;
                    border-radius: 20px;
                    font-weight: bold;
                }

                .anime-info {
                    padding: 15px;
                }

                .anime-info h3 {
                    margin: 0 0 10px 0;
                    font-size: 1.2rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .anime-details {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 10px;
                    font-size: 0.8rem;
                    color: #A4A4A4;
                }

                .anime-synopsis {
                    font-size: 0.9rem;
                    color: #e0e0e0;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .pagination {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 40px;
                }

                .page-btn {
                    background: #2a2a2a;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 8px 15px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .page-btn:hover {
                    background: #FF0808;
                }

                .page-btn.active {
                    background: #FF0808;
                    font-weight: bold;
                }

                @media (max-width: 768px) {
                    .page-header {
                        flex-direction: column;
                        gap: 15px;
                        align-items: flex-start;
                    }

                    .search-bar {
                        width: 100%;
                    }

                    .search-input {
                        width: 100%;
                    }

                    .anime-grid {
                        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    }

                    .anime-image {
                        height: 300px;
                    }
                }

                @media (max-width: 480px) {
                    .anime-grid {
                        grid-template-columns: 1fr;
                    }

                    .anime-image {
                        height: 250px;
                    }
                }
            </style>

            <div class="explore-container">
                <div class="page-header">
                    <h1 class="page-title">Explore Anime</h1>
                    <div class="search-bar">
                        <input type="text" class="search-input" placeholder="Search anime...">
                        <button class="search-btn">Search</button>
                    </div>
                </div>

                <div class="anime-grid"></div>

                <div class="pagination">
                    <button class="page-btn prev-btn">Previous</button>
                    <button class="page-btn active">1</button>
                    <button class="page-btn">2</button>
                    <button class="page-btn">3</button>
                    <button class="page-btn next-btn">Next</button>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.shadowRoot!.querySelector('.prev-btn')?.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.fetchCombinedContent(this.currentPage - 1);
            }
        });

        this.shadowRoot!.querySelector('.next-btn')?.addEventListener('click', () => {
            this.fetchCombinedContent(this.currentPage + 1);
        });

        this.shadowRoot!.querySelector('.search-btn')?.addEventListener('click', () => {
            this.handleSearch();
        });

        this.shadowRoot!.querySelector('.search-input')?.addEventListener('keypress', (e: Event) => {
            const keyboardEvent = e as KeyboardEvent;
            if (keyboardEvent.key === 'Enter') {
                this.handleSearch();
            }
        });
    }

    async handleSearch() {
        const input = this.shadowRoot!.querySelector('.search-input') as HTMLInputElement;
        const query = input.value.trim();
        
        if (query) {
            try {
                // Buscar en ambos datos
                const [apiResults, localResults] = await Promise.all([
                    this.searchJikanAnime(query),
                    this.searchLocalContent(query)
                ]);

                const combinedResults = [
                    ...apiResults,
                    ...localResults.map((item: any) => ({
                        ...item,
                        type: item.type || 'Animation',
                        score: 'N/A',
                        episodes: '?',
                        status: 'Unknown',
                        synopsis: 'Description not available'
                    }))
                ];

                this.renderAnimeCards(combinedResults);
            } catch (error) {
                console.error('Error searching anime:', error);
            }
        }
    }

    async searchJikanAnime(query: string): Promise<any[]> {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
            const data = await response.json();
            return data.data.map((anime: any) => ({
                title: anime.title,
                image_url: anime.images?.jpg?.image_url,
                type: anime.type || 'TV',
                score: anime.score || 'N/A',
                episodes: anime.episodes || '?',
                status: anime.status || 'Unknown',
                synopsis: anime.synopsis?.substring(0, 100) || 'No synopsis available'
            }));
        } catch (error) {
            console.error('Error searching anime:', error);
            return [];
        }
    }

    async searchLocalContent(query: string): Promise<any[]> {
        try {
            const localContent = await this.fetchLocalContent();
            return localContent.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase())
            );
        } catch (error) {
            console.error('Error searching local content:', error);
            return [];
        }
    }
}

customElements.define('explore-page', ExplorePage);
export default ExplorePage;