// js/script.js

// Зберігання користувача у localStorage
function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function clearUser() {
    localStorage.removeItem('user');
}

// Імітація входу користувача
function loginUser(phone, name, surname) {
    const user = {
        phone: phone,
        name: name,
        surname: surname
    };
    saveUser(user);
    updateUIAfterLogin();
}

function updateUIAfterLogin() {
    const user = getUser();
    const loginBlock = document.getElementById('login-block');
    const userPanel = document.getElementById('user-panel');

    if (user) {
        if (loginBlock) loginBlock.style.display = 'none';
        if (userPanel) {
            userPanel.style.display = 'block';
            userPanel.querySelector('#user-name').textContent = user.name + ' ' + user.surname;
        }
    }
}

function logoutUser() {
    clearUser();
    location.reload();
}

// Псевдообробка контактної форми
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Ваше повідомлення надіслано. Дякуємо за звернення!');
        contactForm.reset();
    });
}

// Фільтрація галереї (для gallery.html)
const filterButtons = document.querySelectorAll('[data-filter]');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.filter;
        galleryItems.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Відображення адмін-панелі (псевдо)
function isAdmin(user) {
    return user.phone === '+380991234567';
}

function showAdminPanel() {
    const user = getUser();
    if (user && isAdmin(user)) {
        const adminPanel = document.getElementById('admin-panel');
        if (adminPanel) adminPanel.style.display = 'block';
    }
}

// Викликається при завантаженні сторінки
window.addEventListener('DOMContentLoaded', () => {
    updateUIAfterLogin();
    showAdminPanel();
});
