

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

  const submenu = document.createElement('div');
  submenu.className = 'submenu-content';

  mainContainer.appendChild(submenu);
  container.appendChild(mainContainer);

}


document.addEventListener('DOMContentLoaded', createContentPage);
