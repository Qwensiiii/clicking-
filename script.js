// ============ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ============
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
        avatar.textContent = userData.firstName[0].toUpperCase();
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

// ============ НАВИГАЦИЯ ============
function showGames() {
    const screens = ['games-screen', 'profile-screen', 'slots-screen', 'roulette-screen', 'dice-screen'];
    
    screens.forEach(s => {
        document.getElementById(s).classList.add('hidden');
    });
    
    document.getElementById('games-screen').classList.remove('hidden');
    
    document.getElementById('nav-games').classList.add('active');
    document.getElementById('nav-profile').classList.remove('active');
}

function showProfile() {
    const screens = ['games-screen', 'profile-screen', 'slots-screen', 'roulette-screen', 'dice-screen'];
    
    screens.forEach(s => {
        document.getElementById(s).classList.add('hidden');
    });
    
    document.getElementById('profile-screen').classList.remove('hidden');
    
    document.getElementById('nav-games').classList.remove('active');
    document.getElementById('nav-profile').classList.add('active');
    
    updateUI();
}

function showGame(game) {
    const screens = ['games-screen', 'profile-screen', 'slots-screen', 'roulette-screen', 'dice-screen'];
    
    screens.forEach(s => {
        document.getElementById(s).classList.add('hidden');
    });
    
    if (game === 'menu') {
        document.getElementById('games-screen').classList.remove('hidden');
    } else {
        document.getElementById(game + '-screen').classList.remove('hidden');
    }
    
    document.getElementById('nav-games').classList.add('active');
    document.getElementById('nav-profile').classList.remove('active');
}

// ============ СЛОТЫ ============
const slotEmojis = ['🍒', '🍋', '💎', '7️⃣', '⭐', '🔔'];
let isSpinning = false;

function spin() {
    if (isSpinning) return;
    if (!spendCoins(100)) {
        showResult('slot-result', 'Недостаточно фишек!', 'lose');
        return;
    }

    isSpinning = true;
    userData.gamesPlayed++;
    
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.disabled = true;
    spinBtn.textContent = 'Крутим...';

    document.getElementById('slot-result').textContent = '';
    document.getElementById('slot-result').className = 'result-message';

    const slots = [1, 2, 3].map(i => document.getElementById('slot' + i));
    
    let spinInterval = setInterval(() => {
        slots.forEach(slot => {
            slot.textContent = slotEmojis[Math.floor(Math.random() * slotEmojis.length)];
        });
    }, 100);

    setTimeout(() => {
        clearInterval(spinInterval);

        const result = slots.map(slot => {
            const emoji = slotEmojis[Math.floor(Math.random() * slotEmojis.length)];
            slot.textContent = emoji;
            return emoji;
        });

        if (result[0] === result[1] && result[1] === result[2]) {
            addCoins(500);
            userData.wins++;
            showResult('slot-result', '🎉 ДЖЕКПОТ! +500 фишек!', 'win');
        } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
            addCoins(150);
            userData.wins++;
            showResult('slot-result', '✨ Две одинаковые! +150 фишек', 'win');
        } else {
            userData.losses++;
            showResult('slot-result', '😢 Попробуй ещё раз', 'lose');
        }

        saveUserData();
        isSpinning = false;
        spinBtn.disabled = false;
        spinBtn.textContent = 'Крутить (100)';
    }, 2000);
}

// ============ РУЛЕТКА ============
function betRoulette(color) {
    if (!spendCoins(100)) {
        showResult('roulette-result', 'Недостаточно фишек!', 'lose');
        return;
    }

    userData.gamesPlayed++;
    const wheel = document.getElementById('wheel');
    const numbers = ['green', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black'];
    const result = numbers[Math.floor(Math.random() * numbers.length)];
    const rotation = 720 + Math.floor(Math.random() * 360);
    wheel.style.transform = 'rotate(' + rotation + 'deg)';

    setTimeout(() => {
        if (result === color) {
            const winAmount = color === 'green' ? 1400 : 200;
            addCoins(winAmount);
            userData.wins++;
            showResult('roulette-result', '🎉 Выпало ' + result + '! +' + winAmount + ' фишек!', 'win');
        } else {
            userData.losses++;
            showResult('roulette-result', '😢 Выпало ' + result + '. Повезёт в другой раз!', 'lose');
        }
        
        saveUserData();
        
        setTimeout(() => {
            wheel.style.transform = 'rotate(0deg)';
        }, 1000);
    }, 3000);
}

// ============ КОСТИ ============
function betDice(choice) {
    if (!spendCoins(100)) {
        showResult('dice-message', 'Недостаточно фишек!', 'lose');
        return;
    }

    userData.gamesPlayed++;
    const dice = document.getElementById('dice-result');
    const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    
    let rollInterval = setInterval(() => {
        dice.textContent = diceEmojis[Math.floor(Math.random() * 6)];
    }, 100);

    setTimeout(() => {
        clearInterval(rollInterval);
        
        const result = Math.floor(Math.random() * 6) + 1;
        dice.textContent = diceEmojis[result - 1];
        
        const isLow = result <= 3;
        
        if ((choice === 'low' && isLow) || (choice === 'high' && !isLow)) {
            addCoins(200);
            userData.wins++;
            showResult('dice-message', '🎉 Выпало ' + result + '! +200 фишек!', 'win');
        } else {
            userData.losses++;
            showResult('dice-message', '😢 Выпало ' + result + '. Не угадал!', 'lose');
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
    }
}

// ============ ЗАПУСК ============
init();