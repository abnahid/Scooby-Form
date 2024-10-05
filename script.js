/* Get all posts */
const getPostData = async () => {
  const loader = document.getElementById("postLoader");
  loader.classList.remove("hidden");
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await response.json();
  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 2000));
  await timeoutPromise;
  displayPost(data);
  loader.classList.add("hidden");
};
getPostData().then((data) => addToList());

const loadPosts = async (category) => {
  document.getElementById("post-container").innerHTML = "";
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      category ? `?category=${category}` : ""
    }`
  );
  const data = await response.json();
  displayAllPosts(data.posts);
};

/* Load latest Posts */

const loadLatestPosts = async (latest) => {
  const response2 = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts${
      latest ? `latest?=${latest}` : ""
    }`
  );
  const data2 = await response2.json();
  displayLatestPosts(data2);
};

/* Display All Posts */

const displayAllPosts = (posts) => {
  const postContainer = document.getElementById("post-container");

  posts.forEach((post) => {
    const newDiv = document.createElement("div");

    newDiv.innerHTML = `
      <div class="p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl">
            <div class="indicator">
              <span class="indicator-item badge ${
                post.isActive ? "bg-green-600" : "bg-red-500"
              }"></span>
            <div class="avatar">
            <div class="w-24 rounded-xl">
            <img src="${post.image}"/>
            </div>
            </div>
              </div>
          <div class="space-y-4 w-full">
          <div class="flex gap-4 opacity-60">
          <p>${post.category}</p>
          <p>Author: ${post.author.name}</p>
          </div>
          <h3 class="text-2xl font-bold opacity-70">${post.title}</h3>
          <p class="opacity-40">
          ${post.description}
          </p>
          <hr class="border border-dashed border-gray-300"/>
          <div class="flex justify-between font-bold opacity-45">
          <div class="flex gap-4">
          <div class="space-x-2 flex items-center">
          <i class="fa-regular fa-comment-dots"></i>
          <p>${post.comment_count}</p>
          </div>
          <div class="space-x-2 flex items-center">
          <i class="fa-regular fa-eye"></i>
          <p>${post.view_count}</p>
          </div>
          <div class="space-x-2 flex items-center">
          <i class="fa-regular fa-clock"></i>
          <p>${post.posted_time} Min</p>
          </div>
          </div>
          <div class="opacity-100">
          <button id="addToList" onclick="markAsRead('${post.description}', '${
      post.view_count
    }')" class="addToList btn btn-circle bg-green-500 btn-sm">
          <i class="fa-solid fa-envelope-open text-white"></i>
          </button>
          </div>
          </div>
         </div>
      `;
    postContainer.appendChild(newDiv);
  });
};

/* Display latest Posts */

const displayLatestPosts = (latestPosts) => {
  const latestContainer = document.getElementById("latest-post-container");
  latestPosts.forEach((post) => {
    const blockElement = document.createElement("div");

    blockElement.innerHTML = `
      <div class="card  shadow-2xl bg-slate-100">
        <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
            <img
                src=${post.cover_image}
                class="rounded-xl object-cover"
            />
        </figure>
        <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
            <p class="opacity-50 text-start">
                <i class="fa-solid fa-calendar-days me-2"></i>${
                  post.author?.posted_date || "No Publish Date"
                }
            </p>
            <h2 class="card-title text-start font-bold">${post.title}</h2>
            <p class="text-start text-gray-500 font-semibold">
                ${post.description}
            </p>
            <div class="card-actions flex gap-5 items-center">
                <div class="avatar">
                    <div
                        class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                    >
                        <img
                        src=${post.profile_image}
                        />
                    </div>
                </div>
            <div>
            <h3 class="text-start font-extrabold">${post.author.name}</h3>
            <p class="text-start opacity-60">${
              post.author?.designation || "Unknown"
            }</p>
        </div>
    </div>
      `;
    latestContainer.appendChild(blockElement);
  });
};

const markAsRead = (description, view_count) => {
  const markAsReadContainer = document.getElementById("markAsReadContainer");
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="flex justify-between p-2 lg:p-3 bg-white rounded-2xl items-center gap-3">
  <div class="lg:w-4/5 w-11/12">
  <p>${description}</p>
  </div>
      <div class="lg:1/5 w-4/12 flex justify-end">
      <p><i class="fa-regular fa-eye"></i>${view_count}</p>
      </div>
  </div>
  `;
  markAsReadContainer.appendChild(div);
  readCount();
};

const readCount = () => {
  const counter = document.getElementById("markAsReadCounter").innerText;
  const convertInteger = parseInt(counter);
  const sum = convertInteger + 1;

  document.getElementById("markAsReadCounter").innerText = sum;
};

loadPosts();
loadLatestPosts();

/* Handle Search Field By Category */

const handleSearchByCategory = () => {
  const searchField = document.getElementById("searchPosts").value;
  loadPosts(searchField);
};
