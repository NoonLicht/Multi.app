// Функция для создания кнопки меню
function createContentMenuButton(id, text) {
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

function createContentPage() {
  const container = document.getElementById('container4').querySelector('.com');

  if (!container) {
    console.error("Контейнер с ID 'container4' не найден");
    return;
  }

  const mainContainer = document.createElement('div');
  mainContainer.className = 'menu-content-container';

  const menu = document.createElement('div');
  menu.className = 'menu-content';

  // Создаем кнопки меню
  const downloadvideoBtn = createContentMenuButton('downloadvideo', 'Скачать видео');
  const downloadmusicBtn = createContentMenuButton('downloadmusic', 'Скачать музыку');

  // Добавляем кнопки в меню
  menu.appendChild(downloadvideoBtn);
  menu.appendChild(downloadmusicBtn);


  const submenu = document.createElement('div');
  submenu.className = 'submenu-content';

  mainContainer.appendChild(menu);
  mainContainer.appendChild(submenu);
  container.appendChild(mainContainer);

}


document.addEventListener('DOMContentLoaded', createContentPage);
