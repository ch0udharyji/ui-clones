const postsData = [
    {
        id: 1,
        username: "johndoe",
        userImage: "https://randomuser.me/api/portraits/men/12.jpg",
        time: "2h",
        image: "https://picsum.photos/600/600?random=1",
        likes: "1,234",
        caption: "Beautiful sunset at the beach today! 🌅 #sunset #beach",
        comments: 42
    },
    {
        id: 2,
        username: "traveler_101",
        userImage: "https://randomuser.me/api/portraits/men/33.jpg",
        time: "5h",
        image: "https://picsum.photos/600/600?random=2",
        likes: "8,942",
        caption: "Exploring the mountains. Nature is amazing. ⛰️",
        comments: 128
    },
    {
        id: 3,
        username: "foodie_delight",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        time: "8h",
        image: "https://picsum.photos/600/600?random=3",
        likes: "567",
        caption: "Best pasta in town! 🍝 #foodie",
        comments: 15
    }
];

const storiesData = [
    { username: "jane_smith", img: "https://randomuser.me/api/portraits/women/20.jpg", storyImg: "https://picsum.photos/450/800?random=11" },
    { username: "mike_ross", img: "https://randomuser.me/api/portraits/men/13.jpg", storyImg: "https://picsum.photos/450/800?random=12" },
    { username: "sara_connor", img: "https://randomuser.me/api/portraits/women/14.jpg", storyImg: "https://picsum.photos/450/800?random=13" },
    { username: "alex_hunter", img: "https://randomuser.me/api/portraits/men/15.jpg", storyImg: "https://picsum.photos/450/800?random=14" }
];

const suggestionsData = [
    { username: "nature_lover", img: "https://randomuser.me/api/portraits/women/50.jpg", reason: "Followed by johndoe + 2 more" },
    { username: "tech_guru", img: "https://randomuser.me/api/portraits/men/51.jpg", reason: "New to Instagram" },
    { username: "art_daily", img: "https://randomuser.me/api/portraits/women/52.jpg", reason: "Suggested for you" },
    { username: "fitness_freak", img: "https://randomuser.me/api/portraits/men/53.jpg", reason: "Follows you" },
    { username: "music_vibes", img: "https://randomuser.me/api/portraits/women/54.jpg", reason: "Suggested for you" }
];

const usersData = [
    { username: "billudev", fullname: "Billu Dev", img: "https://randomuser.me/api/portraits/men/11.jpg" },
    { username: "john_doe", fullname: "John Doe", img: "https://randomuser.me/api/portraits/men/12.jpg" },
    { username: "jane_smith", fullname: "Jane Smith", img: "https://randomuser.me/api/portraits/women/20.jpg" },
    { username: "mike_ross", fullname: "Mike Ross", img: "https://randomuser.me/api/portraits/men/13.jpg" },
    { username: "sara_connor", fullname: "Sara Connor", img: "https://randomuser.me/api/portraits/women/14.jpg" },
    { username: "tech_guru", fullname: "Tech Guru", img: "https://randomuser.me/api/portraits/men/51.jpg" },
    { username: "art_daily", fullname: "Art Daily", img: "https://randomuser.me/api/portraits/women/52.jpg" }
];

const exploreData = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    image: `https://picsum.photos/400/400?random=${i + 100}`,
    likes: Math.floor(Math.random() * 10000) + 100,
    comments: Math.floor(Math.random() * 1000) + 10
}));

document.addEventListener("DOMContentLoaded", () => {
    renderStories();
    renderPosts();
    renderSuggestions();
    setupModal();
    setupStoryViewer();
    setupSearchPanel();
    setupViews();
    setupNotifications();
    setupPostViewModal();
});

function setupModal() {
    const createBtn = document.getElementById("create-post-btn");
    const modal = document.getElementById("create-modal");
    const closeBtn = document.getElementById("close-modal-btn");

    if (createBtn && modal && closeBtn) {
        createBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "flex";
        });

        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Close when clicking outside of modal content
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
}

function renderStories() {
    const storiesContainer = document.querySelector(".stories-container");
    
    storiesData.forEach((story, index) => {
        const storyEl = document.createElement("div");
        storyEl.classList.add("story");
        storyEl.dataset.index = index;
        storyEl.innerHTML = `
            <div class="story-ring">
                <img src="${story.img}" alt="${story.username}">
            </div>
            <span class="story-user">${story.username}</span>
        `;
        storiesContainer.appendChild(storyEl);
    });
}

function renderPosts() {
    const postsContainer = document.querySelector(".posts-feed");
    
    postsData.forEach(post => {
        const postEl = document.createElement("article");
        postEl.classList.add("post");
        postEl.innerHTML = `
            <div class="post-header">
                <div class="post-user-info">
                    <img src="${post.userImage}" alt="${post.username}">
                    <div class="post-user-details">
                        <span class="username">${post.username}</span>
                        <span class="time">• ${post.time}</span>
                    </div>
                </div>
                <div class="post-more">
                    <span class="material-icons-outlined">more_horiz</span>
                </div>
            </div>
            <img src="${post.image}" alt="Post image" class="post-image">
            <div class="post-actions">
                <div class="action-left">
                    <span class="material-icons-outlined like-btn">favorite_border</span>
                    <span class="material-icons-outlined">chat_bubble_outline</span>
                    <span class="material-icons-outlined">send</span>
                </div>
                <div class="action-right">
                    <span class="material-icons-outlined">bookmark_border</span>
                </div>
            </div>
            <div class="post-likes">${post.likes} likes</div>
            <div class="post-caption">
                <span class="username">${post.username}</span> ${post.caption}
            </div>
            <div class="post-comments-count">View all ${post.comments} comments</div>
            <div class="add-comment">
                <input type="text" placeholder="Add a comment...">
                <button class="post-btn">Post</button>
            </div>
        `;
        
        // Add like functionality
        const likeBtn = postEl.querySelector('.like-btn');
        likeBtn.addEventListener('click', function() {
            if (this.textContent === 'favorite_border') {
                this.textContent = 'favorite';
                this.style.color = '#ed4956';
                this.classList.remove('material-icons-outlined');
                this.classList.add('material-icons');
            } else {
                this.textContent = 'favorite_border';
                this.style.color = '';
                this.classList.add('material-icons-outlined');
                this.classList.remove('material-icons');
            }
        });

        postsContainer.appendChild(postEl);
    });
}

function renderSuggestions() {
    const suggestionsList = document.querySelector(".suggestions-list");
    
    suggestionsData.forEach(suggestion => {
        const sugEl = document.createElement("div");
        sugEl.classList.add("suggestion-item");
        sugEl.innerHTML = `
            <img src="${suggestion.img}" alt="${suggestion.username}">
            <div class="suggestion-info">
                <span class="username">${suggestion.username}</span>
                <span class="reason">${suggestion.reason}</span>
            </div>
            <button class="follow-btn">Follow</button>
        `;
        suggestionsList.appendChild(sugEl);
    });
}

function setupStoryViewer() {
    const viewer = document.getElementById('story-viewer');
    const closeBtn = document.getElementById('close-story-btn');
    const userImg = document.getElementById('story-user-img');
    const userName = document.getElementById('story-user-name');
    const contentImg = document.getElementById('story-content-img');
    const progressFill = document.getElementById('story-progress-fill');
    
    const prevNav = document.getElementById('story-nav-prev');
    const nextNav = document.getElementById('story-nav-next');
    
    let currentStoryIndex = 0;
    let storyTimeout;
    let progressInterval;
    const STORY_DURATION = 3000; // 3 seconds per story

    // Add click listeners to all stories
    document.querySelector('.stories-container').addEventListener('click', (e) => {
        const storyEl = e.target.closest('.story');
        if (storyEl) {
            if (storyEl.dataset.index !== undefined) {
                openStory(parseInt(storyEl.dataset.index));
            } else {
                // Handle "Your story" click
                openStory(-1);
            }
        }
    });

    closeBtn.addEventListener('click', closeStory);

    prevNav.addEventListener('click', () => {
        if (currentStoryIndex > -1) {
            openStory(currentStoryIndex - 1);
        }
    });

    nextNav.addEventListener('click', () => {
        if (currentStoryIndex < storiesData.length - 1) {
            openStory(currentStoryIndex + 1);
        } else {
            closeStory();
        }
    });

    function openStory(index) {
        currentStoryIndex = index;
        viewer.style.display = 'flex';
        resetProgress();
        
        let story;
        if (index === -1) {
            // Your story mockup
            story = {
                username: "Your story",
                img: "https://randomuser.me/api/portraits/men/11.jpg",
                storyImg: "https://picsum.photos/450/800?random=10"
            };
        } else {
            story = storiesData[index];
        }

        userImg.src = story.img;
        userName.textContent = story.username;
        contentImg.src = story.storyImg;

        startProgress();
    }

    function closeStory() {
        viewer.style.display = 'none';
        clearTimeout(storyTimeout);
        clearInterval(progressInterval);
    }

    function resetProgress() {
        clearTimeout(storyTimeout);
        clearInterval(progressInterval);
        progressFill.style.width = '0%';
    }

    function startProgress() {
        let startTime = Date.now();
        
        progressInterval = setInterval(() => {
            let elapsed = Date.now() - startTime;
            let percentage = (elapsed / STORY_DURATION) * 100;
            if (percentage >= 100) percentage = 100;
            progressFill.style.width = percentage + '%';
        }, 16);

        storyTimeout = setTimeout(() => {
            clearInterval(progressInterval);
            // Move to next story automatically
            if (currentStoryIndex < storiesData.length - 1) {
                openStory(currentStoryIndex + 1);
            } else {
                closeStory();
            }
        }, STORY_DURATION);
    }
}

function setupSearchPanel() {
    const searchNavBtn = document.getElementById('search-nav-btn');
    const searchPanel = document.getElementById('search-panel');
    const sidebar = document.querySelector('.sidebar');
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const searchResultsList = document.getElementById('search-results-list');
    const recentText = document.querySelector('.recent-text');
    const clearAllText = document.getElementById('clear-all-search');
    
    let isSearchOpen = false;

    // Toggle search panel
    searchNavBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isSearchOpen = !isSearchOpen;
        
        if (isSearchOpen) {
            searchPanel.classList.add('active');
            sidebar.classList.add('shrunk');
            renderSearchResults(''); // Show recent by default
        } else {
            searchPanel.classList.remove('active');
            sidebar.classList.remove('shrunk');
        }
    });

    // Handle input filtering
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length > 0) {
            clearSearchBtn.style.display = 'block';
            recentText.style.display = 'none';
            clearAllText.style.display = 'none';
            renderSearchResults(query);
        } else {
            clearSearchBtn.style.display = 'none';
            recentText.style.display = 'inline';
            clearAllText.style.display = 'inline';
            renderSearchResults(''); // Show recent
        }
    });

    // Clear search input
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        recentText.style.display = 'inline';
        clearAllText.style.display = 'inline';
        renderSearchResults('');
        searchInput.focus();
    });

    // Close search panel when clicking outside
    document.addEventListener('click', (e) => {
        if (isSearchOpen && !searchPanel.contains(e.target) && !searchNavBtn.contains(e.target)) {
            isSearchOpen = false;
            searchPanel.classList.remove('active');
            sidebar.classList.remove('shrunk');
        }
    });

    function renderSearchResults(query) {
        searchResultsList.innerHTML = '';
        
        let results = [];
        if (query === '') {
            // Mock "Recent" searches
            results = usersData.slice(0, 3);
        } else {
            // Filter users based on query
            results = usersData.filter(user => 
                user.username.toLowerCase().includes(query) || 
                user.fullname.toLowerCase().includes(query)
            );
        }

        if (results.length === 0) {
            searchResultsList.innerHTML = '<div style="color: var(--text-secondary); text-align: center; margin-top: 20px;">No results found.</div>';
            return;
        }

        results.forEach(user => {
            const item = document.createElement('div');
            item.classList.add('search-result-item');
            
            let removeBtnHtml = query === '' ? '<span class="material-icons-outlined remove-recent">close</span>' : '';

            item.innerHTML = `
                <img src="${user.img}" alt="${user.username}">
                <div class="search-result-info">
                    <span class="username">${user.username}</span>
                    <span class="fullname">${user.fullname}</span>
                </div>
                ${removeBtnHtml}
            `;
            searchResultsList.appendChild(item);
        });
    }
}

function setupViews() {
    const navs = {
        'home': { btn: document.getElementById('home-nav-btn'), view: document.getElementById('home-view'), showSidebar: true },
        'explore': { btn: document.getElementById('explore-nav-btn'), view: document.getElementById('explore-view'), showSidebar: false },
        'reels': { btn: document.getElementById('reels-nav-btn'), view: document.getElementById('reels-view'), showSidebar: false },
        'messages': { btn: document.getElementById('messages-nav-btn'), view: document.getElementById('messages-view'), showSidebar: false },
        'profile': { btn: document.getElementById('profile-nav-btn'), view: document.getElementById('profile-view'), showSidebar: false }
    };
    const rightSidebar = document.getElementById('right-sidebar');
    const exploreGrid = document.getElementById('explore-grid');
    const profileGrid = document.getElementById('profile-grid');
    const reelsContainer = document.getElementById('reels-view');
    const messagesList = document.getElementById('messages-list');

    // 1. Render Explore
    exploreData.forEach(item => {
        const itemEl = createGridItem(item);
        exploreGrid.appendChild(itemEl);
    });

    // 2. Render Profile Grid (reusing explore data for simplicity)
    exploreData.slice(0, 18).forEach(item => {
        const itemEl = createGridItem(item);
        profileGrid.appendChild(itemEl);
    });

    // 3. Render Reels
    exploreData.slice(0, 5).forEach(item => {
        const reel = document.createElement('div');
        reel.classList.add('reel-item');
        reel.innerHTML = `
            <div class="reel-video-container">
                <img src="https://picsum.photos/400/800?random=${item.id + 200}" alt="Reel">
                <div class="reel-actions">
                    <div class="reel-action"><span class="material-icons-outlined">favorite_border</span><span>${formatNumber(item.likes)}</span></div>
                    <div class="reel-action"><span class="material-icons-outlined">chat_bubble_outline</span><span>${formatNumber(item.comments)}</span></div>
                    <div class="reel-action"><span class="material-icons-outlined">send</span></div>
                    <div class="reel-action"><span class="material-icons-outlined">bookmark_border</span></div>
                    <div class="reel-action"><span class="material-icons-outlined">more_horiz</span></div>
                </div>
            </div>
        `;
        reelsContainer.appendChild(reel);
    });

    // 4. Render Messages
    usersData.forEach(user => {
        const msg = document.createElement('div');
        msg.classList.add('message-thread');
        msg.innerHTML = `
            <img src="${user.img}" alt="${user.username}">
            <div class="message-thread-info">
                <span class="username">${user.fullname}</span>
                <span class="preview">Active ${Math.floor(Math.random() * 12) + 1}h ago</span>
            </div>
        `;
        messagesList.appendChild(msg);
    });

    // Handle navigation logic
    Object.keys(navs).forEach(key => {
        navs[key].btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Turn off all
            Object.values(navs).forEach(n => {
                n.btn.classList.remove('active');
                n.view.style.display = 'none';
                
                // Swap icons to outlined
                if(n.btn.id !== 'profile-nav-btn') {
                    const icon = n.btn.querySelector('.material-icons, .material-icons-outlined');
                    if(icon) icon.className = 'material-icons-outlined';
                }
            });

            // Turn on active
            navs[key].btn.classList.add('active');
            
            if(navs[key].btn.id !== 'profile-nav-btn') {
                const icon = navs[key].btn.querySelector('.material-icons, .material-icons-outlined');
                if(icon) icon.className = 'material-icons';
            }

            if (key === 'reels') {
                navs[key].view.style.display = 'flex'; // reels uses flex column
            } else if (key === 'messages') {
                navs[key].view.style.display = 'flex'; // messages uses flex row
            } else {
                navs[key].view.style.display = 'block';
            }

            rightSidebar.style.display = navs[key].showSidebar ? 'block' : 'none';
        });
    });

    function createGridItem(item) {
        const itemEl = document.createElement('div');
        itemEl.classList.add('explore-item');
        itemEl.innerHTML = `
            <img src="${item.image}" alt="Grid Image" loading="lazy">
            <div class="explore-overlay">
                <div class="explore-stat"><span class="material-icons">favorite</span><span>${formatNumber(item.likes)}</span></div>
                <div class="explore-stat"><span class="material-icons">chat_bubble</span><span>${formatNumber(item.comments)}</span></div>
            </div>
        `;
        
        // Add click listener to open post modal
        itemEl.addEventListener('click', () => {
            if (window.openPostViewModal) {
                window.openPostViewModal(item);
            }
        });
        
        return itemEl;
    }
}

function setupPostViewModal() {
    const postModal = document.getElementById('post-view-modal');
    const closeBtn = document.getElementById('close-post-view-btn');
    const postImg = document.getElementById('post-view-img');
    const postLikes = document.getElementById('post-view-likes');

    // Make function available globally so grid items can call it
    window.openPostViewModal = function(item) {
        postImg.src = item.image;
        postLikes.textContent = `${formatNumber(item.likes)} likes`;
        postModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    closeBtn.addEventListener('click', () => {
        postModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    postModal.addEventListener('click', (e) => {
        if (e.target === postModal) {
            postModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

function setupNotifications() {
    const notifBtn = document.getElementById('notifications-nav-btn');
    const notifPanel = document.getElementById('notifications-panel');
    const sidebar = document.querySelector('.sidebar');
    const notifList = document.getElementById('notifications-list');
    
    let isNotifOpen = false;

    // Render dummy notifications
    usersData.forEach((user, idx) => {
        const item = document.createElement('div');
        item.classList.add('notification-item');
        const action = idx % 2 === 0 ? 'started following you. 2d' : 'liked your photo. 5d';
        const btnHtml = idx % 2 === 0 ? '<button class="notification-btn">Follow</button>' : `<img src="https://picsum.photos/44/44?random=${idx}" style="border-radius:0;">`;
        
        item.innerHTML = `
            <img src="${user.img}" alt="${user.username}">
            <div class="notification-info">
                <span class="username">${user.username}</span> ${action}
            </div>
            ${btnHtml}
        `;
        notifList.appendChild(item);
    });

    notifBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isNotifOpen = !isNotifOpen;
        
        if (isNotifOpen) {
            notifPanel.classList.add('active');
            sidebar.classList.add('shrunk');
        } else {
            notifPanel.classList.remove('active');
            sidebar.classList.remove('shrunk');
        }
    });

    document.addEventListener('click', (e) => {
        if (isNotifOpen && !notifPanel.contains(e.target) && !notifBtn.contains(e.target)) {
            isNotifOpen = false;
            notifPanel.classList.remove('active');
            sidebar.classList.remove('shrunk');
        }
    });
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
}
