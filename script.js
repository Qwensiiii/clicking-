// ============ НАСТРОЙКИ АДМИНА ============
// ВСТАВЬ СВОЙ TELEGRAM ID СЮДА!
// Узнать можно у бота @userinfobot
const ADMIN_ID = 8903772507; // ← ЗАМЕНИ НА СВОЙ ID!

// ============ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ============
let userData = {
    userId: null,
    username: 'Гость',
    firstName: '',
    nickname: null,
    balance: 1000,
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    daysPlayed: 1,
    firstVisit: null,
    lastVisit: null
};

// ============ СИМВОЛЫ СЛОТОВ ============
const slotSymbols = [
    '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21L8 9l4-6 4 6z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M3 7l4 5 5-6 5 6 4-5-2 12H5z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M12 2L15 9H22L16 14L19 21L12 16L5 21L8 14L2 9H9L12 2Z"/></svg>',
    '<svg viewBox="0 0 24 24" width="32" height="32"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-weight="900" fill="currentColor" font-family="Arial">7</text></svg>',
    '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M12 2a6 6 0 0 0-6 6v3a6 6 0 0 1-1 3.5L4 17h16l-1-2.5a6 6 0 0 1-1-3.5V8a6 6 0 0 0-6-6z"/><circle cx="12" cy="20" r="2"/></svg>',
    '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M12 21s-8-5.5-8-11a4 4 0 0 1 8-2.5A4 4 0 0 1 20 10c0 5.5-8 11-8 11z"/></svg>'
];

// ============ КУБИК ============
const diceFaces = [
    '<svg viewBox="0 0 24 24" width="70" height="70" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 24 24" width="70" height="70" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 24 24" width="70" height="70" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 24 24" width="70" height="70" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 24 24" width="70" height="70" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 24 24" width="70" height="70" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="8" cy="12" r="1.5" fill="currentColor"/><circle cx="16" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>'
];

// ============ РУЛЕТКА ============
const rouletteNumbers = [
    { num: 0, color: 'green' },
    { num: 32, color: 'red' },
    { num: 15, color: 'black' },
    { num: 19, color: 'red' },
    { num: 4, color: 'black' },
    { num: 21, color: 'red' },
    { num: 2, color: 'black' },
    { num: 25, color: 'red' },
    { num: 17, color: 'black' },
    { num: 34, color: 'red' },
    { num: 6, color: 'black' },
    { num: 27, color: 'red' },
    { num: 13, color: 'black' },
    { num: 36, color: 'red' },
    { num: 11, color: 'black' },
    { num: 30, color: 'red' },
    { num: 8, color: 'black' },
    { num: 23, color: 'red' },
    { num: 10, color: 'black' },
    { num: 5, color: 'red' },
    { num: 24, color: 'black' },
    { num: 16, color: 'red' },
    { num: 33, color: 'black' },
    { num: 1, color: 'red' },
    { num: 20, color: 'black' },
    { num: 14, color: 'red' },
    { num: 31, color: 'black' },
    { num: 9, color: 'red' },
    { num: 22, color: 'black' },
    { num: 18, color: 'red' },
    { num: 29, color: 'black' },
    { num: 7, color: 'red' },
    { num: 28, color: 'black' },
    { num: 12, color: 'red' },
    { num: 35, color: 'black' },
    { num: 3, color: 'red' },
    { num: 26, color: 'black' }
];

let isRouletteSpinning = false;

// ============ ИНИЦИАЛИЗАЦИЯ ============
function init() {
    if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        
        const user = tg.initDataUnsafe?.user;
        if (user) {
            userData.userId = user.id;
            userData.username = user.username || 'Гость';
            userData.firstName = user.first_name || '';
        }
    }
    
    loadUserData();
    buildRoulette();
    updateUI();
    showGames();
}

// ============ ПОСТРОЕНИЕ РУЛЕТКИ ============
function buildRoulette() {
    const cellsGroup = document.getElementById('roulette-cells');
    cellsGroup.innerHTML = '';
    
    const centerX = 120;
    const centerY = 120;
    const outerRadius = 100;
    const innerRadius = 38;
    const angleStep = 360 / rouletteNumbers.length;
    
    rouletteNumbers.forEach((item, index) => {
        const startAngle = index * angleStep - 90;
        const endAngle = (index + 1) * angleStep - 90;
        
        const x1 = centerX + innerRadius * Math.cos((startAngle) * Math.PI / 180);
        const y1 = centerY + innerRadius * Math.sin((startAngle) * Math.PI / 180);
        const x2 = centerX + outerRadius * Math.cos((startAngle) * Math.PI / 180);
        const y2 = centerY + outerRadius * Math.sin((startAngle) * Math.PI / 180);
        const x3 = centerX + outerRadius * Math.cos((endAngle) * Math.PI / 180);
        const y3 = centerY + outerRadius * Math.sin((endAngle) * Math.PI / 180);
        const x4 = centerX + innerRadius * Math.cos((endAngle) * Math.PI / 180);
        const y4 = centerY + innerRadius * Math.sin((endAngle) * Math.PI / 180);
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`);
        path.setAttribute('fill', item.color === 'green' ? '#00aa00' : item.color === 'red' ? '#cc0000' : '#1a1a1a');
        path.setAttribute('stroke', '#ffd700');
        path.setAttribute('stroke-width', '0.8');
        path.setAttribute('data-index', index);
        path.setAttribute('data-color', item.color);
        
        cellsGroup.appendChild(path);
        
        if (item.num !== 0) {
            const textAngle = ((startAngle + endAngle) / 2) * Math.PI / 180;
            const textRadius = (innerRadius + outerRadius) / 2;
            const tx = centerX + textRadius * Math.cos(textAngle);
            const ty = centerY + textRadius * Math.sin(textAngle);
            
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', tx);
            text.setAttribute('y', ty);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', 'white');
            text.setAttribute('font-size', '7');
            text.setAttribute('font-weight', 'bold');
            text.textContent = item.num;
            
            cellsGroup.appendChild(text);
        }
    });
}

// ============ СОХРАНЕНИЕ ============
function getStorageKey() {
    return 'clickapp_data_' + (userData.userId || 'guest');
}

function saveUserData() {
    userData.lastVisit = new Date().toISOString();
    localStorage.setItem(getStorageKey(), JSON.stringify(userData));
}

function loadUserData() {
    const localData = localStorage.getItem(getStorageKey());
    
    if (localData) {
        try {
            const parsed = JSON.parse(localData);
            userData = { ...userData, ...parsed };
            checkDays();
        } catch (e) {
            console.error('Ошибка загрузки', e);
        }
    } else {
        userData.firstVisit = new Date().toISOString();
        saveUserData();
    }
}

function checkDays() {
    if (userData.firstVisit) {
        const first = new Date(userData.firstVisit);
        const now = new Date();
        const diffDays = Math.floor((now - first) / (1000 * 60 * 60 * 24)) + 1;
        userData.daysPlayed = diffDays;
    }
}

// ============ UI ============
function updateUI() {
    document.getElementById('balance').textContent = userData.balance;
    
    const avatar = document.getElementById('profile-avatar');
    const name = document.getElementById('profile-name');
    
    if (userData.userId && window.Telegram?.WebApp) {
        const user = window.Telegram.WebApp.initDataUnsafe?.user;
        if (user?.photo_url) {
            avatar.innerHTML = '<img src="' + user.photo_url + '" alt="avatar">';
        } else if (userData.firstName) {
            avatar.innerHTML = userData.firstName[0].toUpperCase();
        }
    }
    
    if (userData.nickname) {
        name.textContent = userData.nickname;
    } else if (userData.firstName) {
        name.textContent = userData.firstName;
    } else {
        name.textContent = 'Гость';
    }
    
    const level = Math.floor(userData.gamesPlayed / 10) + 1;
    document.getElementById('profile-level').textContent = 'Уровень ' + level;
    
    document.getElementById('stat-balance').textContent = userData.balance;
    document.getElementById('stat-games').textContent = userData.gamesPlayed;
    document.getElementById('stat-wins').textContent = userData.wins;
    document.getElementById('stat-losses').textContent = userData.losses;
    document.getElementById('stat-days').textContent = userData.daysPlayed;
    
    // Показываем админ-кнопку только владельцу
    if (userData.userId === ADMIN_ID) {
        document.getElementById('admin-btn').classList.remove('hidden');
    } else {
        document.getElementById('admin-btn').classList.add('hidden');
    }
}

function addCoins(amount) {
    userData.balance += amount;
    saveUserData();
    updateUI();
}

function spendCoins(amount) {
    if (userData.balance >= amount) {
        userData.balance -= amount;
        saveUserData();
        updateUI();
        return true;
    }
    return false;
}

// ============ СМЕНА НИКА ============
function showChangeNick() {
    document.getElementById('nick-modal').classList.remove('hidden');
    document.getElementById('nick-input').value = userData.nickname || '';
    document.getElementById('nick-input').focus();
}

function closeChangeNick() {
    document.getElementById('nick-modal').classList.add('hidden');
}

function changeNick() {
    const newNick = document.getElementById('nick-input').value.trim();
    
    if (!newNick) {
        showToast('Введи ник!', 'lose');
        return;
    }
    
    if (newNick.length > 20) {
        showToast('Максимум 20 символов!', 'lose');
        return;
    }
    
    if (!spendCoins(50000)) {
        showToast('Нужно 50 000 монет!', 'lose');
        return;
    }
    
    userData.nickname = newNick;
    saveUserData();
    updateUI();
    closeChangeNick();
    showToast('Ник изменён!', 'win');
}

// ============ АДМИН-ПАНЕЛЬ ============
function showAdminPanel() {
    if (userData.userId !== ADMIN_ID) {
        showToast('Нет доступа!', 'lose');
        return;
    }
    
    document.getElementById('admin-modal').classList.remove('hidden');
    document.getElementById('admin-my-id').textContent = userData.userId;
    document.getElementById('admin-total-users').textContent = countUsers();
}

function closeAdminPanel() {
    document.getElementById('admin-modal').classList.add('hidden');
}

function countUsers() {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('clickapp_data_')) {
            count++;
        }
    }
    return count;
}

function adminGiveCoins() {
    const targetId = document.getElementById('admin-user-id').value.trim();
    const amount = parseInt(document.getElementById('admin-amount').value);
    
    if (!targetId || !amount || amount <= 0) {
        showToast('Введи ID и сумму!', 'lose');
        return;
    }
    
    const targetKey = 'clickapp_data_' + targetId;
    const targetData = localStorage.getItem(targetKey);
    
    if (targetData) {
        const parsed = JSON.parse(targetData);
        parsed.balance += amount;
        localStorage.setItem(targetKey, JSON.stringify(parsed));
        showToast('Выдано ' + amount + ' монет!', 'win');
    } else {
        // Создаём нового пользователя
        const newUser = {
            userId: parseInt(targetId),
            username: 'Пользователь',
            firstName: '',
            nickname: null,
            balance: 1000 + amount,
            gamesPlayed: 0,
            wins: 0,
            losses: 0,
            daysPlayed: 1,
            firstVisit: new Date().toISOString(),
            lastVisit: new Date().toISOString()
        };
        localStorage.setItem(targetKey, JSON.stringify(newUser));
        showToast('Пользователь создан!', 'win');
    }
    
    document.getElementById('admin-total-users').textContent = countUsers();
}

function adminRemoveCoins() {
    const targetId = document.getElementById('admin-user-id').value.trim();
    const amount = parseInt(document.getElementById('admin-amount').value);
    
    if (!targetId || !amount || amount <= 0) {
        showToast('Введи ID и сумму!', 'lose');
        return;
    }
    
    const targetKey = 'clickapp_data_' + targetId;
    const targetData = localStorage.getItem(targetKey);
    
    if (targetData) {
        const parsed = JSON.parse(targetData);
        parsed.balance = Math.max(0, parsed.balance - amount);
        localStorage.setItem(targetKey, JSON.stringify(parsed));
        showToast('Забрано ' + amount + ' монет!', 'info');
    } else {
        showToast('Пользователь не найден!', 'lose');
    }
}

// ============ ТОСТ ============
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + type;
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// ============ НАВИГАЦИЯ ============
function showGames() {
    const screens = ['games-screen', 'profile-screen', 'slots-screen', 'roulette-screen', 'dice-screen'];
    screens.forEach(s => document.getElementById(s).classList.add('hidden'));
    
    document.getElementById('games-screen').classList.remove('hidden');
    document.getElementById('nav-games').classList.add('active');
    document.getElementById('nav-profile').classList.remove('active');
}

function showProfile() {
    const screens = ['games-screen', 'profile-screen', 'slots-screen', 'roulette-screen', 'dice-screen'];
    screens.forEach(s => document.getElementById(s).classList.add('hidden'));
    
    document.getElementById('profile-screen').classList.remove('hidden');
    document.getElementById('nav-games').classList.remove('active');
    document.getElementById('nav-profile').classList.add('active');
    updateUI();
}

function showGame(game) {
    const screens = ['games-screen', 'profile-screen', 'slots-screen', 'roulette-screen', 'dice-screen'];
    screens.forEach(s => document.getElementById(s).classList.add('hidden'));
    
    if (game === 'menu') {
        document.getElementById('games-screen').classList.remove('hidden');
    } else {
        document.getElementById(game + '-screen').classList.remove('hidden');
    }
    
    document.getElementById('nav-games').classList.add('active');
    document.getElementById('nav-profile').classList.remove('active');
}

// ============ СЛОТЫ ============
let isSpinning = false;

function spin() {
    if (isSpinning) return;
    if (!spendCoins(100)) {
        showToast('Недостаточно монет!', 'lose');
        return;
    }

    isSpinning = true;
    userData.gamesPlayed++;
    
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.disabled = true;
    spinBtn.innerHTML = '<span>Крутим...</span>';
    
    const slots = [1, 2, 3].map(i => document.getElementById('slot' + i));
    
    slots.forEach(slot => slot.classList.add('spinning'));
    
    let spinInterval = setInterval(() => {
        slots.forEach(slot => {
            slot.innerHTML = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        });
    }, 80);

    setTimeout(() => {
        clearInterval(spinInterval);
        
        const result = slots.map(slot => {
            const symbol = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
            slot.innerHTML = symbol;
            return symbol;
        });
        
        slots.forEach(slot => slot.classList.remove('spinning'));

        if (result[0] === result[1] && result[1] === result[2]) {
            addCoins(500);
            userData.wins++;
            slots.forEach(slot => slot.classList.add('winner'));
            showResult('slot-result', 'ДЖЕКПОТ! +500 монет!', 'win');
            showToast('ДЖЕКПОТ! +500 монет!', 'win');
        } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
            addCoins(150);
            userData.wins++;
            showResult('slot-result', 'Две одинаковые! +150 монет', 'win');
            showToast('+150 монет', 'win');
        } else {
            userData.losses++;
            showResult('slot-result', 'Попробуй ещё раз', 'lose');
        }

        setTimeout(() => {
            slots.forEach(slot => slot.classList.remove('winner'));
        }, 1000);

        saveUserData();
        isSpinning = false;
        spinBtn.disabled = false;
        spinBtn.innerHTML = '<span>Крутить</span><span class="btn-cost">100 монет</span>';
    }, 2000);
}

// ============ РУЛЕТКА (НОВАЯ) ============
function betRoulette(color) {
    if (isRouletteSpinning) return;
    if (!spendCoins(100)) {
        showToast('Недостаточно монет!', 'lose');
        return;
    }

    isRouletteSpinning = true;
    userData.gamesPlayed++;
    
    const svg = document.querySelector('.roulette-svg');
    const resultIndex = Math.floor(Math.random() * rouletteNumbers.length);
    const result = rouletteNumbers[resultIndex];
    
    // Расчёт угла для остановки
    const anglePerCell = 360 / rouletteNumbers.length;
    const targetAngle = resultIndex * anglePerCell;
    const fullSpins = 5;
    const totalRotation = fullSpins * 360 + (360 - targetAngle) + 90;
    
    svg.classList.add('spinning');
    
    setTimeout(() => {
        svg.classList.remove('spinning');
        svg.style.transform = 'rotate(' + totalRotation + 'deg)';
    }, 500);
    
    setTimeout(() => {
        let win = false;
        let winAmount = 0;
        
        if (color === 'zero' && result.color === 'green') {
            win = true;
            winAmount = 1400;
        } else if (color === 'red' && result.color === 'red') {
            win = true;
            winAmount = 200;
        } else if (color === 'black' && result.color === 'black') {
            win = true;
            winAmount = 200;
        }
        
        if (win) {
            addCoins(winAmount);
            userData.wins++;
            showResult('roulette-result', 'Выпало ' + result.num + ' (' + result.color + ')! +' + winAmount + ' монет!', 'win');
            showToast('+' + winAmount + ' монет!', 'win');
        } else {
            userData.losses++;
            showResult('roulette-result', 'Выпало ' + result.num + ' (' + result.color + '). Не угадал!', 'lose');
        }
        
        saveUserData();
        isRouletteSpinning = false;
        
        setTimeout(() => {
            svg.style.transition = 'none';
            svg.style.transform = 'rotate(0deg)';
            setTimeout(() => {
                svg.style.transition = 'transform 4s cubic-bezier(0.1, 0.7, 0.1, 1)';
            }, 50);
        }, 2000);
    }, 4000);
}

// ============ КОСТИ ============
function betDice(choice) {
    if (!spendCoins(100)) {
        showToast('Недостаточно монет!', 'lose');
        return;
    }

    userData.gamesPlayed++;
    const dice = document.getElementById('dice-result');
    
    dice.classList.add('rolling');
    
    let rollInterval = setInterval(() => {
        dice.innerHTML = diceFaces[Math.floor(Math.random() * 6)];
    }, 100);

    setTimeout(() => {
        clearInterval(rollInterval);
        dice.classList.remove('rolling');
        dice.classList.add('result');
        
        const result = Math.floor(Math.random() * 6);
        dice.innerHTML = diceFaces[result];
        
        const isLow = result <= 2;
        
        if ((choice === 'low' && isLow) || (choice === 'high' && !isLow)) {
            addCoins(200);
            userData.wins++;
            showResult('dice-message', 'Выпало ' + (result + 1) + '! +200 монет!', 'win');
            showToast('+200 монет', 'win');
        } else {
            userData.losses++;
            showResult('dice-message', 'Выпало ' + (result + 1) + '. Не угадал!', 'lose');
        }
        
        setTimeout(() => {
            dice.classList.remove('result');
        }, 1000);
        
        saveUserData();
    }, 1500);
}

// ============ РЕЗУЛЬТАТЫ ============
function showResult(elementId, message, type) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.className = 'result-message ' + type;
}

// ============ ЗАПУСК ============
init();