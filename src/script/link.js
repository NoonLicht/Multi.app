const fs = require('fs');
const path = require('path');

document.addEventListener("DOMContentLoaded", function () {
  const blocksContainer = document.querySelector('.blocks-container');

  blocksContainer.addEventListener("click", function (event) {
    const target = event.target;

    // Проверяем, является ли элемент чекбоксом
    if (target.type === "checkbox" && target.className === "program-checkbox") {
      // Получаем текстовое содержимое (название программы)
      const programName = target.nextElementSibling.textContent.trim();

      // Получаем строку из data.json, соответствующую выбранной программе
      const link = getLinkFromJson(programName);

      // Обрабатываем полученное значение
      processIdOrLink(link);
    }
  });
});

function getLinkFromJson(programName) {
  const dataPath = path.join(__dirname, 'data.json');

  try {
    // Чтение данных из JSON файла
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Проходим по всем категориям и ищем совпадение по имени программы
    for (const category of Object.values(data)) {
      const program = category.find(item => item.name === programName);
      if (program) {
        return program.link || "Ссылка не указана"; // Возвращаем ссылку или сообщение, если ссылка пустая
      }
    }
    return 'Программа не найдена';
  } catch (error) {
    return `Ошибка при чтении файла: ${error.message}`;
  }
}

// Добавляем обработчик для обновления выбранной папки
ipcRenderer.on('folderSelected', (event, folderPath) => {
  selectedFolderPath = folderPath;
});

// Модифицируем функцию processIdOrLink для сохранения ссылки во временный файл
function processIdOrLink(link) {
  if (link.match(/^https?:\/\//)) {
    // Если значение начинается с http:// или https://, считаем его ссылкой
    console.log(link);

    // Сохраняем ссылку во временный файл
    saveLinkToFile(link);
  } else {
    // Если значение не является ссылкой, считаем его ошибкой
    console.log('Ошибка: Неверный формат ссылки или id');
  }
}
