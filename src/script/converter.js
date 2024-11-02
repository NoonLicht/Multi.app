// Функция для создания кнопки меню
function createMenuButton(id, text) {
    const button = document.createElement('button');
    button.className = 'menu-button';
    button.id = id;
    button.textContent = text;
    button.onclick = function () {
        document.querySelectorAll('.menu-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    };
    return button;
}

function createMenuPage() {
    const container = document.getElementById('container3').querySelector('.com');

    if (!container) {
        console.error("Контейнер с ID 'container3' не найден");
        return;
    }

    console.log("Создание страницы меню");

    const mainContainer = document.createElement('div');
    mainContainer.className = 'menu-page-container';

    const menu = document.createElement('div');
    menu.className = 'menu-converter';

    // Создаем кнопки меню
    const convertingfileBtn = createMenuButton('convertingfile', 'Конветирование файлов');
    const curlconvertBtn = createMenuButton('curlconvert', 'Конветирование curl');

    // Добавляем кнопки в меню
    menu.appendChild(convertingfileBtn);
    menu.appendChild(curlconvertBtn);


    const submenu = document.createElement('div');
    submenu.className = 'submenu-converter';

    mainContainer.appendChild(menu);
    mainContainer.appendChild(submenu);
    container.appendChild(mainContainer);

    console.log("Элементы добавлены в контейнер");
}


document.addEventListener('DOMContentLoaded', createMenuPage);