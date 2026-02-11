// Load More Logic
const loadMoreBtn = document.getElementById('loadMoreBtn');
const extraProjects = document.querySelectorAll('.extra-project');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        extraProjects.forEach(project => project.classList.add('show'));
        loadMoreBtn.style.opacity = '0';
        setTimeout(() => { loadMoreBtn.parentElement.style.display = 'none'; }, 400);
    });
}

// Copy Email Logic
const copyBtn = document.getElementById('copyEmail');
const copyStatus = document.getElementById('copyStatus');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText("mloukaamir36@gmail.com").then(() => {
            copyStatus.style.opacity = "1";
            copyStatus.style.height = "auto";
            copyBtn.textContent = "Copied!";
            setTimeout(() => {
                copyStatus.style.opacity = "0";
                copyStatus.style.height = "0";
                copyBtn.textContent = "Copy My Email";
            }, 3000);
        });
    });
}

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".project-img").forEach(img => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.getAttribute("data-full");
        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
});

const closeLightbox = () => {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
};
closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });