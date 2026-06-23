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
        