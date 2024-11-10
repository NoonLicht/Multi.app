// Функция для создания кнопки меню
function createTweakMenuButton(id, text, description) {
    const button = document.createElement('button');
    button.className = 'menu-button';
    button.id = id;
    button.textContent = text;
    button.dataset.description = description;
    button.onclick = function () {
        document.querySelectorAll('.menu-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        loadFile(id);
    };
    return button;
}

function createTweakMenu() {
    const tweakmenu = document.getElementById('container2').querySelector('.com'); // Обновлено для поиска в новом контейнере

    const mainContainer = document.createElement('div'); // Новый общий контейнер
    mainContainer.className = 'tweak-menu-container'; // Добавляем класс для стилизации

    const menu = document.createElement('div');
    menu.className = 'menu';

    const confidentialityBtn = createTweakMenuButton('confidentiality', 'Конфиденциальность');
    const personalizationBtn = createTweakMenuButton('personalization', 'Персонализация');
    const securityBtn = createTweakMenuButton('security', 'Безопасность');
    const systemBtn = createTweakMenuButton('system', 'Система');

    menu.appendChild(confidentialityBtn);
    menu.appendChild(personalizationBtn);
    menu.appendChild(systemBtn);
    menu.appendChild(securityBtn);

    const submenu = document.createElement('div');
    submenu.className = 'submenu';

    const description = document.createElement('div');
    description.className = 'description';

    // Добавляем все элементы в общий контейнер
    mainContainer.appendChild(menu);
    mainContainer.appendChild(submenu);
    mainContainer.appendChild(description);

    tweakmenu.appendChild(mainContainer); // Добавляем общий контейнер в основной контейнер
}

document.addEventListener('DOMContentLoaded', createTweakMenu);

function loadFile(buttonId) {
    var fileName = buttonId.toLowerCase() + '.json'; // Изменено расширение файла на .json
    var filePath = 'tweak/' + fileName;

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Парсить как JSON
        })
        .then(data => {
            displayFormattedText(data); // Передаем распарсенные данные JSON
        })
        .catch(error => {
            console.error('Ошибка загрузки файла:', error);
            displayError();
        });
}

function displayFormattedText(data) {
    var htmlContent = '';

    data.forEach(function (item) {
        var checkboxId = 'checkbox-' + item.title.toLowerCase().replace(/\s+/g, '-'); // Уникальный ID
        var title = item.title; // Получаем заголовок из JSON
        var description = item.description; // Получаем описание из JSON

        // Проверяем состояние чекбокса из localStorage
        var checked = localStorage.getItem(checkboxId) === 'true' ? 'checked' : '';

        htmlContent += '<div class="tweak-check" data-description="' + description + '"><input type="checkbox" id="' + checkboxId + '" ' + checked + '><label for="' + checkboxId + '">' + title + '</label></div>';
    });

    document.querySelector('.submenu').innerHTML = htmlContent;

    var tweakChecks = document.querySelectorAll('.tweak-check');
    tweakChecks.forEach(function (tweakCheck) {
        tweakCheck.addEventListener('mouseover', function () {
            var descriptionBlock = document.querySelector('.description');
            descriptionBlock.textContent = this.dataset.description;
        });

        tweakCheck.addEventListener('mouseout', function () {
            var descriptionBlock = document.querySelector('.description');
            descriptionBlock.textContent = '';
        });

        tweakCheck.addEventListener('click', function () {
            var checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;

            // Сохраняем состояние чекбокса в localStorage
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    });
}

function displayError() {
    document.querySelector('.submenu').innerHTML = '<p>Ошибка загрузки файла.</p>';
}

// Функция для загрузки состояния чекбоксов из localStorage
function loadCheckboxStates() {
    var tweakChecks = document.querySelectorAll('.tweak-check');
    tweakChecks.forEach(function (tweakCheck) {
        var checkbox = tweakCheck.querySelector('input[type="checkbox"]');
        // Устанавливаем состояние чекбокса из localStorage
        checkbox.checked = localStorage.getItem(checkbox.id) === 'true';
    });
}

// Обновляем состояние чекбоксов при переключении между меню
document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', loadCheckboxStates);
});
