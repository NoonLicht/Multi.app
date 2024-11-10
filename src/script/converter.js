// Функция для создания кнопки меню
function createConvertMenuButton(id, text) {
    const button = document.createElement('button');
    button.className = 'menu-button';
    button.id = id;
    button.textContent = text;
    button.onclick = function () {
        document.querySelectorAll('.menu-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        loadSubmenuPage(id); // Вызываем загрузку подстраницы
    };
    return button;
}

function createMenuPage() {
    const container = document.getElementById('container3').querySelector('.com');

    if (!container) {
        console.error("Контейнер с ID 'container3' не найден");
        return;
    }

    const mainContainer = document.createElement('div');
    mainContainer.className = 'menu-page-container';

    const menu = document.createElement('div');
    menu.className = 'menu-converter';

    // Создаем кнопки меню
    const convertingfileBtn = createConvertMenuButton('convertingfile', 'Конвертирование файлов');
    const curlconvertBtn = createConvertMenuButton('curlconvert', 'Конвертирование curl');

    // Добавляем кнопки в меню
    menu.appendChild(convertingfileBtn);
    menu.appendChild(curlconvertBtn);

    const submenu = document.createElement('div');
    submenu.className = 'submenu-converter';

    mainContainer.appendChild(menu);
    mainContainer.appendChild(submenu);
    container.appendChild(mainContainer);
}

// Функция для загрузки подстраниц
function loadSubmenuPage(pageId) {
    const submenu = document.querySelector('.submenu-converter');
    submenu.innerHTML = ''; // Очистим текущее содержимое подменю

    if (pageId === 'convertingfile') {
        createGridPage(submenu); // Создаем страницу с сеткой 2x2
    } else if (pageId === 'curlconvert') {
        createTextFieldsPage(submenu); // Создаем страницу с текстовыми полями
    }
}

function createSVGIcon(svgPath) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('viewBox', '0 0 24 24');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', svgPath);

    svg.appendChild(path);
    return svg;
}

function createGridPage(submenu) {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';

    // Массив полных путей для каждого PNG
    const imagePaths = [
        "logo/document.png",
        "logo/image.png",
        "logo/audio.png",
        "logo/video.png"
    ];

    // Функция для получения актуального пути изображения с учетом темы
    function getImagePath(imageName) {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        if (isDarkTheme) {
            // Возвращаем путь с приставкой "-white" для темной темы
            return imageName.replace(".png", "-white.png");
        }
        return imageName; // Возвращаем обычный путь, если не темная тема
    }

    // Создаем 4 блока с PNG
    for (let i = 0; i < 4; i++) {
        const box = document.createElement('div');
        box.className = 'grid-box';

        // Создаем левую часть для PNG (1/3 ширины)
        const leftSection = document.createElement('div');
        leftSection.className = 'grid-box-left';

        // Создаем img элемент для PNG и задаем путь к файлу с учетом текущей темы
        const img = document.createElement('img');
        img.src = getImagePath(imagePaths[i]);
        img.alt = `Icon ${i + 1}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';

        // Добавляем img в левую часть
        leftSection.appendChild(img);

        // Создаем правую часть для текста или других элементов (2/3 ширины)
        const rightSection = document.createElement('div');
        rightSection.className = 'grid-box-right';
        rightSection.textContent = 'Контент ' + (i + 1); // Пример текста для правой секции

        // Добавляем обе части в grid-box
        box.appendChild(leftSection);
        box.appendChild(rightSection);

        // Добавляем grid-box в grid-container
        gridContainer.appendChild(box);
    }

    submenu.appendChild(gridContainer);
}


// Функция для создания страницы с текстовыми полями
function createTextFieldsPage(submenu) {
    const textFieldContainer = document.createElement('div');
    textFieldContainer.className = 'text-field-container';

    // Создаем первое текстовое поле
    const textField1 = document.createElement('input');
    textField1.type = 'text';
    textField1.placeholder = 'Поле текста 1';
    textField1.className = 'text-field';

    // Создаем второе текстовое поле
    const textField2 = document.createElement('input');
    textField2.type = 'text';
    textField2.placeholder = 'Поле текста 2';
    textField2.className = 'text-field';

    // Создаем поле, занимающее всю ширину
    const fullWidthField = document.createElement('input');
    fullWidthField.type = 'text';
    fullWidthField.placeholder = 'Поле на всю ширину';
    fullWidthField.className = 'full-width-field';

    textFieldContainer.appendChild(textField1);
    textFieldContainer.appendChild(textField2);
    textFieldContainer.appendChild(fullWidthField);

    submenu.appendChild(textFieldContainer);
}

document.addEventListener('DOMContentLoaded', createMenuPage);
