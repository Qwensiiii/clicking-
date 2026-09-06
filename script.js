let userData = { userId: null, balance: 1000, gamesPlayed: 0, wins: 0, losses: 0 };
const ADMIN_ID = 8903772507;

const slotSymbols = [
    '<svg viewBox="0 0 24 24" fill="#ffd700" width="28" height="28"><path d="M6 3h12l4 6-10 12L2 9z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="#ffd700" width="28" height="28"><path d="M3 7l4 5 5-6 5 6 4-5-2 12H5z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="#ffd700" width="28" height="28"><path d="M12 2L15 9H22L16 14L19 21L12 16L5 21L8 14L2 9H9L12 2Z"/></svg>',
    '<svg viewBox="0 0 24 24" width="28" height="28"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="17" font-weight="900" fill="#ffd700" font-family="Arial">7</text></svg>',
    '<svg viewBox="0 0 24 24" fill="#ffd700" width="28" height="28"><path d="M12 2a6 6 0 0 0-6 6v3a6 6 0 0 1-1 3.5L4 17h16l-1-2.5a6 6 0 0 1-1-3.5V8a6 6 0 0 0-6-6z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="#ffd700" width="28" height="28"><path d="M12 21s-8-5.5-8-11a4 4 0 0 1 8-2.5A4 4 0 0 1 20 10c0 5.5-8 11-8 11z"/></svg>'
];

const diceFaces = [
    '<svg viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="1.5" width="60" height="60"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="2" fill="#ffd700"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="1.5" width="60" height="60"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="#ffd700"/><circle cx="16" cy="16" r="1.5" fill="#ffd700"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="1.5" width="60" height="60"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="#ffd700"/><circle cx="12" cy="12" r="1.5" fill="#ffd700"/><circle cx="16" cy="16" r="1.5" fill="#ffd700"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="1.5" width="60" height="60"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="#ffd700"/><circle cx="16" cy="8" r="1.5" fill="#ffd700"/><circle cx="8" cy="16" r="1.5" fill="#ffd700"/><circle cx="16" cy="16" r="1.5" fill="#ffd700"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="1.5" width="60" height="60"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="#ffd700"/><circle cx="16" cy="8" r="1.5" fill="#ffd700"/><circle cx="12" cy="12" r="1.5" fill="#ffd700"/><circle cx="8" cy="16" r="1.5" fill="#ffd700"/><circle cx="16" cy="16" r="1.5" fill="#ffd700"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="1.5" width="60" height="60"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5" fill="#ffd700"/><circle cx="16" cy="8" r="1.5" fill="#ffd700"/><circle cx="8" cy="12" r="1.5" fill="#ffd700"/><circle cx="16" cy="12" r="1.5" fill="#ffd700"/><circle cx="8" cy="16" r="1.5" fill="#ffd700"/><circle cx="16" cy="16" r="1.5" fill="#ffd700"/></svg>'
];

function getUserId() {
    // Пробуем получить Telegram ID
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
        return window.Telegram.WebApp.initDataUnsafe.user.id;
    }
    
    // Если нет — генерируем уникальный
    let id = localStorage.getItem('clickapp_uid');
    if (!id) {
        id = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
        localStorage.setItem('clickapp_uid', id);
    }
    return parseInt(id);
}

function init() {
    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
    }
    
    userData.userId = getUserId();
    loadData();
    updateUI();
    showGames();
}

function getKey() { return 'clickapp_user_' + userData.userId; }

function loadData() {
    const data = localStorage.getItem(getKey());
    if (data) {
        try { userData = { ...userData, ...JSON.parse(data) }; } catch(e) {}
    } else {
        saveData();
    }
}

function saveData() { localStorage.setItem(getKey(), JSON.stringify(userData)); }

function updateUI() {
    document.getElementById('balance').textContent = userData.balance;
    document.getElementById('stat-balance').textContent = userData.balance;
    document.getElementById('stat-games').textContent = userData.gamesPlayed;
    document.getElementById('stat-wins').textContent = userData.wins;
    document.getElementById('stat-losses').textContent = userData.losses;
    document.getElementById('profile-id').textContent = userData.userId;
    document.getElementById('profile-name').textContent = 'Игрок';
    document.getElementById('profile-avatar').textContent = userData.userId.toString().charAt(0);
    
    if (userData.userId === ADMIN_ID) {
        document.getElementById('admin-btn').classList.remove('hidden');
    } else {
        document.getElementById('admin-btn').classList.add('hidden');
    }
}

function addCoins(n) { userData.balance += n; saveData(); updateUI(); }

function spendCoins(n) { 
    if (userData.balance >= n) { 
        userData.balance -= n; 
        saveData(); 
        updateUI(); 
        return true; 
    } 
    return false; 
}

function hideAll() {
    ['games-screen', 'profile-screen', 'slots-screen', 'roulette-screen', 'dice-screen'].forEach(function(id) {
        document.getElementById(id).classList.add('hidden');
    });
}

function showGames() {
    hideAll();
    document.getElementById('games-screen').classList.remove('hidden');
    document.getElementById('nav-games').classList.add('active');
    document.getElementById('nav-profile').classList.remove('active');
}

function showProfile() {
    hideAll();
    document.getElementById('profile-screen').classList.remove('hidden');
    document.getElementById('nav-games').classList.remove('active');
    document.getElementById('nav-profile').classList.add('active');
    updateUI();
}

function showGame(game) {
    hideAll();
    if (game === 'menu') {
        document.getElementById('games-screen').classList.remove('hidden');
    } else {
        document.getElementById(game + '-screen').classList.remove('hidden');
    }
}

function showAdmin() {
    if (userData.userId !== ADMIN_ID) { showToast('Нет доступа!', 'lose'); return; }
    document.getElementById('admin-modal').classList.remove('hidden');
}

function closeAdmin() { document.getElementById('admin-modal').classList.add('hidden'); }

function adminGive() {
    const id = document.getElementById('admin-user-id').value.trim();
    const amount = parseInt(document.getElementById('admin-amount').value);
    if (!id || !amount || amount <= 0) { showToast('Введи ID и сумму!', 'lose'); return; }
    
    const key = 'clickapp_user_' + id;
    const data = localStorage.getItem(key);
    if (data) {
        const parsed = JSON.parse(data);
        parsed.balance += amount;
        localStorage.setItem(key, JSON.stringify(parsed));
    } else {
        localStorage.setItem(key, JSON.stringify({ userId: parseInt(id), balance: 1000 + amount, gamesPlayed: 0, wins: 0, losses: 0 }));
    }
    showToast('Выдано ' + amount + ' монет!', 'win');
}

function adminTake() {
    const id = document.getElementById('admin-user-id').value.trim();
    const amount = parseInt(document.getElementById('admin-amount').value);
    if (!id || !amount || amount <= 0) { showToast('Введи ID и сумму!', 'lose'); return; }
    
    const key = 'clickapp_user_' + id;
    const data = localStorage.getItem(key);
    if (data) {
        const parsed = JSON.parse(data);
        parsed.balance = Math.max(0, parsed.balance - amount);
        localStorage.setItem(key, JSON.stringify(parsed));
        showToast('Забрано ' + amount + ' монет!', 'info');
    } else {
        showToast('Игрок не найден!', 'lose');
    }
}

let spinning = false;

function spin() {
    if (spinning) return;
    if (!spendCoins(100)) { showToast('Недостаточно монет!', 'lose'); return; }
    spinning = true;
    userData.gamesPlayed++;
    saveData();
    
    const btn = document.getElementById('spin-btn');
    btn.disabled = true;
    btn.textContent = 'Крутим...';
    
    const slots = [1, 2, 3].map(function(i) { return document.getElementById('slot' + i); });
    slots.forEach(function(s) { s.classList.add('spinning'); });
    
    const interval = setInterval(function() {
        slots.forEach(function(s) { 
            s.innerHTML = slotSymbols[Math.floor(Math.random() * slotSymbols.length)]; 
        });
    }, 80);
    
    setTimeout(function() {
        clearInterval(interval);
        slots.forEach(function(s) { s.classList.remove('spinning'); });
        const result = slots.map(function(s) { return s.innerHTML; });
        
        if (result[0] === result[1] && result[1] === result[2]) {
            addCoins(500); userData.wins++;
            showResult('slot-result', 'ДЖЕКПОТ! +500!', 'win');
        } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
            addCoins(150); userData.wins++;
            showResult('slot-result', '+150!', 'win');
        } else {
            userData.losses++;
            showResult('slot-result', 'Мимо!', 'lose');
        }
        saveData();
        spinning = false;
        btn.disabled = false;
        btn.innerHTML = 'Крутить<span class="btn-cost">100 монет</span>';
    }, 2000);
}

function betRoulette(color) {
    if (!spendCoins(100)) { showToast('Недостаточно монет!', 'lose'); return; }
    userData.gamesPlayed++;
    saveData();
    
    setTimeout(function() {
        const r = Math.random();
        let result;
        if (r < 0.03) result = 'zero';
        else if (r < 0.5) result = 'red';
        else result = 'black';
        
        if ((color === 'zero' && result === 'zero') || (color === 'red' && result === 'red') || (color === 'black' && result === 'black')) {
            const win = color === 'zero' ? 1400 : 200;
            addCoins(win); userData.wins++;
            showResult('roulette-result', 'Выпало ' + result + '! +' + win + '!', 'win');
        } else {
            userData.losses++;
            showResult('roulette-result', 'Выпало ' + result + '. Мимо!', 'lose');
        }
        saveData();
    }, 1000);
}

function betDice(choice) {
    if (!spendCoins(100)) { showToast('Недостаточно монет!', 'lose'); return; }
    userData.gamesPlayed++;
    saveData();
    
    const dice = document.getElementById('dice-result');
    dice.classList.add('rolling');
    
    const interval = setInterval(function() {
        dice.innerHTML = diceFaces[Math.floor(Math.random() * 6)];
    }, 100);
    
    setTimeout(function() {
        clearInterval(interval);
        dice.classList.remove('rolling');
        const result = Math.floor(Math.random() * 6);
        dice.innerHTML = diceFaces[result];
        const isLow = result <= 2;
        
        if ((choice === 'low' && isLow) || (choice === 'high' && !isLow)) {
            addCoins(200); userData.wins++;
            showResult('dice-message', 'Выпало ' + (result + 1) + '! +200!', 'win');
        } else {
            userData.losses++;
            showResult('dice-message', 'Выпало ' + (result + 1) + '. Мимо!', 'lose');
        }
        saveData();
    }, 1500);
}

function showResult(id, msg, type) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.className = 'result-message ' + type;
}

function showToast(msg, type) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = 'toast ' + type + ' show';
    setTimeout(function() { toast.classList.remove('show'); }, 2000);
}

init();