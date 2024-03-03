const menuBtn = document.getElementById('menu-btn');
const dropDown = document.querySelector('.dropdown-content');
menuBtn.addEventListener('click', function(event){
    dropDown.classList.toggle('hidden')
})