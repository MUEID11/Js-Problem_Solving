const allNews = async () => {
  const url = " https://openapi.programming-hero.com/api/retro-forum/posts";
  const res = await fetch(url);
  const data = await res.json();
  const allNews = data.posts;
  allNews.forEach((item) => {
    const newsContainer = document.getElementById("news-container");
    const div = document.createElement("div");
    div.classList.add("single-news");
    div.innerHTML = `
    <div class="bg-indigo-100 rounded-xl flex p-10 mb-10">
      <div>
        <img class="w-[50px] mr-10 rounded-lg" src="${item.image}" alt="">
      </div>
      <div class="flex-1">
        <div class="flex mb-4">
          <p class="mr-20 font-bold">#${item.category}</p>
          <p class="font-bold">Autor: ${item.author.name}</p>
        </div>
        <div class="space-y-3">
          <h5 class="text-2xl font-bold">${item.title}</h5>
          <p>${item.description}</p>
          <hr class=" border-gray-500 border-dashed">
        </div>
        <div class="flex mt-4 justify-between">
          <div class="flex space-x-6">
            <p><i class="fa-regular fa-comment-dots mr-2"></i>${item.comment_count}</p>
            <p><i class="fa-regular fa-eye mr-2"></i>${item.view_count}</p>
            <p><i class="fa-regular fa-clock mr-2"></i>${item.posted_time}</p>
          </div>
          <div>
            <span class="text-green-400 text-2xl cursor-pointer"><i class="fa-solid fa-envelope-open-text seen"></i></span>
          </div>
        </div>
      </div>
    </div>
    `;
    newsContainer.appendChild(div);
    
//   const seenMessage = document.querySelectorAll('.seen');
//   seenMessage.forEach(seenMessage => {
//      seenMessage.addEventListener('click', (e) => {
//       const showSeen = document.getElementById('show-seen')
//       const messageDiv = document.createElement('div');
//       messageDiv.innerHTML = `
//       <div class="flex bg-white p-4 rounded-lg justify-between items-center">
//       <h5>${item.title}</h5>
//       <p><i class="fa-regular fa-eye mr-2"></i>${item.view_count}</p>
//     </div>`;
//       showSeen.appendChild(messageDiv);
//      })
//   })
  });
  
};
const latestNews = async() =>{
    const url = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`;
    const res = await fetch(url);
    const data = await res.json();
    const allLatest = data;
    allLatest.forEach((item) =>{
        console.log(item)
        const latestCard = document.getElementById('latest-card')
        const div = document.createElement('div');
        const designation = item.author.designation ? item.author.designation : 'Unknown';
        const date = item.author.posted_date ? item.author.posted_date : 'No Publish Date';
        div.innerHTML =`
        <div class="card w-full bg-base-100 shadow-xl">
        <figure class="p-8">
          <img src="${item.cover_image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body text-left">
          <p><span><i class="fa-solid fa-calendar"></i></span> Date: ${date}</p>
          <h2 class="card-title">${item.description.slice(0,80)}</h2>
          <div>
            <p>${item.description.slice(0,100)}</p>
            <div class="flex mt-4">
              <img class="w-[50px] profile-picture mr-4 rounded-lg" src="${item.profile_image}" alt="">
            <div>
              <p class="Aurthor text-xl font-bold">${item.author.name}r</p>
              <p class="designation">${designation}</p>
            </div>
            </div>
          </div>
        `;
        latestCard.appendChild(div);
    })
};
latestNews();
allNews();
