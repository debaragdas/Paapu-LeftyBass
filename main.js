document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.hidden.md\\:flex');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('hidden');
        navLinks.classList.toggle('flex');
        navLinks.classList.toggle('flex-col');
        navLinks.classList.toggle('absolute');
        navLinks.classList.toggle('top-16');
        navLinks.classList.toggle('left-0');
        navLinks.classList.toggle('w-full');
        navLinks.classList.toggle('bg-[#0a0a0a]');
        navLinks.classList.toggle('p-6');
    });

    // 2. Fetch and Render Live Shows
    fetch('shows.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('shows-container');
            container.innerHTML = ''; // Clear loading text

            data.forEach(show => {
                const buttonClass = show.status === "Sold Out" 
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                    : "bg-transparent border border-[#eab308] text-[#eab308] hover:bg-[#eab308] hover:text-black transition";
                
                const showHTML = `
                    <div class="glass-card p-6 rounded flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 hover:bg-white/5 transition duration-300 border-l-4 border-l-[#eab308]">
                        <div class="md:w-1/4">
                            <h3 class="text-xl font-bold heading-font">${show.date}</h3>
                            <p class="text-gray-400 text-sm">${show.location}</p>
                        </div>
                        <div class="md:w-2/4">
                            <h4 class="text-lg font-semibold text-white">${show.title}</h4>
                            <p class="text-gray-500">${show.venue}</p>
                        </div>
                        <div class="md:w-1/4 text-right">
                            <a href="${show.link}" class="${buttonClass} px-6 py-2 rounded font-bold uppercase text-sm tracking-wider inline-block">
                                ${show.status}
                            </a>
                        </div>
                    </div>
                `;
                container.innerHTML += showHTML;
            });
        }).catch(err => console.error("Error loading shows:", err));

    // 3. Fetch and Render Books
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('books-container');
            container.innerHTML = ''; 

            data.forEach(book => {
                const bookHTML = `
                    <div class="glass-card flex flex-col sm:flex-row rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
                        <img src="${book.coverImage}" alt="${book.title}" class="w-full sm:w-48 h-64 object-cover">
                        <div class="p-6 flex flex-col justify-center">
                            <h3 class="text-2xl font-bold heading-font mb-3">${book.title}</h3>
                            <p class="text-gray-400 mb-6 text-sm leading-relaxed">${book.description}</p>
                            <a href="${book.link}" class="text-[#eab308] hover:text-white font-bold uppercase tracking-wider text-sm transition flex items-center gap-2">
                                Read More <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                `;
                container.innerHTML += bookHTML;
            });
        }).catch(err => console.error("Error loading books:", err));

    // 4. Fetch and Render Media (YouTube Reels)
    fetch('reels.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('reels-container');
            container.innerHTML = ''; 

            data.forEach(reel => {
                const reelHTML = `
                    <div class="glass-card rounded-lg overflow-hidden border border-gray-800 hover:border-[#eab308] transition duration-300">
                        <div class="relative pb-[56.25%] h-0">
                            <iframe 
                                src="https://www.youtube.com/embed/${reel.videoId}?controls=1" 
                                class="absolute top-0 left-0 w-full h-full"
                                title="${reel.title}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <div class="p-4 bg-[#111]">
                            <h4 class="text-white font-semibold text-sm heading-font tracking-wide">${reel.title}</h4>
                        </div>
                    </div>
                `;
                container.innerHTML += reelHTML;
            });
        }).catch(err => console.error("Error loading reels:", err));
});
