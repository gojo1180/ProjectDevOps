const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');


const games = [
    { name: 'Free Fire', image: '../../IMG/free-fire.webp', url: '../FRER-FIRE/FREE-FIRE.html' },
    { name: 'Genshin Impact', image: '../../IMG/genshin-impact.webp', url: '../genshin1/genshin.html' },
    { name: 'Honkai Star Rail', image: '../../IMG/honkai-star-rail.webp', url: '../HSR/HSR.html' },
    { name: 'Honor of Kings', image: '../../IMG/honor-of-kings.webp', url: '../hok/hok.html' },
    { name: 'Mobile Legends', image: '../ml/logo ml.jpg', url: '../ml/ml.html' },
    { name: 'PUBG Mobile', image: '../../IMG/pubg-mobile.webp', url: '../Pubg/Pubg.html' },
    { name: 'Valorant', image: '../../IMG/valorant.webp', url: 'Valo.html' },
    { name: 'Wuthering Waves', image: '../../IMG/wuthering-waves.webp', url: '../WUWA/wuwa.html' }
    // Tambahkan game lainnya sesuai kebutuhan
];

// Fungsi untuk menampilkan hasil pencarian
function showSearchResults(results) {
    // Bersihkan hasil sebelumnya
    searchResults.innerHTML = '';

    // Jika hasil pencarian kosong, sembunyikan searchResults
    if (results.length === 0) {
        searchResults.style.display = 'none';
        return;
    }

    // Buat elemen untuk setiap hasil pencarian
    results.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('search-result');

        // Tambahkan gambar dan nama game
        const image = document.createElement('img');
        image.src = game.image;
        image.alt = game.name;
        gameElement.appendChild(image);

        const name = document.createElement('p');
        name.textContent = game.name;
        gameElement.appendChild(name);

        // Tambahkan event listener untuk mengarahkan ke halaman game saat di klik
        gameElement.addEventListener('click', () => {
            window.location.href = game.url;
        });

        searchResults.appendChild(gameElement);
    });

    // Tampilkan searchResults setelah selesai membangun hasil pencarian
    searchResults.style.display = 'block';
}

// Event listener untuk input pencarian
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    if (query === '') {
        searchResults.style.display = 'none';
        return;
    }

    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(query)
    );
    showSearchResults(filteredGames);
});

// Sembunyikan searchResults saat halaman dimuat
searchResults.style.display = 'none';