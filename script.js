const allNews = async () => {
  toggleLoadingSpinner(true);

  setTimeout(async () => {
    const url = " https://openapi.programming-hero.com/api/retro-forum/posts";
    const res = await fetch(url);
    const data = await res.json();
    const news = data.posts;

    news.forEach((item) => {
      const newsContainer = document.getElementById("news-container");
      const div = document.createElement("div");
      div.classList.add("single-news");
      div.innerHTML = `
    <div class="bg-indigo-50 border-indigo-100 border-2 rounded-xl flex lg:p-10 p-2 lg:mb-10 m-2">
      <div>
        <img class="w-[50px] lg:mr-10 mr-2 rounded-lg" src="${
          item.image
        }" alt="">
        <div class="w-[15px] h-[15px] border-white border-2 rounded-full absolute translate-x-10 -translate-y-14 ${
          item.isActive ? "bg-green-500" : "bg-red-500"
        }"></div>
      </div>
      
      <div class="flex-1">
        <div class="flex mb-4">
          <p class="mr-20 font-bold">#${item.category}</p>
          <p class="font-bold">Autor: ${item.author.name}</p>
        </div>
        <div class="lg:space-y-3">
          <h5 class="lg:text-2xl text-xl font-bold">${item.title}</h5>
          <p>${item.description}</p>
          <hr class=" border-gray-500 border-dashed">
        </div>
        <div class="flex mt-4 justify-between">
          <div class="flex lg:space-x-6 space-x-3 items-center justify-center">
            <p><i class="fa-regular fa-comment-dots mr-2"></i>${
              item.comment_count
            }</p>
            <p><i class="fa-regular fa-eye mr-2"></i>${item.view_count}</p>
            <p><i class="fa-regular fa-clock mr-2"></i>${item.posted_time}</p>
          </div>
          <div>
            <span class="text-green-400 lg:text-2xl cursor-pointer seen"><i class="fa-solid fa-envelope-open"></i></span>
          </div>
        </div>
      </div>
    </div>
    `;
      newsContainer.appendChild(div);

      const seenMessage = div.querySelector(".seen");

      seenMessage.addEventListener("click", () => {
        let msgCountElement = document.getElementById("msg-count");
        let msgCount = parseInt(msgCountElement.textContent);
        msgCount++;
        msgCountElement.textContent = msgCount;
        const showSeen = document.getElementById("show-seen");
        const messageDiv = document.createElement("div");
        messageDiv.innerHTML = `
      <div class="grid grid-cols-4 bg-white p-4 rounded-lg justify-between items-center">
        <h5 class="col-span-3">${item.title}</h5>
        <p class="col-span-1 mx-auto"><i class="fa-regular fa-eye mr-1"></i>${item.view_count}</p>
      </div>`;
        showSeen.appendChild(messageDiv);
      });
    });
    toggleLoadingSpinner(false);
  }, 2000);
};

const postByQuery = async (searchValue) => {
  const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`;
  const res = await fetch(url);
  const data = await res.json();
  const searchNews = data.posts;
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  if(searchNews.length === 0){
    newsContainer.innerText = `${data.message}`;
  }
  else{
    searchNews.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("single-news");
      div.innerHTML = `
      <div class="bg-indigo-50 border-indigo-100 border-2 rounded-xl flex lg:p-10 p-2 lg:mb-10 m-2">
        <div>
          <img class="w-[50px] lg:mr-10 mr-2 rounded-lg" src="${
            item.image
          }" alt="">
          <div class="w-[15px] h-[15px] border-white border-2 rounded-full absolute translate-x-10 -translate-y-14 ${
            item.isActive ? "bg-green-500" : "bg-red-500"
          }"></div>
        </div>
        
        <div class="flex-1">
          <div class="flex mb-4">
            <p class="mr-20 font-bold">#${item.category}</p>
            <p class="font-bold">Autor: ${item.author.name}</p>
          </div>
          <div class="lg:space-y-3">
            <h5 class="lg:text-2xl text-xl font-bold">${item.title}</h5>
            <p>${item.description}</p>
            <hr class=" border-gray-500 border-dashed">
          </div>
          <div class="flex mt-4 justify-between">
            <div class="flex lg:space-x-6 space-x-3 items-center justify-center">
              <p><i class="fa-regular fa-comment-dots mr-2"></i>${
                item.comment_count
              }</p>
              <p><i class="fa-regular fa-eye mr-2"></i>${item.view_count}</p>
              <p><i class="fa-regular fa-clock mr-2"></i>${item.posted_time}</p>
            </div>
            <div>
              <span class="text-green-400 lg:text-2xl cursor-pointer seen"><i class="fa-solid fa-envelope-open"></i></span>
            </div>
          </div>
        </div>
      </div>
      `;
      newsContainer.appendChild(div);
  
      const seenMessage = div.querySelector(".seen");
      seenMessage.addEventListener("click", () => {
        let msgCountElement = document.getElementById("msg-count");
        let msgCount = parseInt(msgCountElement.textContent);
        msgCount++;
        msgCountElement.textContent = msgCount;
        const showSeen = document.getElementById("show-seen");
        const messageDiv = document.createElement("div");
        messageDiv.innerHTML = `
        <div class="grid grid-cols-4 bg-white p-4 rounded-lg justify-between items-center">
          <h5 class="col-span-3">${item.title}</h5>
          <p class="col-span-1"><i class="fa-regular fa-eye mr-1"></i>${item.view_count}</p>
        </div>`;
        showSeen.appendChild(messageDiv);
      });
    });
  }
  
};
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async () => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  const searchValue = document.getElementById("search-input").value;
    toggleLoadingSpinner(true);
    setTimeout(async () => {
      toggleLoadingSpinner(false);
      await postByQuery(searchValue);
    }, 2000);
});

const latestNews = async () => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`;
    const res = await fetch(url);
    const data = await res.json();
    const allLatest = data;
    allLatest.forEach((item) => {
      const latestCard = document.getElementById("latest-card");
      const div = document.createElement("div");
      const designation = item.author.designation
        ? item.author.designation
        : "Unknown";
      const date = item.author.posted_date
        ? item.author.posted_date
        : "No Publish Date";
      div.innerHTML = `
        <div class="card lg:w-full bg-base-100 shadow-xl lg:m-0 m-2 w-[300px]">
        <figure class="lg:p-8 p-2">
          <img src="${item.cover_image}" alt="card-image" class="rounded-xl" />
        </figure>
        <div class="text-left p-4">
          <p><span><i class="fa-solid fa-calendar"></i></span> Date: ${date}</p>
          <h2 class="card-title">${item.description.slice(0, 80)}</h2>
          <div>
            <p>${item.description.slice(0, 100)}</p>
            <div class="flex mt-4">
              <img class="w-[50px] profile-picture mr-4 rounded-full" src="${
                item.profile_image
              }" alt="">
            <div>
              <p class="Aurthor text-xl font-bold">${item.author.name}r</p>
              <p class="designation">${designation}</p>
            </div>
            </div>
          </div>
        `;
      latestCard.appendChild(div);
    });
};
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
latestNews();
allNews();
