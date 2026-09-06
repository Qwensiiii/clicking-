// ============ РУЛЕТКА (ПРОСТАЯ) ============
let isRouletteSpinning = false;

function betRoulette(color) {
    if (isRouletteSpinning) return;
    if (!spendCoins(100)) { showToast('Недостаточно монет!', 'lose'); return; }
    
    isRouletteSpinning = true;
    userData.gamesPlayed++;
    
    const wheel = document.getElementById('roulette-simple');
    wheel.classList.add('spinning');
    
    // Случайный результат
    const colors = ['red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'zero'];
    const result = colors[Math.floor(Math.random() * colors.length)];
    
    setTimeout(() => {
        wheel.classList.remove('spinning');
        
        let win = false;
        let amount = 0;
        
        if (color === 'zero' && result === 'zero') {
            win = true;
            amount = 1400;
        } else if (color === 'red' && result === 'red') {
            win = true;
            amount = 200;
        } else if (color === 'black' && result === 'black') {
            win = true;
            amount = 200;
        }
        
        if (win) {
            addCoins(amount);
            userData.wins++;
            showResult('roulette-result', 'Выпало ' + result + '! +' + amount + '!', 'win');
            showToast('+' + amount + ' монет!', 'win');
        } else {
            userData.losses++;
            showResult('roulette-result', 'Выпало ' + result + '. Мимо!', 'lose');
        }
        
        saveUserData();
        isRouletteSpinning = false;
    }, 2000);
}