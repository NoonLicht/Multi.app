const { ipcRenderer } = require('electron');

function createButton(className, id, svgPath, clickHandler) {
    const button = document.createElement('button');
    button.className = className;
    button.id = id;
    button.style.display = 'flex';
    button.style.justifyContent = 'center';
    button.onclick = clickHandler;

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
    button.appendChild(svg);

    return button;
}

function createTitleBar() {
    const titlebar = document.getElementById('titlebar');

    const closeBtn = createButton('close', 'closeBtn', 'm6 6 12 12M6 18 18 6 6 18Z', null);
    const minimizeBtn = createButton('minimize', 'minimizeBtn', 'M5 12h14', null);
    const menuBtn = createButton('navbutton', 'menuBtn', 'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01', navigateToIndex);
    const tweakerBtn = createButton('navbutton', 'tweakerBtn', 'm8 9 3 3-3 3 M13 15h3 M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z', navigateToTweak);
    const convertBtn = createButton('navbutton', 'convertBtn', 'm18 4 3 3-3 3 m18 20 3-3-3-3 M3 7h3a5 5 0 0 1 5 5 5 5 0 0 0 5 5h5 M3 17h3a5 5 0 0 0 5-5 5 5 0 0 1 5-5h5', navigateToConvert);
    const videoBtn = createButton('navbutton', 'videoBtn', 'M16.004 3.94A9 9 0 1 0 21 12.003 M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', navigateToVideo);
    const monitorBtn = createButton('navbutton', 'monitorBtn', 'M20 4H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z M7 20h10 M9 16v4 M15 16v4 M7 10h2l2 3 2-6 1 3h3', navigateToMonitor);
    const planBtn = createButton('navbutton', 'planBtn', 'M16 9c2.761 0 5-1.343 5-3s-2.239-3-5-3-5 1.343-5 3 2.239 3 5 3Z M11 6v4c0 1.657 2.239 3 5 3s5-1.343 5-3V6 M11 10v4c0 1.657 2.239 3 5 3s5-1.343 5-3v-4 M11 14v4c0 1.657 2.239 3 5 3s5-1.343 5-3v-4 M7 9H4.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 1 1 0 3H3 M5 8v1m0 6v1-1Z', navigateToPlan);
    const managerBtn = createButton('navbutton', 'managerBtn', 'M19.5 13.576 12 21.004l-1.447-1.434-1.449-1.434 M3 13h2l2 3 2-6 1 3h3 M2.987 10.032a5 5 0 0 1 9.014-3.022 M12 7.01a5 5 0 1 1 7.5 6.572', navigateToManager);
    const bookBtn = createButton('navbutton', 'bookBtn', 'M3 19.003a9 9 0 0 1 9 0 9 9 0 0 1 9 0 M3 6.003a9 9 0 0 1 9 0 9 9 0 0 1 9 0 M3 6v13 M12 6v13 M21 6v13', navigateToBook);
    const noteBtn = createButton('navbutton', 'noteBtn', 'M17 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z M9 7h6 M9 11h6 M9 15h4', navigateToNote);
    const chubBtn = createButton('navbutton', 'chubBtn', 'm5 7 5 5-5 5 M12 19h7', navigateToChub);

    titlebar.appendChild(closeBtn);
    titlebar.appendChild(minimizeBtn);
    titlebar.appendChild(menuBtn);
    titlebar.appendChild(tweakerBtn);
    titlebar.appendChild(convertBtn);
    titlebar.appendChild(videoBtn);
    titlebar.appendChild(monitorBtn);
    titlebar.appendChild(planBtn);
    titlebar.appendChild(managerBtn);
    titlebar.appendChild(bookBtn);
    titlebar.appendChild(noteBtn);
    titlebar.appendChild(chubBtn);
}


document.addEventListener('DOMContentLoaded', createTitleBar);