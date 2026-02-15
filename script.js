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

// Load Data
onSnapshot(query(collection(db, "projects"), orderBy("createdAt", "desc")), (snapshot) => {
    console.log("Database connection successful!"); // Checkpoint 1
    
    if (!projectContainer) {
        console.error("Error: Could not find project-container in HTML!"); // Checkpoint 2
        return;
    }

    if (snapshot.empty) {
        console.warn("Database is empty or collection name is wrong."); // Checkpoint 3
        projectContainer.innerHTML = "<p>No projects found in database.</p>";
        return;
    }
    const projects = [];
snapshot.forEach(doc => projects.push(doc.data()));

// 2. Sort: Normal projects first (isExtra: false), Extra projects last (isExtra: true)
projects.sort((a, b) => (a.isExtra === b.isExtra) ? 0 : a.isExtra ? 1 : -1);

// 3. Clear and Render
projectContainer.innerHTML = ""; 

projects.forEach((data) => {
    const projectHTML = `
        <div class="project ${data.isWide ? 'wide' : ''} ${data.isExtra ? 'extra-project' : ''}">
            <img src="${data.imageUrl}" alt="${data.title}" class="project-img">
            <div class="project-info">
                <h3>${data.title}</h3>
                <p>${data.subtitle}</p>
            </div>
        </div>
    `;
    projectContainer.insertAdjacentHTML('beforeend', projectHTML);
});

   projectContainer.innerHTML = ""; 

// 2. Convert snapshot to an array so we can sort it
const projectsArray = [];
snapshot.forEach(doc => projectsArray.push(doc.data()));

// 3. SORT: Move items where isExtra is true to the end
projectsArray.sort((a, b) => {
    return (a.isExtra === b.isExtra) ? 0 : a.isExtra ? 1 : -1;
});

// 4. Now run your loop on the SORTED array
projectsArray.forEach((data) => {
    const projectHTML = `
        <div class="project ${data.isWide ? 'wide' : ''} ${data.isExtra ? 'extra-project' : ''}">
            <img src="${data.imageUrl}" alt="${data.title}" class="project-img">
            <div class="project-info">
                <h3>${data.title}</h3>
                <p>${data.subtitle}</p>
            </div>
        </div>
    `;
    projectContainer.insertAdjacentHTML('beforeend', projectHTML);
});

    setupLightbox();
});
// Lightbox logic
function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    document.querySelectorAll(".project-img").forEach(img => {
        img.onclick = () => {
            lightboxImg.src = img.getAttribute("data-full");
            lightbox.style.display = "flex";
            document.body.style.overflow = "hidden";
        };
    });
}

// Global Close for Lightbox
const closeBtn = document.querySelector(".close");
if (closeBtn) {
    closeBtn.onclick = () => {
        document.getElementById("lightbox").style.display = "none";
        document.body.style.overflow = "auto";
    };
}
const loadMoreBtn = document.getElementById('loadMoreBtn');

if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
        console.log("Load More clicked!"); // Check your F12 console for this!
        
        const extraProjects = document.querySelectorAll('.extra-project');
        
        if (extraProjects.length === 0) {
            alert("No extra projects found in the database yet.");
        } else {
            extraProjects.forEach(p => {
                p.classList.add('show');
            });
            loadMoreBtn.style.display = 'none'; // Hide button after showing everything
        }
    };
}
if (userEntry === SECRET_PASSWORD) {
    document.body.classList.add('authorized');
} else {
    window.location.href = "index.html";
}


