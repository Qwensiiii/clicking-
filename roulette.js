// ============ ДАННЫЕ РУЛЕТКИ ============
const rouletteNumbers = [
    { num: 0, color: 'zero' },
    { num: 32, color: 'red' }, { num: 15, color: 'black' },
    { num: 19, color: 'red' }, { num: 4, color: 'black' },
    { num: 21, color: 'red' }, { num: 2, color: 'black' },
    { num: 25, color: 'red' }, { num: 17, color: 'black' },
    { num: 34, color: 'red' }, { num: 6, color: 'black' },
    { num: 27, color: 'red' }, { num: 13, color: 'black' },
    { num: 36, color: 'red' }, { num: 11, color: 'black' },
    { num: 30, color: 'red' }, { num: 8, color: 'black' },
    { num: 23, color: 'red' }, { num: 10, color: 'black' },
    { num: 5, color: 'red' }, { num: 24, color: 'black' },
    { num: 16, color: 'red' }, { num: 33, color: 'black' },
    { num: 1, color: 'red' }, { num: 20, color: 'black' },
    { num: 14, color: 'red' }, { num: 31, color: 'black' },
    { num: 9, color: 'red' }, { num: 22, color: 'black' },
    { num: 18, color: 'red' }, { num: 29, color: 'black' },
    { num: 7, color: 'red' }, { num: 28, color: 'black' },
    { num: 12, color: 'red' }, { num: 35, color: 'black' },
    { num: 3, color: 'red' }, { num: 26, color: 'black' }
];

let isRouletteSpinning = false;
let currentRotation = 0;

// ============ ПОСТРОЕНИЕ ЯЧЕЕК (ОДИН РАЗ) ============
function buildRoulette() {
    const cellsGroup = document.getElementById('roulette-cells');
    if (!cellsGroup) return;
    
    const NS = 'http://www.w3.org/2000/svg';
    const cx = 120, cy = 120;
    const rOuter = 105, rInner = 38;
    const step = 360 / rouletteNumbers.length;
    
    cellsGroup.innerHTML = '';
    
    rouletteNumbers.forEach((item, i) => {
        const a1 = i * step - 90;
        const a2 = (i + 1) * step - 90;
        
        const rad1 = a1 * Math.PI / 180;
        const rad2 = a2 * Math.PI / 180;
        
        const x1 = cx + rInner * Math.cos(rad1);
        const y1 = cy + rInner * Math.sin(rad1);
        const x2 = cx + rOuter * Math.cos(rad1);
        const y2 = cy + rOuter * Math.sin(rad1);
        const x3 = cx + rOuter * Math.cos(rad2);
        const y3 = cy + rOuter * Math.sin(rad2);
        const x4 = cx + rInner * Math.cos(rad2);
        const y4 = cy + rInner * Math.sin(rad2);
        
        const path = document.createElementNS(NS, 'path');
        path.setAttribute('d', 'M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' L' + x3 + ' ' + y3 + ' L' + x4 + ' ' + y4 + ' Z');
        
        let fill;
        if (item.color === 'zero') fill = '#006600';
        else if (item.color === 'red') fill = '#cc0000';
        else fill = '#1a1a1a';
        
        path.setAttribute('fill', fill);
        path.setAttribute('stroke', '#ffd700');
        path.setAttribute('stroke-width', '0.5');
        cellsGroup.appendChild(path);
        
        // Цифры
        if (item.num !== 0) {
            const midAngle = ((a1 + a2) / 2) * Math.PI / 180;
            const rText = (rInner + rOuter) / 2;
            const tx = cx + rText * Math.cos(midAngle);
            const ty = cy + rText * Math.sin(midAngle);
            
            const text = document.createElementNS(NS, 'text');
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

// ============ СТАВКА ============
function betRoulette(color) {
    if (isRouletteSpinning) return;
    if (!spendCoins(100)) { showToast('Недостаточно монет!', 'lose'); return; }
    
    isRouletteSpinning = true;
    userData.gamesPlayed++;
    saveUserData();
    
    const rotor = document.getElementById('roulette-rotor');
    const resultIndex = Math.floor(Math.random() * rouletteNumbers.length);
    const result = rouletteNumbers[resultIndex];
    
    const anglePerCell = 360 / rouletteNumbers.length;
    const targetAngle = resultIndex * anglePerCell;
    const fullSpins = 4;
    const newRotation = currentRotation + fullSpins * 360 + (360 - targetAngle) + 90;
    currentRotation = newRotation;
    
    rotor.style.transform = 'rotate(' + newRotation + 'deg)';
    
    setTimeout(() => {
        let win = false;
        let amount = 0;
        
        if (color === 'zero' && result.color === 'zero') {
            win = true;
            amount = 1400;
        } else if (color === 'red' && result.color === 'red') {
            win = true;
            amount = 200;
        } else if (color === 'black' && result.color === 'black') {
            win = true;
            amount = 200;
        }
        
        if (win) {
            addCoins(amount);
            userData.wins++;
            showResult('roulette-result', 'Выпало ' + result.num + ' (' + result.color + ')! +' + amount + '!', 'win');
            showToast('+' + amount + ' монет!', 'win');
        } else {
            userData.losses++;
            showResult('roulette-result', 'Выпало ' + result.num + ' (' + result.color + '). Мимо!', 'lose');
        }
        
        saveUserData();
        isRouletteSpinning = false;
    }, 2500);
}