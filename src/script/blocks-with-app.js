document.addEventListener("DOMContentLoaded", function () {
    initIndex();
});

function initIndex() {
    const container = document.querySelector('.com');
    // Создаем контейнер для блоков
    const blocksContainer = document.createElement("div");
    blocksContainer.className = "blocks-container";
    container.appendChild(blocksContainer);

    //----------------------------------------Чтение данных из файла----------------------------------------//

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            for (const [blockName, programs] of Object.entries(data)) {
                // Создаем новый блок для каждой категории
                const block = document.createElement("div");
                block.className = "checkbox-block";

                // Добавляем чекбокс для блока
                const blockCheckbox = document.createElement("input");
                blockCheckbox.type = "checkbox";
                blockCheckbox.id = `blockCheckbox-${blockName}`;

                // Добавляем название блока
                const blockLabel = document.createElement("label");
                blockLabel.htmlFor = `blockCheckbox-${blockName}`;
                blockLabel.textContent = blockName;

                // Добавляем стиль только к названию блока
                blockLabel.classList.add("block-name-style");

                // Добавляем чекбокс и название блока в блок
                block.appendChild(blockCheckbox);
                block.appendChild(blockLabel);

                // Добавляем блок в контейнер блоков
                blocksContainer.appendChild(block);

                // Добавляем чекбоксы для каждой программы в текущем блоке
                programs.forEach((program, i) => {
                    // Чекбокс для программы
                    const programCheckbox = document.createElement("input");
                    programCheckbox.type = "checkbox";
                    programCheckbox.className = "program-checkbox";
                    programCheckbox.id = `programCheckbox-${blockName}-${i}`;

                    // Название программы
                    const programLabel = document.createElement("label");
                    programLabel.htmlFor = `programCheckbox-${blockName}-${i}`;
                    programLabel.textContent = program.name;
                    programLabel.classList.add("program-name-style");

                    // Контейнер для логотипа и программы
                    const programLogoContainer = document.createElement("div");
                    programLogoContainer.className = "program-logo-container";

                    // Путь к логотипу
                    const programName = program.name.trim();
                    const logoPath = `logo/${programName}.png`;

                    // Элемент логотипа
                    const programLogo = document.createElement("img");
                    programLogo.className = "program-logo";
                    programLogo.src = logoPath;
                    programLogo.alt = programName;
                    programLogo.width = 15;
                    programLogo.height = 15;

                    // Добавляем логотип и программу в контейнер
                    programLogoContainer.appendChild(programLogo);
                    programLogoContainer.appendChild(programCheckbox);
                    programLogoContainer.appendChild(programLabel);

                    // Добавляем контейнер с логотипом и программой в текущий блок
                    block.appendChild(programLogoContainer);
                });

                // Обработчик изменения состояния блока для всех чекбоксов программ
                blockCheckbox.addEventListener("change", function () {
                    toggleProgramCheckboxes(this);
                });
            }
        })
        .catch(error => console.error('Ошибка загрузки файла:', error));
}

function toggleProgramCheckboxes(blockCheckbox) {
    // Находим родительский блок для данного чекбокса
    const block = blockCheckbox.closest(".checkbox-block");

    // Находим все чекбоксы программ внутри этого блока
    const programCheckboxes = block.querySelectorAll(".program-checkbox");

    // Устанавливаем состояние всех чекбоксов программ таким же, как и у чекбокса блока
    programCheckboxes.forEach(programCheckbox => {
        programCheckbox.checked = blockCheckbox.checked;
    });
}
