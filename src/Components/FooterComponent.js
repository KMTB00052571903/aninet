export default class FooterComponent extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
        <footer class="bg-black text-white py-8">
          <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            <!-- Logo -->
            <div class="flex justify-center md:justify-start">
              <div class="flex items-center gap-2">
                <span class="text-4xl">🌐</span>
              </div>
            </div>
  
            <!-- Enlaces -->
            <div class="flex justify-center gap-8 text-sm text-gray-300 flex-wrap">
              <div class="flex flex-col gap-1">
                <a href="#">About</a>
                <a href="#">Help</a>
                <a href="#">Terms</a>
                <a href="#">Privacy Policy</a>
              </div>
              <div class="flex flex-col gap-1">
                <a href="#">Home</a>
                <a href="#">Watch</a>
                <a href="#">Communities</a>
                <a href="#">Profile</a>
              </div>
            </div>
  
            <!-- Info -->
            <div class="text-center md:text-right text-sm text-gray-400">
              <p>© 2025 Ani-Net. All rights reserved.</p>
              <p>Contact Us: info@aninetsocialnetwork.com</p>
            </div>
          </div>
        </footer>
      `;
    }
  }
  