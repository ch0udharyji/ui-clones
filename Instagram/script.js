// Mock Data
const usersData = [
    { username: 'john_doe', img: 'https://randomuser.me/api/portraits/men/12.jpg', name: 'John Doe' },
    { username: 'jane_smith', img: 'https://randomuser.me/api/portraits/women/22.jpg', name: 'Jane Smith' },
    { username: 'alex_photo', img: 'https://randomuser.me/api/portraits/men/33.jpg', name: 'Alex Photography' },
    { username: 'sarah_travels', img: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Sarah Travels' }
];

const postsData = [
    {
        user: usersData[0],
        img: 'https://picsum.photos/600/600?random=1',
        likes: 142,
        caption: 'Beautiful day outside! ☀️',
        comments: 12,
        time: '2 HOURS AGO'
    },
    {
        user: usersData[1],
        img: 'https://picsum.photos/600/600?random=2',
        likes: 89,
        caption: 'Coffee time ☕️',
        comments: 5,
        time: '4 HOURS AGO'
    },
    {
        user: usersData[2],
        img: 'https://picsum.photos/600/600?random=3',
        likes: 342,
        caption: 'Just bought a new camera lens! #photography',
        comments: 42,
        time: '1 DAY AGO'
    }
];

const reelsData = [
    { user: usersData[1], img: 'https://picsum.photos/450/800?random=11', caption: 'Making my morning coffee ☕ #coffeelover #morning' },
    { user: usersData[2], img: 'https://picsum.photos/450/800?random=12', caption: 'Behind the scenes photoshoot 📸 #bts' },
    { user: usersData[3], img: 'https://picsum.photos/450/800?random=13', caption: 'Travel diary: Day 1 in Tokyo 🗼 #travel' }
];

// DOM Elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const navLinks = document.querySelectorAll('.nav-links a[data-view]');
const panelLinks = document.querySelectorAll('.nav-links a[data-panel]');
const viewSections = document.querySelectorAll('.view-section');
const slidePanels = document.querySelectorAll('.slide-panel');

// Navigation Logic
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = link.getAttribute('data-view');
        
        // Reset state
        closeAllPanels();
        sidebar.classList.remove('shrunk');
        mainContent.classList.remove('expanded');
        
        // Update active nav
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show target view
        viewSections.forEach(section => section.style.display = 'none');
        document.getElementById(`view-${targetView}`).style.display = targetView === 'home' || targetView === 'explore' || targetView === 'messages' ? 'flex' : 'block';
    });
});

panelLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPanelId = `${link.getAttribute('data-panel')}-panel`;
        const panel = document.getElementById(targetPanelId);
        
        if (panel.classList.contains('active')) {
            // Close it
            closeAllPanels();
            sidebar.classList.remove('shrunk');
            mainContent.classList.remove('expanded');
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            document.querySelector('.nav-links a[data-view="home"]').classList.add('active'); // fallback
        } else {
            // Open it
            closeAllPanels();
            panel.classList.add('active');
            sidebar.classList.add('shrunk');
            mainContent.classList.add('expanded');
            
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            if (targetPanelId === 'search-panel') populateSearch();
            if (targetPanelId === 'notifications-panel') populateNotifications();
        }
    });
});

function closeAllPanels() {
    slidePanels.forEach(p => p.classList.remove('active'));
}

// Create Post Modal
document.getElementById('nav-create').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('create-modal').style.display = 'flex';
});

// Rendering Functions
function renderHomeFeed() {
    const storiesContainer = document.getElementById('stories-container');
    storiesContainer.innerHTML = '';
    // Only 4 users for stories
    for (let i = 0; i < 4; i++) {
        const u = usersData[i];
        storiesContainer.innerHTML += `
            <div class="story" onclick="openStory(${i})">
                <div class="story-ring">
                    <img src="${u.img}" alt="${u.username}">
                </div>
                <span>${u.username}</span>
            </div>
        `;
    }

    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    postsData.forEach(post => {
        postsContainer.innerHTML += `
            <div class="post">
                <div class="post-header">
                    <img src="${post.user.img}" alt="User">
                    <span class="username">${post.user.username}</span>
                    <span class="time">• ${post.time}</span>
                    <span class="material-icons more-icon">more_horiz</span>
                </div>
                <div class="post-image">
                    <img src="${post.img}" alt="Post">
                </div>
                <div class="post-actions">
                    <span class="material-icons-outlined" onclick="toggleLike(this)">favorite_border</span>
                    <span class="material-icons-outlined">chat_bubble_outline</span>
                    <span class="material-icons-outlined">send</span>
                    <span class="material-icons-outlined bookmark-icon">bookmark_border</span>
                </div>
                <div class="post-likes">${post.likes.toLocaleString()} likes</div>
                <div class="post-caption">
                    <span class="username">${post.user.username}</span> ${post.caption}
                </div>
                <div class="post-comments-count">View all ${post.comments} comments</div>
                <div class="post-add-comment">
                    <span class="material-icons-outlined emoji-icon">mood</span>
                    <input type="text" placeholder="Add a comment..." onkeyup="togglePostBtn(this)">
                    <button>Post</button>
                </div>
            </div>
        `;
    });

    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = '';
    usersData.forEach(user => {
        suggestionsContainer.innerHTML += `
            <div class="suggestion-item">
                <img src="${user.img}" alt="User">
                <div class="suggestion-info">
                    <div class="username">${user.username}</div>
                    <div class="reason">Suggested for you</div>
                </div>
                <button class="follow-btn">Follow</button>
            </div>
        `;
    });
}

function renderExplore() {
    const grid = document.getElementById('explore-grid');
    grid.innerHTML = '';
    for (let i = 1; i <= 15; i++) {
        const likes = Math.floor(Math.random() * 1000) + 50;
        const comments = Math.floor(Math.random() * 100) + 5;
        grid.innerHTML += `
            <div class="grid-item" onclick="openPostViewer('https://picsum.photos/400/400?random=${i + 100}', ${likes})">
                <img src="https://picsum.photos/400/400?random=${i + 100}" loading="lazy">
                <div class="grid-overlay">
                    <div class="grid-overlay-stat"><span class="material-icons">favorite</span> ${likes}</div>
                    <div class="grid-overlay-stat"><span class="material-icons">chat_bubble</span> ${comments}</div>
                </div>
            </div>
        `;
    }
}

function renderReels() {
    const container = document.getElementById('reels-container');
    container.innerHTML = '';
    reelsData.forEach(reel => {
        container.innerHTML += `
            <div class="reel-item">
                <div class="reel-video-container">
                    <img src="${reel.img}" alt="Reel Video">
                    <div class="reel-info-overlay">
                        <div class="reel-user-info">
                            <img src="${reel.user.img}">
                            <span>${reel.user.username}</span>
                            <button>Follow</button>
                        </div>
                        <div class="reel-caption">${reel.caption}</div>
                        <div style="display: flex; align-items: center; gap: 5px; font-size: 12px; margin-top: 5px;">
                            <span class="material-icons" style="font-size: 14px;">music_note</span> Original Audio
                        </div>
                    </div>
                </div>
                <div class="reel-actions">
                    <div class="reel-action"><span class="material-icons-outlined" onclick="toggleLike(this)">favorite_border</span><span>${Math.floor(Math.random()*500 + 100)}k</span></div>
                    <div class="reel-action"><span class="material-icons-outlined">chat_bubble_outline</span><span>${Math.floor(Math.random()*5000)}</span></div>
                    <div class="reel-action"><span class="material-icons-outlined">send</span></div>
                    <div class="reel-action"><span class="material-icons-outlined">bookmark_border</span></div>
                    <div class="reel-action"><span class="material-icons">more_horiz</span></div>
                </div>
            </div>
        `;
    });
}

function renderProfile() {
    const grid = document.getElementById('profile-grid');
    grid.innerHTML = '';
    for (let i = 1; i <= 12; i++) {
        const likes = Math.floor(Math.random() * 500) + 20;
        const comments = Math.floor(Math.random() * 50) + 2;
        grid.innerHTML += `
            <div class="grid-item" onclick="openPostViewer('https://picsum.photos/400/400?random=${i + 200}', ${likes})">
                <img src="https://picsum.photos/400/400?random=${i + 200}" loading="lazy">
                <div class="grid-overlay">
                    <div class="grid-overlay-stat"><span class="material-icons">favorite</span> ${likes}</div>
                    <div class="grid-overlay-stat"><span class="material-icons">chat_bubble</span> ${comments}</div>
                </div>
            </div>
        `;
    }
}

function renderMessages() {
    const list = document.getElementById('messages-list');
    list.innerHTML = '';
    usersData.forEach(user => {
        list.innerHTML += `
            <div class="message-thread">
                <img src="${user.img}" alt="User">
                <div class="message-thread-info">
                    <span class="username">${user.username}</span>
                    <span class="preview">Active ${Math.floor(Math.random()*12 + 1)}h ago</span>
                </div>
            </div>
        `;
    });
}

function populateSearch() {
    const list = document.getElementById('search-results');
    list.innerHTML = '';
    usersData.forEach(user => {
        list.innerHTML += `
            <div class="panel-item">
                <img src="${user.img}" alt="User">
                <div class="panel-item-info">
                    <div class="title">${user.username}</div>
                    <div class="subtitle">${user.name}</div>
                </div>
            </div>
        `;
    });
}

function populateNotifications() {
    const list = document.getElementById('notifications-list');
    list.innerHTML = `
        <h3 style="font-size: 16px; margin: 10px 24px;">Today</h3>
        <div class="panel-item">
            <img src="${usersData[0].img}" alt="User">
            <div class="panel-item-info">
                <span style="font-weight:600;">${usersData[0].username}</span> started following you. <span style="color:#8e8e8e">2h</span>
            </div>
            <button style="background:var(--primary-color); color:white; border:none; padding:6px 16px; border-radius:8px; font-weight:600; cursor:pointer;">Follow</button>
        </div>
        <div class="panel-item">
            <img src="${usersData[1].img}" alt="User">
            <div class="panel-item-info">
                <span style="font-weight:600;">${usersData[1].username}</span> liked your photo. <span style="color:#8e8e8e">4h</span>
            </div>
            <img src="https://picsum.photos/400/400?random=201" style="width:44px; height:44px; border-radius:0; margin-right:0; margin-left:10px;">
        </div>
    `;
}

// Interactive Functions
window.toggleLike = function(icon) {
    if (icon.innerText === 'favorite_border') {
        icon.innerText = 'favorite';
        icon.style.color = '#ed4956';
    } else {
        icon.innerText = 'favorite_border';
        icon.style.color = 'inherit';
    }
};

window.togglePostBtn = function(input) {
    const btn = input.nextElementSibling;
    if (input.value.trim().length > 0) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
};

window.openPostViewer = function(imgSrc, likes) {
    document.getElementById('post-view-modal').style.display = 'flex';
    document.getElementById('pv-img').src = imgSrc;
    document.getElementById('pv-likes').innerText = `${likes.toLocaleString()} likes`;
    
    // Mock user for post
    const u = usersData[Math.floor(Math.random() * usersData.length)];
    document.getElementById('pv-user-img').src = u.img;
    document.getElementById('pv-username').innerText = u.username;
    
    // Mock comments
    const commentsContainer = document.getElementById('pv-comments');
    commentsContainer.innerHTML = `
        <div class="comment">
            <img src="${u.img}">
            <div class="comment-text">
                <span class="username">${u.username}</span> Beautiful! ❤️
                <div class="comment-meta">
                    <span>1d</span>
                    <span style="font-weight:600; cursor:pointer;">Reply</span>
                </div>
            </div>
        </div>
        <div class="comment">
            <img src="${usersData[0].img}">
            <div class="comment-text">
                <span class="username">${usersData[0].username}</span> Wow this looks amazing!
                <div class="comment-meta">
                    <span>14h</span>
                    <span style="font-weight:600; cursor:pointer;">Reply</span>
                </div>
            </div>
        </div>
    `;
};

// Stories Logic
let currentStoryIndex = 0;
let storyTimer;

window.openStory = function(index) {
    currentStoryIndex = index;
    document.getElementById('story-modal').style.display = 'flex';
    renderStory();
};

window.closeStory = function() {
    document.getElementById('story-modal').style.display = 'none';
    clearTimeout(storyTimer);
};

window.changeStory = function(dir) {
    currentStoryIndex += dir;
    if (currentStoryIndex < 0) currentStoryIndex = 0;
    if (currentStoryIndex >= 4) {
        closeStory();
        return;
    }
    renderStory();
};

function renderStory() {
    clearTimeout(storyTimer);
    
    // Update Progress bars
    const progContainer = document.getElementById('story-progress-container');
    progContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        let stateClass = '';
        if (i < currentStoryIndex) stateClass = 'completed';
        else if (i === currentStoryIndex) stateClass = 'active';
        
        progContainer.innerHTML += `
            <div class="story-progress-bar ${stateClass}">
                <div class="fill"></div>
            </div>
        `;
    }
    
    const u = usersData[currentStoryIndex];
    document.getElementById('story-user-img').src = u.img;
    document.getElementById('story-username').innerText = u.username;
    document.getElementById('story-time').innerText = '2h';
    document.getElementById('story-image').src = `https://picsum.photos/450/800?random=${currentStoryIndex + 50}`;
    
    // Auto advance
    storyTimer = setTimeout(() => {
        changeStory(1);
    }, 5000);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderHomeFeed();
    renderExplore();
    renderReels();
    renderProfile();
    renderMessages();
});
