console.log("Firebase Script Loaded!");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCypUyn9f9P-9id0T7jo8wjnMZEXcxQuLk",
    authDomain: "tngraphix-portfolio.firebaseapp.com",
    projectId: "tngraphix-portfolio",
    storageBucket: "tngraphix-portfolio.firebasestorage.app",
    messagingSenderId: "1021687000823",
    appId: "1:1021687000823:web:744790f86259951ba42df2",
    measurementId: "G-9Z6ZTQDPZJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const projectContainer = document.getElementById('project-container');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// 1. DATA LOADING & SORTING
onSnapshot(query(collection(db, "projects"), orderBy("createdAt", "desc")), (snapshot) => {
    console.log("Database connected!");
    
    if (!projectContainer) return;

    if (snapshot.empty) {
        projectContainer.innerHTML = "<p>No projects found.</p>";
        return;
    }

    // Convert to array and sort (Extra projects forced to the bottom)
    const projectsArray = [];
    snapshot.forEach(doc => projectsArray.push(doc.data()));
    
    projectsArray.sort((a, b) => (a.isExtra === b.isExtra) ? 0 : a.isExtra ? 1 : -1);

    // Clear and render only ONCE
    projectContainer.innerHTML = ""; 

    projectsArray.forEach((data) => {
        const projectHTML = `
            <div class="project ${data.isWide ? 'wide' : ''} ${data.isExtra ? 'extra-project' : ''}">
                <img src="${data.imageUrl}" alt="${data.title}" class="project-img" loading="eager">
                <div class="project-info">
                    <h3>${data.title}</h3>
                    <p>${data.subtitle}</p>
                </div>
            </div>
        `;
        projectContainer.insertAdjacentHTML('beforeend', projectHTML);
    });

    // Re-show load more button if extra projects exist
    const hasExtras = document.querySelectorAll('.extra-project').length > 0;
    if (loadMoreBtn && hasExtras) {
        loadMoreBtn.style.display = 'inline-block';
    }
});

// 2. LOAD MORE BUTTON LOGIC
if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
        const extraProjects = document.querySelectorAll('.extra-project');
        if (extraProjects.length > 0) {
            extraProjects.forEach(p => p.classList.add('show'));
            loadMoreBtn.style.display = 'none';
        } else {
            alert("No more projects to load!");
        }
    };
}

// 3. FULL SIZE LIGHTBOX LOGIC
// We listen on the container for clicks to handle dynamic content
if (projectContainer) {
    projectContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('project-img')) {
            const fullImageUrl = e.target.getAttribute('src');
            openFullSize(fullImageUrl);
        }
    });
}

function openFullSize(url) {
    let modal = document.getElementById('photo-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'photo-modal';
        modal.innerHTML = `
            <span class="close-modal">&times;</span>
            <img class="modal-content" id="full-img">
        `;
        document.body.appendChild(modal);
        
        // Close when clicking background or X
        modal.onclick = (e) => {
            if (e.target.id === 'photo-modal' || e.target.classList.contains('close-modal')) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        };
    }

    const fullImg = document.getElementById('full-img');
    fullImg.src = url;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling
}


