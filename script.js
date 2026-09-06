// ============ ДАННЫЕ ============
let userData = {
    userId: null,
    username: 'Гость',
    firstName: '',
    balance: 1000,
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    daysPlayed: 1,
    firstVisit: null,
    lastVisit: null
};

// ============ СИМВОЛЫ СЛОТОВ (SVG) ============
const slotSymbols = [
    // Бриллиант
    '<svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21L8 9l4-6 4 6z"/></svg>',
    // Корона
    '<svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35"><path d="M3 7l4 5 5-6 5 6 4-5-2 12H5z"/></svg>',
    // Звезда
    '<svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35"><path d="M12 2L15 9H22L16 14L19 21L12 16L5 21L8 14L2 9H9L12 2Z"/></svg>',
    // Семёрка
    '<svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="22" font-weight="900" fill="currentColor" font-family="Arial">7</text></svg>',
    // Колокольчик
    '<svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35"><path d="M12 2a6 6 0 0 0-6 6v3a6 6 0 0 1-1 3.5L4 17h16l-1-2.5a6 6 0 0 1-1-3.5V8a6 6 0 0 0-6-6z"/><circle cx="12" cy="20" r="2"/></svg>',
    // Сердце
    '<svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35"><path d="M12 21s-8-5.5-8-11a4 4 0 0 1 8-2.5A4 4 0 0 1 20 10c0 5.5-8 11-8 11z"/></svg>'
];

// ============ КУБИК (SVG) ============
const diceFaces = [
    '<svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="8" cy="12" r="1.5" fill="currentColor"/><circle cx="16" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>'
];

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
    updateUI();
    showGames();
}

// ============ СОХРАНЕНИЕ ============
function getStorageKey() {
    return 'casino_data_' + (userData.userId || 'guest');
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
    
    if (userData.firstName) {
        avatar.innerHTML = userData.firstName[0].toUpperCase();
        name.textContent = userData.firstName;
    }
    
    document.getElementById('stat-balance').textContent = userData.balance;
    document.getElementById('stat-games').textContent = userData.gamesPlayed;
    document.getElementById('stat-wins').textContent = userData.wins;
    document.getElementById('stat-losses').textContent = userData.losses;
    document.getElementById('stat-days').textContent = userData.daysPlayed;
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
            const randomSymbol = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
            slot.innerHTML = randomSymbol;
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

// ============ РУЛЕТКА ============
function betRoulette(color) {
    if (!spendCoins(100)) {
        showToast('Недостаточно монет!', 'lose');
        return;
    }

    userData.gamesPlayed++;
    const wheel = document.getElementById('wheel');
    const numbers = ['green', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black'];
    const result = numbers[Math.floor(Math.random() * numbers.length)];
    const rotation = 1440 + Math.floor(Math.random() * 720);
    
    wheel.style.transition = 'transform 4s cubic-bezier(0.1, 0.7, 0.1, 1)';
    wheel.style.transform = 'rotate(' + rotation + 'deg)';

    setTimeout(() => {
        if (result === color) {
            const winAmount = color === 'green' ? 1400 : 200;
            addCoins(winAmount);
            userData.wins++;
            showResult('roulette-result', 'Выпало ' + result + '! +' + winAmount + ' монет!', 'win');
            showToast('+' + winAmount + ' монет', 'win');
        } else {
            userData.losses++;
            showResult('roulette-result', 'Выпало ' + result + '. Повезёт в другой раз!', 'lose');
        }
        
        saveUserData();
        
        setTimeout(() => {
            wheel.style.transition = 'none';
            wheel.style.transform = 'rotate(0deg)';
            setTimeout(() => {
                wheel.style.transition = 'transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)';
            }, 50);
        }, 1000);
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
        const randomFace = diceFaces[Math.floor(Math.random() * 6)];
        dice.innerHTML = randomFace;
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

// ============ СБРОС ============
function resetProfile() {
    if (confirm('Точно сбросить весь прогресс?')) {
        localStorage.removeItem(getStorageKey());
        
        userData.balance = 1000;
        userData.gamesPlayed = 0;
        userData.wins = 0;
        userData.losses = 0;
        userData.firstVisit = new Date().toISOString();
        userData.daysPlayed = 1;
        
        saveUserData();
        updateUI();
        showGames();
        showToast('Профиль сброшен', 'info');
    }
}

// ============ ЗАПУСК ============
init();