document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".item, .battle");
    const quantityInput = document.getElementById("quantity");
    let selectedPrice = 0;

    // Memilih item
    items.forEach(item => {
        item.addEventListener("click", function(event) {
            event.preventDefault();
            items.forEach(i => i.classList.remove("selected"));
            item.classList.add("selected");
            selectedPrice = parseInt(item.getAttribute("data-price"), 10); // Pastikan harga di-parse dengan benar
            resetQuantity();
            calculatePayment();
        });
    });

    // Reset jumlah ke 1 saat memilih item
    function resetQuantity() {
        quantityInput.value = 1;
    }

    // Menghitung total pembayaran
    function calculatePayment() {
        const quantity = parseInt(quantityInput.value, 10);
        const totalPayment = quantity * selectedPrice;
        const paymentText = isNaN(totalPayment) ? "Rp. 0" : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPayment);
        
        document.getElementById("totalPayment1").textContent = paymentText;
        document.getElementById("totalPayment2").textContent = paymentText;
        document.getElementById("totalPayment3").textContent = paymentText;
        document.getElementById("totalPayment4").textContent = paymentText;
    }

    // Mengupdate total pembayaran saat jumlah diubah
    quantityInput.addEventListener("input", calculatePayment);

    function validateinput() {
        let value = parseInt(quantityInput.value, 10);
        if (isNaN(value) || value < 1) {
            quantityInput.value = 1;
        } else if (value > 100) {
            quantityInput.value = 100;
        }
    }

    // Memilih metode pembayaran
    const methods = document.querySelectorAll(".methode");
    methods.forEach(method => {
        method.addEventListener("click", function() {
            methods.forEach(m => m.classList.remove("selected"));
            method.classList.add("selected");

            const src = method.querySelector("img").getAttribute("src");
            document.getElementById("popup-method-img").src = src;
        });
    });

    // Menampilkan popup pembelian
    const buyNowButton = document.getElementById("buy-now");
    if (buyNowButton) {
        buyNowButton.addEventListener("click", function() {
            showPopup();
        });
    }

    // Fungsi untuk menampilkan popup
    function showPopup() {
        const riotId = document.getElementById("riot-id-input").value;
        const selectedMethod = document.querySelector(".methode.selected");
        const selectedItem = document.querySelector(".item.selected, .battle.selected");

        if (!riotId) {
            alert("Silakan masukkan ID Anda.");
            document.getElementById("riot-id-input").classList.add("error");
            document.getElementById("riot-id-input").scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if (!selectedItem) {
            document.querySelector(".items-container").scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (!selectedMethod) {
            document.querySelector(".items-container").scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const modal = document.getElementById("popup-modal");
        modal.style.display = "flex"; // Menggunakan flexbox untuk menampilkan di tengah

        const totalPayment = document.getElementById("totalPayment1").textContent;

        document.getElementById("popup-riot-id").textContent = riotId;
        document.getElementById("popup-amount").textContent = totalPayment;

        // Simulasi QR Code 
        document.getElementById("popup-qr").src = qrCodeSrc;
    }
});

// Menyembunyikan popup
function closePopup() {
    const modal = document.getElementById("popup-modal");
    modal.style.display = "none";
}

// Konfirmasi pembelian
function confirmPurchase() {
    closePopup(); // Menyembunyikan popup setelah konfirmasi
    showSuccessPopup(); // Menampilkan modal sukses
}

function showSuccessPopup() {
    const successModal = document.getElementById("success-modal");
    successModal.style.display = "flex"; // Menampilkan modal sukses
}

function redirectToHome() {
    window.location.href = "../Home.html"; // Ganti dengan path halaman beranda Anda
}


// Menyembunyikan modal sukses
function closeSuccessPopup() {
    const successModal = document.getElementById("success-modal");
    successModal.style.display = "none";
    setTimeout(redirectToHome, 1000);
}

// Memastikan modal ditutup jika klik di luar area modal
window.onclick = function(event) {
    const modal = document.getElementById("popup-modal");
    const successModal = document.getElementById("success-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    } 
};

$(document).ready(function() {
    $(".battle").hide();
    $('[data-category="starlight"]').click(function(){
        $('.item').hide();
        $('.battle').show();
    });
    $('[data-category="diamonds"]').click(function(){
        $('.item').show();
        $('.battle').hide();
    });
});

