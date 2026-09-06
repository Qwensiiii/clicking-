* { margin: 0; padding: 0; box-sizing: border-box; user-select: none; -webkit-tap-highlight-color: transparent; }

body {
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, sans-serif;
    color: white;
    overflow: hidden;
    touch-action: manipulation;
}

.header {
    background: rgba(26,26,46,0.9);
    padding: 15px 20px;
    border-bottom: 2px solid #ffd700;
}

.header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
}

.logo {
    font-size: 18px;
    font-weight: 900;
    color: #ffd700;
}

.balance-box {
    background: rgba(255,215,0,0.15);
    border: 1px solid rgba(255,215,0,0.3);
    border-radius: 20px;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    gap: 7px;
}

.balance {
    font-size: 17px;
    font-weight: 700;
    color: #ffd700;
}

.screen {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow-y: auto;
}

.hidden { display: none !important; }

.screen-title {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 20px;
}

.menu-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 380px;
}

.menu-item {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 18px;
    padding: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: all 0.2s;
}

.menu-item:active {
    transform: scale(0.95);
    border-color: #ffd700;
}

.menu-icon-box {
    width: 48px;
    height: 48px;
    background: rgba(255,215,0,0.12);
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
}

.menu-text { flex: 1; }
.menu-title { font-size: 16px; font-weight: 700; }
.menu-desc { font-size: 12px; color: #a0a0b0; margin-top: 3px; }
.arrow { color: #ffd700; font-size: 20px; flex-shrink: 0; }

.back-btn {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: white;
    padding: 9px 14px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 15px;
    font-size: 13px;
    align-self: flex-start;
}

.game-box {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 20px;
    padding: 22px 16px;
    width: 100%;
    max-width: 340px;
    text-align: center;
}

.game-title { font-size: 20px; font-weight: 800; margin-bottom: 12px; }

.btn {
    background: linear-gradient(135deg, #ffd700, #ff8c00);
    color: #1a1a2e;
    border: none;
    padding: 14px 25px;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    max-width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
}

.btn:active { transform: scale(0.95); }
.btn:disabled { background: #555; color: #999; }
.btn-cost { font-size: 12px; font-weight: 500; }

.slots-row { display: flex; justify-content: center; gap: 10px; margin: 18px 0; }

.slot {
    width: 65px;
    height: 65px;
    background: rgba(0,0,0,0.4);
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    border: 2px solid rgba(255,215,0,0.3);
    color: #ffd700;
}

.slot.spinning { animation: shake 0.1s linear infinite; }
@keyframes shake { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }

.roulette-icon { font-size: 70px; margin: 15px 0; }

.dice-box { display: flex; align-items: center; justify-content: center; margin: 18px 0; font-size: 70px; }
.dice-box.rolling { animation: roll 0.1s linear infinite; }
@keyframes roll { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.bet-buttons { display: flex; gap: 8px; margin: 12px 0; flex-wrap: wrap; justify-content: center; }

.bet-btn {
    padding: 10px 16px;
    border-radius: 10px;
    border: none;
    font-size: 13px;
    cursor: pointer;
    font-weight: 700;
    transition: all 0.2s;
}

.bet-btn:active { transform: scale(0.9); }
.bet-red { background: #cc0000; color: white; }
.bet-black { background: #222; color: white; }
.bet-green { background: #006600; color: white; }
.bet-low { background: #333; color: white; }
.bet-high { background: #ffd700; color: #1a1a2e; }
.bet-info { font-size: 12px; color: #a0a0b0; margin-top: 5px; }

.result-message { font-size: 17px; margin: 10px; min-height: 25px; text-align: center; font-weight: 700; }
.win { color: #00ff00; }
.lose { color: #ff4444; }

.profile-card {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 20px;
    padding: 22px 16px;
    width: 100%;
    max-width: 340px;
    text-align: center;
}

.profile-avatar {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffd700, #ff8c00);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px;
    font-size: 30px;
    font-weight: 900;
    color: #1a1a2e;
}

.profile-name { font-size: 19px; font-weight: 800; margin-bottom: 5px; }
.profile-id { font-size: 12px; color: #999; margin-bottom: 15px; }
.profile-stats { width: 100%; }

.stat-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    background: rgba(255,255,255,0.05);
    border-radius: 10px;
    margin-bottom: 6px;
}

.stat-label { color: #a0a0b0; font-size: 12px; }
.stat-value { font-weight: 700; color: #ffd700; font-size: 13px; }
.stat-win { color: #00ff00 !important; }
.stat-lose { color: #ff4444 !important; }

.admin-btn {
    background: linear-gradient(135deg, #ff4444, #cc0000);
    color: white;
    padding: 11px 16px;
    border-radius: 11px;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    margin: 12px auto 0;
    display: block;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
}

.modal {
    background: #2a2a4a;
    border-radius: 18px;
    padding: 22px 18px;
    width: 90%;
    max-width: 310px;
    text-align: center;
}

.modal-title { font-size: 17px; font-weight: 800; margin-bottom: 12px; }

.text-input {
    width: 100%;
    padding: 11px;
    border-radius: 9px;
    border: 1px solid rgba(255,255,255,0.3);
    background: rgba(0,0,0,0.3);
    color: white;
    font-size: 14px;
    text-align: center;
    outline: none;
    margin-bottom: 8px;
}

.admin-give-btn { width: 100%; padding: 10px; border-radius: 9px; border: none; background: #00aa00; color: white; font-weight: 700; cursor: pointer; margin-bottom: 8px; }
.admin-take-btn { width: 100%; padding: 10px; border-radius: 9px; border: none; background: #cc0000; color: white; font-weight: 700; cursor: pointer; margin-bottom: 8px; }
.admin-close-btn { width: 100%; padding: 10px; border-radius: 9px; border: none; background: #333; color: white; font-weight: 700; cursor: pointer; }

.bottom-nav {
    display: flex;
    background: rgba(26,26,46,0.9);
    border-top: 1px solid rgba(255,255,255,0.1);
}

.bottom-nav button {
    flex: 1;
    background: none;
    border: none;
    color: #a0a0b0;
    padding: 11px 5px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    font-size: 12px;
}

.bottom-nav button.active { color: #ffd700; }
.nav-icon { font-size: 20px; }

.toast {
    position: fixed;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 16px;
    border-radius: 9px;
    font-weight: 700;
    font-size: 12px;
    z-index: 100;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s;
}

.toast.show { opacity: 1; }
.toast.win { background: #00aa00; color: white; }
.toast.lose { background: #ff4444; color: white; }
.toast.info { background: #ffd700; color: #1a1a2e; }