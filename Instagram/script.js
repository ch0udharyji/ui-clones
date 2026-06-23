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
    { username: "jane_smith", img: "https://randomuser.me/api/portraits/women/20.jpg" },
    { username: "mike_ross", img: "https://randomuser.me/api/portraits/men/13.jpg" },
    { username: "sara_connor", img: "https://randomuser.me/api/portraits/women/14.jpg" },
    { username: "alex_hunter", img: "https://randomuser.me/api/portraits/men/15.jpg" },
    { username: "emily_blunt", img: "https://randomuser.me/api/portraits/women/16.jpg" },
    { username: "chris_evans", img: "https://randomuser.me/api/portraits/men/17.jpg" }
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
    
    storiesData.forEach(story => {
        const storyEl = document.createElement("div");
        storyEl.classList.add("story");
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
