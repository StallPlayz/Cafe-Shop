// icon

feather.replace();

// Toggle class active

const navigation = document.querySelector('.navigation');

// Hamburger menu clicked

document.querySelector('#hamburger-menu') . onclick = () => {
    navigation.classList.toggle('active');
};

// Click outside sidebar to close nav

const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e){
    if(!hamburger.contains(e.target) && !navigation.contains(e.target)) {
        navigation.classList.remove('active');
    }
})