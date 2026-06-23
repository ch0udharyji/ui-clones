const postsData = [
    {
        id: 1,
        username: "johndoe",
        userImage: "https://i.pravatar.cc/150?img=12",
        time: "2h",
        image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
        likes: "1,234",
        caption: "Beautiful sunset at the beach today! 🌅 #sunset #beach",
        comments: 42
    },
    {
        id: 2,
        username: "traveler_101",
        userImage: "https://i.pravatar.cc/150?img=33",
        time: "5h",
        image: "https://images.unsplash.com/photo-1682687982501-1e58f813222a",
        likes: "8,942",
        caption: "Exploring the mountains. Nature is amazing. ⛰️",
        comments: 128
    },
    {
        id: 3,
        username: "foodie_delight",
        userImage: "https://i.pravatar.cc/150?img=44",
        time: "8h",
        image: "https://images.unsplash.com/photo-1546069901-ba9590a1a70c",
        likes: "567",
        caption: "Best pasta in town! 🍝 #foodie",
        comments: 15
    }
];

const storiesData = [
    { username: "jane_smith", img: "https://i.pravatar.cc/150?img=20" },
    { username: "mike_ross", img: "https://i.pravatar.cc/150?img=13" },
    { username: "sara_connor", img: "https://i.pravatar.cc/150?img=14" },
    { username: "alex_hunter", img: "https://i.pravatar.cc/150?img=15" },
    { username: "emily_blunt", img: "https://i.pravatar.cc/150?img=16" },
    { username: "chris_evans", img: "https://i.pravatar.cc/150?img=17" }
];

const suggestionsData = [
    { username: "nature_lover", img: "https://i.pravatar.cc/150?img=50", reason: "Followed by johndoe + 2 more" },
    { username: "tech_guru", img: "https://i.pravatar.cc/150?img=51", reason: "New to Instagram" },
    { username: "art_daily", img: "https://i.pravatar.cc/150?img=52", reason: "Suggested for you" },
    { username: "fitness_freak", img: "https://i.pravatar.cc/150?img=53", reason: "Follows you" },
    { username: "music_vibes", img: "https://i.pravatar.cc/150?img=54", reason: "Suggested for you" }
];

document.addEventListener("DOMContentLoaded", () => {
    renderStories();
    renderPosts();
    renderSuggestions();
});

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
