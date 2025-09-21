const postsData = [
    {
        id: 1,
        title: "Exploring React Basics",
        category: "Tech",
        description: "An introduction to React components, props, and state.",
        date: "2025-09-20",
        image: "react.png"
    },
    {
        id: 2,
        title: "My Trip to Paris",
        category: "Travel",
        description: "A travel diary of my adventures in Paris.",
        date: "2025-09-15",
        image: "Eiffel Tower.jpg"
    },
    {
        id: 3,
        title: "Healthy Breakfast Ideas",
        category: "Food",
        description: "Simple and delicious breakfast recipes to start your day.",
        date: "2025-09-10",
        image: "healthy breakfast.jpg"
    },
    {
        id: 4,
        title: "Mastering JavaScript",
        category: "Tech",
        description: "Deep dive into JavaScript concepts and ES6 features.",
        date: "2025-09-05",
        image: "javascript.png"
    },
    {
        id: 5,
        title: "Exploring Egypt",
        category: "Travel",
        description: "Discovering the wonders of pyramids and Nile river.",
        date: "2025-09-01",
        image: "Pyramids.jpg"
    },
    {
        id: 6,
        title: "Street Food Around the World",
        category: "Food",
        description: "Tasting delicious street food from Asia to Europe.",
        date: "2025-08-28",
        image: "asian food.jpg"
    },
    {
        id: 7,
        title: "Learning Tailwind CSS",
        category: "Tech",
        description: "How Tailwind makes styling much faster and easier.",
        date: "2025-08-25",
        image: "Tailwind CSS.png"
    },
    {
        id: 8,
        title: "Trip to the Sahara",
        category: "Travel",
        description: "A journey through the golden sands of Sahara desert.",
        date: "2025-08-22",
        image: "Sahara desert.jpg"
    }
];

const categories = ["All", "Tech", "Travel", "Food"];
const FIRST_PAGE_LIMIT = 6;
const OTHER_PAGES_LIMIT = 4;

let selectedCategory = "All";
let searchQuery = "";
let currentPage = 1;

const categoryButtons = document.getElementById("categoryButtons");
const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");

// Render category buttons
categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className =
        "px-4 py-2 rounded-full border bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white";
    btn.onclick = () => {
        selectedCategory = cat;
        currentPage = 1;
        renderPosts();
        updateCategoryButtons();
    };
    categoryButtons.appendChild(btn);
});

function updateCategoryButtons() {
    [...categoryButtons.children].forEach((btn) => {
        if (btn.textContent === selectedCategory) {
            btn.className =
                "px-4 py-2 rounded-full border bg-blue-600 text-white";
        } else {
            btn.className =
                "px-4 py-2 rounded-full border bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white";
        }
    });
}

function renderPosts() {
    let filteredPosts = postsData.filter((post) => {
        const matchesCategory =
            selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // عدد البوستات في الصفحة الحالية
    const postsPerPage = currentPage === 1 ? FIRST_PAGE_LIMIT : OTHER_PAGES_LIMIT;

    const totalPages = Math.ceil(
        (filteredPosts.length - FIRST_PAGE_LIMIT) / OTHER_PAGES_LIMIT + 1
    );

    let startIndex;
    if (currentPage === 1) {
        startIndex = 0;
    } else {
        startIndex = FIRST_PAGE_LIMIT + (currentPage - 2) * OTHER_PAGES_LIMIT;
    }

    const visiblePosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    postsContainer.innerHTML = "";

    if (visiblePosts.length > 0) {
        visiblePosts.forEach((post) => {
            const card = document.createElement("div");
            card.className =
                "bg-gray-800 rounded-2xl shadow hover:shadow-lg transition overflow-hidden";
            card.innerHTML = `
            <div class="bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105">

<img 
  src="${post.image}" 
  alt="${post.title}" 
  class="${(post.image === 'react.png' || post.image === 'Eiffel Tower.png'|| post.image === 'javascript.png' ) 
            ? 'w-48 h-48 mx-auto object-contain' 
            : 'w-full h-48 object-cover'}" 
/>



        <div class="p-4">
          <span class="text-sm text-gray-400">${post.date}</span>
          <h2 class="text-xl font-semibold mt-2 text-white">${post.title}</h2>
          <p class="text-gray-300 mt-2">${post.description}</p>
          <span class="inline-block mt-3 px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full">${post.category}</span>
        </div>
      `;
            postsContainer.appendChild(card);
        });
    } else {
        postsContainer.innerHTML =
            '<p class="col-span-full text-center text-gray-400">No posts found.</p>';
    }

    // Pagination
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className =
            i === currentPage
                ? "px-4 py-2 rounded bg-blue-600 text-white"
                : "px-4 py-2 rounded bg-gray-800 text-gray-300 border hover:bg-blue-600 hover:text-white";
        btn.onclick = () => {
            currentPage = i;
            renderPosts();
        };
        pagination.appendChild(btn);
    }
}

searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    currentPage = 1;
    renderPosts();
});

// Initial render
updateCategoryButtons();
renderPosts();
