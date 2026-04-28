document.addEventListener("DOMContentLoaded", () => {
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            nav.classList.add('bg-[#0a0a0a]', 'shadow-lg');
            nav.classList.remove('glass-card');
        } else {
            nav.classList.remove('bg-[#0a0a0a]', 'shadow-lg');
            nav.classList.add('glass-card');
        }
    });

    // Mobile Menu Toggle
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

    // Fetch and Render Live Shows
    fetch('shows.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('shows-container');
            container.innerHTML = ''; 

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

    // Fetch and Render Books
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('books-container');
            container.innerHTML = ''; 

            data.forEach(book => {
                const bookHTML = `
                    <div class="glass-card flex flex-col sm:flex-row rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 max-w-2xl mx-auto">
                        <img src="${book.coverImage}" alt="${book.title}" class="w-full sm:w-48 h-64 object-cover">
                        <div class="p-6 flex flex-col justify-center">
                            <h3 class="text-2xl font-bold heading-font mb-3">${book.title}</h3>
                            <p class="text-gray-400 mb-6 text-sm leading-relaxed">${book.description}</p>
                            <a href="${book.link}" target="_blank" class="text-[#eab308] hover:text-white font-bold uppercase tracking-wider text-sm transition flex items-center gap-2">
                                Get The Book <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                `;
                container.innerHTML += bookHTML;
            });
        }).catch(err => console.error("Error loading books:", err));

    // Fetch and Render Instagram Reels
    fetch('reels.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('reels-container');
            container.innerHTML = ''; 

            data.forEach(reel => {
                const reelHTML = `
                    <div class="glass-card rounded-lg overflow-hidden border border-gray-800 hover:border-[#eab308] transition duration-300 p-2 flex justify-center bg-white/5">
                        ${reel.embedCode} 
                    </div>
                `;
                container.innerHTML += reelHTML;
            });

            // Tell Instagram to process the injected embed scripts
            if (window.instgrm) {
                window.instgrm.Embeds.process();
            }
        }).catch(err => console.error("Error loading reels:", err));
});
