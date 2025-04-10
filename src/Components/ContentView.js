import "../Components/MediaCard.js";

class ContentView extends HTMLElement {
  constructor() {
    super();
    this.products = [];
  }

  async connectedCallback() {
    await this.loadData();
    this.render();
  }

  async loadData() {
    try {
      const response = await fetch("../Assets/postList.json");
      if (!response.ok) throw new Error("Error al cargar postList.json");
      this.products = await response.json();
    } catch (error) {
      console.error("Error cargando los datos:", error);
    }
  }

  render() {
    this.innerHTML = `
      <section class="p-6 flex flex-col gap-6 items-center bg-gradient-to-b from-black to-zinc-900 min-h-screen">
        <h1 class="text-3xl text-white font-bold">Explora el contenido</h1>
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-screen-xl justify-items-center">
          ${this.products
            .map(
              (item) => `
                <media-card data='${JSON.stringify(item)}'></media-card>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }
}

customElements.define("content-view", ContentView);
export default ContentView;
