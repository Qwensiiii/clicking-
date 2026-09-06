// ============ НАСТРОЙКИ ============
const ADMIN_ID = 8903772507;

// ============ ДАННЫЕ ============
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

const slotSymbols = ['🍒', '🍋', '💎', '7️⃣', '⭐', '🔔'];
const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

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
    console.log('User ID:', userData.userId, 'Admin ID:', ADMIN_ID);
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
    const data = localStorage.getItem(getStorageKey());
    if (data) {
        try {
            userData = { ...userData, ...JSON.parse(data) };
            checkDays();
        } catch (e) {}
    } else {
        userData.firstVisit = new Date().toISOString();
        saveUserData();
    }
}

function checkDays() {
    if (userData.firstVisit) {
        const first = new Date(userData.firstVisit);
        const now = new Date();
        userData.daysPlayed = Math.floor((now - first) / (1000 * 60 * 60 * 24)) + 1;
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
            avatar.innerHTML = '<img src="' + user.photo_url + '">';
        } else if (userData.firstName) {
            avatar.textContent = userData.firstName[0].toUpperCase();
        }
    }
    
    name.textContent = userData.nickname || userData.firstName || 'Гость';
    document.getElementById('profile-level').textContent = 'Уровень ' + (Math.floor(userData.gamesPlayed / 10) + 1);
    document.getElementById('stat-balance').textContent = userData.balance;
    document.getElementById('stat-games').textContent = userData.gamesPlayed;
    document.getElementById('stat-wins').textContent = userData.wins;
    document.getElementById('stat-losses').textContent = userData.losses;
    document.getElementById('stat-days').textContent = userData.daysPlayed;
    
    // АДМИН КНОПКА — проверяем ID
    if (userData.userId === ADMIN_ID) {
        document.getElementById('admin-btn').classList.remove('hidden');
        console.log('Админ-кнопка показана');
    } else {
        document.getElementById('admin-btn').classList.add('hidden');
        console.log('Не админ. User ID:', userData.userId);
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

// ============ НАВИГАЦИЯ ============
function hideAllScreens() {
    ['games-screen', 'profile-screen', 'slots-screen', 'roulette-screen', 'dice-screen'].forEach(s => {
        document.getElementById(s).classList.add('hidden');
    });
}

function showGames() {
    hideAllScreens();
    document.getElementById('games-screen').classList.remove('hidden');
    document.getElementById('nav-games').classList.add('active');
    document.getElementById('nav-profile').classList.remove('active');
}

function showProfile() {
    hideAllScreens();
    document.getElementById('profile-screen').classList.remove('hidden');
    document.getElementById('nav-games').classList.remove('active');
    document.getElementById('nav-profile').classList.add('active');
    updateUI();
}

function showGame(game) {
    hideAllScreens();
    if (game === 'menu') {
        document.getElementById('games-screen').classList.remove('hidden');
    } else {
        document.getElementById(game + '-screen').classList.remove('hidden');
    }
    document.getElementById('nav-games').classList.add('active');
    document.getElementById('nav-profile').classList.remove('active');
}

// ============ СМЕНА НИКА ============
function showChangeNick() {
    document.getElementById('nick-modal').classList.remove('hidden');
    document.getElementById('nick-input').value = userData.nickname || '';
}

function closeChangeNick() {
    document.getElementById('nick-modal').classList.add('hidden');
}

function changeNick() {
    const nick = document.getElementById('nick-input').value.trim();
    if (!nick) { showToast('Введи ник!', 'lose'); return; }
    if (!spendCoins(50000)) { showToast('Нужно 50 000 монет!', 'lose'); return; }
    userData.nickname = nick;
    saveUserData();
    updateUI();
    closeChangeNick();
    showToast('Ник изменён!', 'win');
}

// ============ АДМИН ============
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
        if (localStorage.key(i).startsWith('clickapp_data_')) count++;
    }
    return count;
}

function adminGiveCoins() {
    const id = document.getElementById('admin-user-id').value.trim();
    const amount = parseInt(document.getElementById('admin-amount').value);
    if (!id || !amount || amount <= 0) { showToast('Введи ID и сумму!', 'lose'); return; }
    
    const key = 'clickapp_data_' + id;
    const data = localStorage.getItem(key);
    if (data) {
        const parsed = JSON.parse(data);
        parsed.balance += amount;
        localStorage.setItem(key, JSON.stringify(parsed));
    } else {
        localStorage.setItem(key, JSON.stringify({
            userId: parseInt(id), balance: 1000 + amount, gamesPlayed: 0,
            wins: 0, losses: 0, daysPlayed: 1, firstVisit: new Date().toISOString()
        }));
    }
    showToast('Выдано ' + amount + ' монет!', 'win');
    document.getElementById('admin-total-users').textContent = countUsers();
}

function adminRemoveCoins() {
    const id = document.getElementById('admin-user-id').value.trim();
    const amount = parseInt(document.getElementById('admin-amount').value);
    if (!id || !amount || amount <= 0) { showToast('Введи ID и сумму!', 'lose'); return; }
    
    const key = 'clickapp_data_' + id;
    const data = localStorage.getItem(key);
    if (data) {
        const parsed = JSON.parse(data);
        parsed.balance = Math.max(0, parsed.balance - amount);
        localStorage.setItem(key, JSON.stringify(parsed));
        showToast('Забрано ' + amount + ' монет!', 'info');
    } else {
        showToast('Пользователь не найден!', 'lose');
    }
}

// ============ СЛОТЫ ============
let isSpinning = false;

function spin() {
    if (isSpinning) return;
    if (!spendCoins(100)) { showToast('Недостаточно монет!', 'lose'); return; }
    
    isSpinning = true;
    userData.gamesPlayed++;
    
    const btn = document.getElementById('spin-btn');
    btn.disabled = true;
    btn.innerHTML = '<span>Крутим...</span>';
    
    const slots = [1, 2, 3].map(i => document.getElementById('slot' + i));
    slots.forEach(s => s.classList.add('spinning'));
    
    const interval = setInterval(() => {
        slots.forEach(s => {
            s.textContent = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        });
    }, 80);
    
    setTimeout(() => {
        clearInterval(interval);
        slots.forEach(s => s.classList.remove('spinning'));
        
        const result = slots.map(s => s.textContent);
        
        if (result[0] === result[1] && result[1] === result[2]) {
            addCoins(500);
            userData.wins++;
            showResult('slot-result', 'ДЖЕКПОТ! +500 монет!', 'win');
            showToast('ДЖЕКПОТ! +500!', 'win');
        } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
            addCoins(150);
            userData.wins++;
            showResult('slot-result', 'Две одинаковые! +150', 'win');
        } else {
            userData.losses++;
            showResult('slot-result', 'Попробуй ещё раз', 'lose');
        }
        
        saveUserData();
        isSpinning = false;
        btn.disabled = false;
        btn.innerHTML = '<span>Крутить</span><span class="btn-cost">100 монет</span>';
    }, 2000);
}

// ============ КОСТИ ============
function betDice(choice) {
    if (!spendCoins(100)) { showToast('Недостаточно монет!', 'lose'); return; }
    
    userData.gamesPlayed++;
    const dice = document.getElementById('dice-result');
    
    dice.classList.add('rolling');
    
    const interval = setInterval(() => {
        dice.textContent = diceFaces[Math.floor(Math.random() * 6)];
    }, 100);
    
    setTimeout(() => {
        clearInterval(interval);
        dice.classList.remove('rolling');
        
        const result = Math.floor(Math.random() * 6);
        dice.textContent = diceFaces[result];
        
        const isLow = result <= 2;
        if ((choice === 'low' && isLow) || (choice === 'high' && !isLow)) {
            addCoins(200);
            userData.wins++;
            showResult('dice-message', 'Выпало ' + (result + 1) + '! +200!', 'win');
        } else {
            userData.losses++;
            showResult('dice-message', 'Выпало ' + (result + 1) + '. Мимо!', 'lose');
        }
        saveUserData();
    }, 1500);
}

// ============ РЕЗУЛЬТАТЫ ============
function showResult(elementId, message, type) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.className = 'result-message ' + type;
}

// ============ ТОСТ ============
function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + type + ' show';
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// ============ ЗАПУСК ============
init();