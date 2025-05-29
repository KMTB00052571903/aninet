class CategoriesPage extends HTMLElement {
    private currentView: 'categories' | 'content-list' = 'categories';
    private currentCategory: { id: string; type: string; name: string } | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    async fetchContentByCategory(categoryId: string, categoryType: string) {
        try {
            let contentData: any[] = [];

            switch (categoryType) {
                case 'anime':
                    const animeResponse = await fetch(`https://api.jikan.moe/v4/anime?genres=${categoryId}`);
                    const animeData = await animeResponse.json();
                    contentData = animeData.data.map((item: any) => ({
                        image: item.images?.jpg?.image_url,
                        title: item.title, 
                        id: item.mal_id
                    }));
                    break;
                
                case 'american-animation':
                         try {
                        const disneyResponse = await fetch('../src/Assets/disney.json'); // Usa ruta relativa
                        const disneyData = await disneyResponse.json();
                        contentData = disneyData.disney.map((item: any) => ({ // Cambia .data por .disney
                        image: item.image_url,  // Usa image_url que está en tu JSON
                        title: item.title,
                        id: item.title //  ID temporal
                         }));
                        } catch (error) {
                            console.error('Error loading Disney JSON:', error);
                            contentData = [];
                            }
                        break;
                
                case 'donghua':
                        try {
                        const donghuaResponse = await fetch('../src/Assets/donghua.json');
                        const donghuaData = await donghuaResponse.json();
                        contentData = donghuaData.donghua.map((item: any) => ({ // Usar donghuaData.donghua
                        image: item.image_url, // Cambiar a image_url para coincidir 
                        title: item.title,
                        id: item.title // ID temporal
                        }));
                         } catch (error) {
                                console.error('Error loading Donghua JSON:', error);
                                contentData = [];
                        }
                        break;

                case '3d': // Asegúrate que este '3d' coincida con el data-type de tu categoría
                        try {
                        const animation3dResponse = await fetch('../src/Assets/3d-animation.json');
                        const animation3dData = await animation3dResponse.json();
                        contentData = animation3dData["3d_animation"].map((item: any) => ({
                        image: item.image_url,  // Usa image_url que está en tu JSON
                        title: item.title,
                        id: item.title //  ID temporal
                        }));
                        } catch (error) {
                        console.error('Error loading 3D Animation JSON:', error);
                        contentData = [];
                        }
                        break;

                    case 'stop-motion': 
                            try {
                            const stopMotionResponse = await fetch('../src/Assets/Stop-Motion.json');
                            const stopMotionData = await stopMotionResponse.json();
                            contentData = stopMotionData.stop_motion.map((item: any) => ({
                            image: item.image_url || 'https://via.placeholder.com/300x450?text=No+Image', // Fallback si está vacío
                            title: item.title,
                            id: item.title // ID temporal
                        }));
                        } catch (error) {
                        console.error('Error loading Stop-Motion JSON:', error);
                        contentData = [];
                        }
                        break;

                    case 'western': 
                            try {
                            const westernResponse = await fetch('../src/Assets/Western-Animation.json');
                            const westernData = await westernResponse.json();
                            contentData = westernData.western_animation.map((item: any) => ({
                            image: item.image_url || 'https://via.placeholder.com/300x450?text=No+Image', // Fallback si está vacío
                            title: item.title,
                            id: item.title // ID temporal
                            }));
                        } catch (error) {
                        console.error('Error loading Western Animation JSON:', error);
                        contentData = [];
                        }
                        break;
                
                
                default:
                    console.error('Unknown category type:', categoryType);
                    return;
            }

            this.renderContentList(contentData, categoryType);
            this.currentView = 'content-list';
            
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    }

    renderContentList(items: any[], categoryType: string) {
        const categoryName = this.currentCategory?.name || 'Content';
        
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

                .content-title {
                    font-size: 1.8rem;
                    color: #FF0808;
                    margin-bottom: 20px;
                }

                .content-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                }

                .content-card {
                    background: #1a1a1a;
                    border-radius: 10px;
                    overflow: hidden;
                    transition: all 0.3s;
                }

                .content-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
                }

                .content-image {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                }

                .content-info {
                    padding: 15px;
                }

                .content-name {
                    margin: 0;
                    font-size: 1rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .no-content {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 40px;
                    color: #A4A4A4;
                }

                @media (max-width: 768px) {
                    .content-list {
                        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    }

                    .content-image {
                        height: 200px;
                    }
                }

                @media (max-width: 480px) {
                    .content-list {
                        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    }

                    .content-image {
                        height: 150px;
                    }
                }
            </style>

            <div class="page-container">
                <button class="back-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 12 12">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>   Back to Categories</button>
                <h2 class="content-title">${categoryName}</h2>
                <div class="content-list">
                    ${items.length > 0 ? 
                        items.map(item => `
                            <div class="content-card">
                                <img class="content-image" src="${item.image || 'https://via.placeholder.com/200x300'}" alt="${item.title}">
                                <div class="content-info">
                                    <h3 class="content-name">${item.title}</h3>
                                </div>
                            </div>
                        `).join('') : 
                        `<div class="no-content">No content available for this category</div>`
                    }
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
                    transform: translateY(-10px);
                    box-shadow: 0 10px 20px rgba(158, 42, 42, 0.3);
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
                    <div class="category-card" data-id="1" data-type="anime">
                        <img class="category-image" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748380593/Anime_i538vx.jpg" alt="Anime">
                        <div class="category-overlay">
                            <h3 class="category-name">Japanese Animation <br> Anime</h3>
                        </div>
                    </div>
                    <div class="category-card" data-id="2" data-type="american-animation">
                        <img class="category-image" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748380594/American_fx6pd6.jpg" alt="American Animation">
                        <div class="category-overlay">
                            <h3 class="category-name">Disney Animation</h3>
                        </div>
                    </div>
                    <div class="category-card" data-id="3" data-type="donghua">
                        <img class="category-image" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748380594/Donghua_sx7sj0.jpg" alt="Chinese Animation (Donghua)">
                        <div class="category-overlay">
                            <h3 class="category-name">Chinese Animation (Donghua)</h3>
                        </div>
                    </div>
                    <div class="category-card" data-id="4" data-type="western">
                        <img class="category-image" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748380382/West_uflpje.png" alt="Western Animation">
                        <div class="category-overlay">
                            <h3 class="category-name">Western Animation</h3>
                        </div>
                    </div>
                    <div class="category-card" data-id="5" data-type="3d">
                        <img class="category-image" src="https://res.cloudinary.com/di4ckwvxe/image/upload/v1748380592/3D_uqqzew.jpg" alt="3D Animation">
                        <div class="category-overlay">
                            <h3 class="category-name">3D Animation</h3>
                        </div>
                    </div>
                    <div class="category-card" data-id="6" data-type="stop-motion">
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
        } else if (this.currentView === 'content-list' && this.currentCategory) {
            this.fetchContentByCategory(this.currentCategory.id, this.currentCategory.type);
        }
    }

    setupEventListeners() {
        this.shadowRoot!.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const categoryId = card.getAttribute('data-id');
                const categoryType = card.getAttribute('data-type');
                const categoryName = card.querySelector('.category-name')?.textContent || 'Content';
                
                if (categoryId && categoryType) {
                    this.currentCategory = { id: categoryId, type: categoryType, name: categoryName };
                    this.fetchContentByCategory(categoryId, categoryType);
                }
            });
        });
    }
}

customElements.define('categories-page', CategoriesPage);
export default CategoriesPage;