// ============ РУЛЕТКА С SVG ЯЧЕЙКАМИ (ОПТИМИЗИРОВАННАЯ) ============
const rouletteNumbers = [
    { num: 0, color: 'zero' },
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
let currentRotation = 0;

// ============ ПОСТРОЕНИЕ ЯЧЕЕК (ОДИН РАЗ) ============
function buildRoulette() {
    const cellsGroup = document.getElementById('roulette-cells');
    if (!cellsGroup) return;
    cellsGroup.innerHTML = '';
    
    const NS = 'http://www.w3.org/2000/svg';
    const centerX = 120;
    const centerY = 120;
    const outerRadius = 105;
    const innerRadius = 38;
    const angleStep = 360 / rouletteNumbers.length;
    
    rouletteNumbers.forEach((item, index) => {
        const startAngle = index * angleStep - 90;
        const endAngle = (index + 1) * angleStep - 90;
        
        const x1 = centerX + innerRadius * Math.cos(startAngle * Math.PI / 180);
        const y1 = centerY + innerRadius * Math.sin(startAngle * Math.PI / 180);
        const x2 = centerX + outerRadius * Math.cos(startAngle * Math.PI / 180);
        const y2 = centerY + outerRadius * Math.sin(startAngle * Math.PI / 180);
        const x3 = centerX + outerRadius * Math.cos(endAngle * Math.PI / 180);
        const y3 = centerY + outerRadius * Math.sin(endAngle * Math.PI / 180);
        const x4 = centerX + innerRadius * Math.cos(endAngle * Math.PI / 180);
        const y4 = centerY + innerRadius * Math.sin(endAngle * Math.PI / 180);
        
        const path = document.createElementNS(NS, 'path');
        path.setAttribute('d', 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2 + ' L ' + x3 + ' ' + y3 + ' L ' + x4 + ' ' + y4 + ' Z');
        
        let fillColor;
        if (item.color === 'zero') fillColor = '#006600';
        else if (item.color === 'red') fillColor = '#cc0000';
        else fillColor = '#1a1a1a';
        
        path.setAttribute('fill', fillColor);
        path.setAttribute('stroke', '#ffd700');
        path.setAttribute('stroke-width', '0.5');
        
        cellsGroup.appendChild(path);
        
        // Цифры
        if (item.num !== 0) {
            const textAngle = ((startAngle + endAngle) / 2) * Math.PI / 180;
            const textRadius = (innerRadius + outerRadius) / 2;
            const tx = centerX + textRadius * Math.cos(textAngle);
            const ty = centerY + textRadius * Math.sin(textAngle);
            
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
    
    const rotor = document.getElementById('roulette-rotor');
    const resultIndex = Math.floor(Math.random() * rouletteNumbers.length);
    const result = rouletteNumbers[resultIndex];
    
    // Расчёт угла поворота
    const anglePerCell = 360 / rouletteNumbers.length;
    const targetAngle = resultIndex * anglePerCell;
    const extraSpins = 3;
    const newRotation = currentRotation + extraSpins * 360 + (360 - targetAngle) + 90;
    
    currentRotation = newRotation;
    
    // Применяем transform к rotor (не перерисовываем SVG)
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
    }, 3000);
}