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

document.addEventListener("DOMContentLoaded", () => {
    renderStories();
    renderPosts();
    renderSuggestions();
    setupModal();
    setupStoryViewer();
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
