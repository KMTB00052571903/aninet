export default class MediaCard extends HTMLElement {
    connectedCallback() {
      const data = JSON.parse(this.getAttribute("data") || "{}");
  
      this.innerHTML = `
        <div class="bg-zinc-900 text-white rounded-xl shadow-lg w-80 overflow-hidden transition transform hover:scale-105">
          <!-- Header: icon, name, tag, time -->
          <div class="flex items-center justify-between p-4">
            <div class="flex items-center gap-3">
              <img src="${data.icon}" alt="${data.name}" class="w-10 h-10 rounded-full border-2 border-red-600" />
              <div>
                <p class="font-semibold">${data.name}</p>
                <p class="text-xs text-gray-400">${data.time}</p>
              </div>
            </div>
            <span class="text-xs bg-red-600 px-2 py-1 rounded-full">${data.tag}</span>
          </div>
  
          <!-- Image -->
          <img src="${data.image}" alt="${data.title}" class="w-full h-48 object-cover">
  
          <!-- Title & Like -->
          <div class="p-4 flex flex-col gap-2">
            <h3 class="text-lg font-bold">${data.title}</h3>
            <div class="flex justify-end">
              <button class="text-xl ${data.liked ? 'text-red-500' : 'text-gray-400'} hover:scale-125 transition">
                ${data.liked ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }
  