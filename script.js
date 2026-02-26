// ============ Configuration ============
const API_URL = 'https://study-worker-api.annmaxact.workers.dev'; // จะใส่ทีหลังหลังสร้าง Cloudflare Worker

let FOCUS_TIME = 25 * 60;
let BREAK_TIME = 5 * 60;
let TOTAL_ROUNDS = 4;

// ============ Quotes ============
const quotes = [
  {
    text: "ความสำเร็จไม่ได้มาจากความบังเอิญ แต่มาจาก ความเสียสละ ขยันหมั่นเพียร ศึกษาเรียนรู้อย่างหนัก และเหนือสิ่งอื่นใด มันมาจากความรักในสิ่งที่กำลังทำหรือเรียนรู้อยู่นั่นเอง",
    author: "Pele"
  },
  {
    text: "ความสำเร็จคือการก้าวเดินจากความล้มเหลวหนึ่งสู่อีกความล้มเหลวหนึ่ง โดยไม่สูญสิ้นซึ่งแรงศรัทธา",
    author: "Winston Churchill"
  },
  {
    text: "อุปสรรคขวากหนามในชีวิตจริงย่อมมีหนทางเอาชนะ มีเพียงสิ่งที่อยู่ในจินตนาการเท่านั้นที่ไม่อาจเอาชนะได้",
    author: "Theodore N. Vail"
  },
  {
    text: "ทุกวิชาเรียนไปได้ประโยชน์ทั้งนั้น การตัดสินใจถูกต้องในแต่ละครั้งนั้น เราไม่สามารถแยกแยะได้ว่าเป็นเพราะเราเรียนวิชาไหนมาก",
    author: "ไม่ระบุชื่อ"
  },
  {
    text: "การศึกษาต้องสร้างความงาม ความสมบูรณ์ทั้งกาย ใจให้แก่ผู้เรียน",
    author: "ไม่ระบุชื่อ"
  },
  {
    text: "การศึกษาไม่ใช่การเรียนของคนในช่วยอายุหนึ่งเท่านั้น แต่การศึกษาคือการพัฒนาคุณภาพของคนทั้งมวล",
    author: "ไม่ระบุชื่อ"
  },
  {
    text: "ไม่มีผลงานชั้นยอดชิ้นใด ที่ถูกสร้างโดยศิลปินผู้เกียจคร้าน",
    author: "Anonymous"
  },
  {
    text: "หากคุณมีความฝัน คุณจะมีเวลาอีกเหลือเฟือทั้งชีวิตเพื่อศึกษา วางแผน และเตรียมพร้อมเพื่อมัน ซึ่งสิ่งที่คุณควรทำตอนนี้คือ เริ่มลงมือทำ",
    author: "Drew Houston"
  },
  {
    text: "หากไม่มีคณิตศาสตร์ คุณก็ทำอะไรไม่ได้ ทุกสิ่งรอบตัวคุณคือคณิตศาตร์ ทุกสิ่งรอบตัวคุณคือตัวเลข",
    author: "Shakuntala Devi"
  },
  {
    text: "จุดประสงค์ของการเรียนรู้คือ การเติบโต และจิตใจคนเราก็สามารถเติบโตได้เสมอ ตราบเท่าที่เรายังมีชีวิต",
    author: "Mortimer Adler"
  },
  {
    text: "อย่าพยายามเป็นคนที่ประสบความสำเร็จ แต่จงพยายามเป็นคนที่เปี่ยมไปด้วยคุณค่า",
    author: "Albert Einstein"
  },
  {
    text: "ผู้ใดต้องการหาความรู้ เขาจะต้องศึกษา แต่หากผู้ใดอยากมีปัญญา เขาผู้นั้นจะต้องคอยสังเกตการณ์",
    author: "Marilyn Vos Savant"
  },
  {
    text: "การหาความรู้ คือความพยายามที่ก่อให้เกิดผลลัพธ์ที่ดีที่สุด",
    author: "Eraldo Banovac"
  },
  {
    text: "จงทำตัวเป็นนักเรียนตราบเท่าที่ยังมีสิ่งให้ต้องเรียนรู้ ซึ่งนั่นหมายถึงทั้งชีวิตของคุณ",
    author: "Henry L. Doherty"
  },
  {
    text: "จงทำสิ่งที่คุณกลัวหนึ่งอย่างในทุก ๆ วัน",
    author: "Anonymous"
  },
  {
    text: "การศึกษาคือสิ่งที่เหลือรอดเมื่อสิ่งที่เคยได้เรียนรู้ถูกหลงลืมจนหมดสิ้น",
    author: "B. F. Skinner"
  },
  {
    text: "ต่อให้คุณอยู่บนเส้นทางที่ใช่แล้ว คุณก็อาจโดนชนได้ ถ้ายังเอาแต่นั่งอยู่เฉยๆ",
    author: "Anonymous"
  }
];

// ============ State ============
let state = {
  focusMinutes: 25,
  breakMinutes: 5,
  totalRounds: 4,
  currentRound: 1,
  completedRounds: 0,
  timeLeft: FOCUS_TIME,
  totalTime: FOCUS_TIME,
  isRunning: false,
  isBreak: false,
  interval: null,
  
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  totalStudyMinutes: 0,
  streak: 0,
  unlockedThemes: ['default'],
  currentTheme: 'default',
  playerName: '',
  deviceId: '',
  rank: 0
};

// ============ Themes ============
const themes = [
  { id: 'default', name: 'Sunset Vibes', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', unlockLevel: 1 },
  { id: 'ocean', name: 'Ocean Breeze', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', unlockLevel: 2 },
  { id: 'forest', name: 'Forest Fresh', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', unlockLevel: 3 },
  { id: 'candy', name: 'Candy Pop', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', unlockLevel: 5 },
  { id: 'fire', name: 'Fire Energy', gradient: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)', unlockLevel: 7 },
  { id: 'purple', name: 'Purple Dream', gradient: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)', unlockLevel: 10 },
  { id: 'gold', name: 'Golden Hour', gradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)', unlockLevel: 15 },
  { id: 'mint', name: 'Mint Fresh', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', unlockLevel: 20 }
];

// ============ Audio ============
const timerSound = document.getElementById('timerSound');

function playTimerSound() {
  timerSound.currentTime = 0;
  timerSound.play().catch(e => console.log('Audio play failed:', e));
}

// ============ API Functions ============
async function fetchLeaderboard() {
  if (!API_URL) {
    return getLocalLeaderboard();
  }
  
  try {
    const response = await fetch(`${API_URL}/leaderboard`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return getLocalLeaderboard();
  }
}

async function submitScoreToAPI() {
  if (!state.playerName) return;
  
  const playerData = {
    name: state.playerName,
    level: state.level,
    minutes: Math.floor(state.totalStudyMinutes),
    streak: state.streak,
    sessions: state.completedRounds,
    score: state.level * 100 + Math.floor(state.totalStudyMinutes) * 2 + state.streak * 10
  };
  
  if (!API_URL) {
    updateLocalLeaderboard();
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playerData)
    });
    
    const result = await response.json();
    state.rank = result.rank;
    updateDisplay();
  } catch (error) {
    console.error('Error submitting score:', error);
    updateLocalLeaderboard();
  }
}

// ============ LocalStorage Fallback ============
function getLocalLeaderboard() {
  const data = localStorage.getItem('studyBattleLeaderboard');
  return data ? JSON.parse(data) : [];
}

function updateLocalLeaderboard() {
  if (!state.playerName) return;
  
  let board = getLocalLeaderboard();
  const existingIndex = board.findIndex(p => p.name === state.playerName);
  
  const playerData = {
    name: state.playerName,
    level: state.level,
    minutes: Math.floor(state.totalStudyMinutes),
    streak: state.streak,
    sessions: state.completedRounds,
    score: state.level * 100 + Math.floor(state.totalStudyMinutes) * 2 + state.streak * 10
  };
  
  if (existingIndex >= 0) {
    board[existingIndex] = playerData;
  } else {
    board.push(playerData);
  }
  
  board.sort((a, b) => b.score - a.score);
  board = board.slice(0, 10);
  
  localStorage.setItem('studyBattleLeaderboard', JSON.stringify(board));
  state.rank = board.findIndex(p => p.name === state.playerName) + 1;
  updateDisplay();
}

async function renderLeaderboard() {
  const board = await fetchLeaderboard();
  const list = document.getElementById('leaderboardList');
  
  if (board.length === 0) {
    list.innerHTML = '<p style="text-align: center; color: #718096; padding: 20px;">ยังไม่มีนักรบคนไหนส่งคะแนน<br>เป็นคนแรกสิ! 🔥</p>';
    return;
  }
  
  list.innerHTML = board.map((player, index) => {
    const medals = ['🥇', '🥈', '🥉'];
    const medal = index < 3 ? medals[index] : `#${index + 1}`;
    const isMe = player.name === state.playerName;
    
    return `
      <div class="leaderboard-item" style="${isMe ? 'border-color: var(--primary); background: rgba(255, 107, 157, 0.1);' : ''}">
        <div class="leaderboard-rank">${medal}</div>
        <div class="leaderboard-info">
          <div class="leaderboard-name">${player.name} ${isMe ? '(คุณ)' : ''}</div>
          <div class="leaderboard-detail">
            LV${player.level} • ${player.minutes}นาที • 🔥${player.streak}
          </div>
        </div>
        <div class="leaderboard-score">${player.score.toLocaleString()}</div>
      </div>
    `;
  }).join('');
}

// ============ Initialize ============
function init() {
  loadFromStorage();
  updateTimerSettings();
  renderSessionTracker();
  updateDisplay();
  renderThemes();
  createStars();
  updateQuote();
  applyTheme(state.currentTheme);
  
  if (state.playerName) {
    document.getElementById('playerNameInput').value = state.playerName;
  }
}

function loadFromStorage() {
  const saved = localStorage.getItem('studyBattleData');
  if (saved) {
    const data = JSON.parse(saved);
    state = { ...state, ...data };
  }
}

function saveToStorage() {
  localStorage.setItem('studyBattleData', JSON.stringify(state));
}

function updateTimerSettings() {
  state.focusMinutes = parseInt(document.getElementById('focusTime').value);
  state.breakMinutes = parseInt(document.getElementById('breakTime').value);
  state.totalRounds = parseInt(document.getElementById('totalRounds').value);
  
  FOCUS_TIME = state.focusMinutes * 60;
  BREAK_TIME = state.breakMinutes * 60;
  TOTAL_ROUNDS = state.totalRounds;
  
  if (!state.isRunning) {
    state.timeLeft = state.isBreak ? BREAK_TIME : FOCUS_TIME;
    state.totalTime = state.timeLeft;
    updateDisplay();
  }
  
  renderSessionTracker();
  saveToStorage();
}

// ============ Timer Functions ============
function toggleTimer() {
  if (state.isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  state.isRunning = true;
  document.getElementById('startBtn').innerHTML = '⏸️ พัก';
  document.getElementById('modeText').textContent = state.isBreak ? 'กำลังพักผ่อน... 😌' : 'กำลังต่อสู้! ⚔️';
  
  state.interval = setInterval(() => {
    state.timeLeft--;
    
    if (!state.isBreak) {
      state.totalStudyMinutes += 1/60;
    }
    
    updateDisplay();
    
    if (state.timeLeft <= 0) {
      completeSession();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(state.interval);
  state.isRunning = false;
  document.getElementById('startBtn').innerHTML = '▶️ ต่อสู้!';
  document.getElementById('modeText').textContent = 'หยุดชั่วคราว';
}

function resetTimer() {
  clearInterval(state.interval);
  state.isRunning = false;
  state.isBreak = false;
  state.currentRound = 1;
  state.completedRounds = 0;
  
  updateTimerSettings();
  
  document.getElementById('startBtn').innerHTML = '▶️ สู้!';
  document.getElementById('modeText').textContent = 'พร้อมรบ!';
  document.getElementById('modeEmoji').textContent = '⚔️';
  
  updateDisplay();
}

function completeSession() {
  clearInterval(state.interval);
  state.isRunning = false;
  playTimerSound();
  
  if (!state.isBreak) {
    state.completedRounds++;
    state.streak++;
    
    const xpGained = state.focusMinutes * 2;
    addXP(xpGained);
    
    if (state.completedRounds >= TOTAL_ROUNDS) {
      showAchievement('🏆 ชัยชนะ!', `คุณชนะแล้ว! ทำครบ ${TOTAL_ROUNDS} รอบ!`, '🎉');
      state.streak += 10;
      addXP(state.focusMinutes * 10);
      createConfetti();
      submitScoreToAPI();
      setTimeout(() => {
        resetTimer();
      }, 4000);
      return;
    }
    
    state.isBreak = true;
    state.timeLeft = BREAK_TIME;
    state.totalTime = BREAK_TIME;
    document.getElementById('modeEmoji').textContent = '☕';
    document.getElementById('modeText').textContent = 'เวลาพักฟื้น!';
    document.getElementById('startBtn').innerHTML = '▶️ เริ่มพัก';
    
  } else {
    state.currentRound++;
    state.isBreak = false;
    state.timeLeft = FOCUS_TIME;
    state.totalTime = FOCUS_TIME;
    document.getElementById('modeEmoji').textContent = '⚔️';
    document.getElementById('modeText').textContent = 'กลับเข้าสนามรบ!';
    document.getElementById('startBtn').innerHTML = '▶️ สู้ต่อ!';
  }
  
  updateDisplay();
  saveToStorage();
}

// ============ Display Updates ============
function updateDisplay() {
  const mins = Math.floor(state.timeLeft / 60);
  const secs = state.timeLeft % 60;
  document.getElementById('timerText').textContent = 
    `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  
  const circumference = 2 * Math.PI * 110;
  const progress = (state.timeLeft / state.totalTime) * circumference;
  document.getElementById('timerProgress').style.strokeDasharray = circumference;
  document.getElementById('timerProgress').style.strokeDashoffset = circumference - progress;
  
  document.getElementById('totalSessions').textContent = state.completedRounds;
  document.getElementById('totalMinutes').textContent = Math.floor(state.totalStudyMinutes);
  document.getElementById('streak').textContent = state.streak;
  document.getElementById('rank').textContent = state.rank > 0 ? `#${state.rank}` : '-';
  
  document.getElementById('levelBadge').textContent = `LV ${state.level}`;
  document.getElementById('xpText').textContent = `${state.xp} / ${state.xpToNextLevel}`;
  const xpPercent = (state.xp / state.xpToNextLevel) * 100;
  document.getElementById('xpFill').style.width = `${xpPercent}%`;
  
  renderSessionTracker();
  saveToStorage();
}

function renderSessionTracker() {
  const tracker = document.getElementById('sessionTracker');
  tracker.innerHTML = '';
  
  for (let i = 0; i < TOTAL_ROUNDS; i++) {
    const dot = document.createElement('div');
    dot.className = 'session-dot';
    if (i < state.completedRounds) {
      dot.classList.add('completed');
    }
    tracker.appendChild(dot);
  }
}

// ============ Gamification ============
function addXP(amount) {
  state.xp += amount;
  
  while (state.xp >= state.xpToNextLevel) {
    levelUp();
  }
  
  updateDisplay();
}

function levelUp() {
  state.xp -= state.xpToNextLevel;
  state.level++;
  state.xpToNextLevel = Math.floor(state.xpToNextLevel * 1.5);
  
  playTimerSound();
  showAchievement('⚡ LEVEL UP!', `ตอนนี้คุณ Level ${state.level} แล้ว!`, '🎊');
  createConfetti();
  
  const newTheme = themes.find(t => t.unlockLevel === state.level);
  if (newTheme && !state.unlockedThemes.includes(newTheme.id)) {
    state.unlockedThemes.push(newTheme.id);
    setTimeout(() => {
      showAchievement('🎨 ธีมใหม่!', `ปลดล็อก "${newTheme.name}"!`, '✨');
    }, 2500);
  }
  
  renderThemes();
  saveToStorage();
  submitScoreToAPI();
}

function showAchievement(title, desc, icon = '🏆') {
  const popup = document.getElementById('achievementPopup');
  document.getElementById('achievementIcon').textContent = icon;
  document.getElementById('achievementTitle').textContent = title;
  document.getElementById('achievementDesc').textContent = desc;
  
  popup.classList.add('show');
  setTimeout(() => {
    popup.classList.remove('show');
  }, 3000);
}

// ============ Modal Functions ============
function openBattleArena() {
  document.getElementById('battleModal').classList.add('show');
  renderLeaderboard();
}

function closeBattleArena() {
  document.getElementById('battleModal').classList.remove('show');
}

function openThemes() {
  document.getElementById('themesModal').classList.add('show');
}

function closeThemes() {
  document.getElementById('themesModal').classList.remove('show');
}

async function submitScore() {
  const nameInput = document.getElementById('playerNameInput');
  const name = nameInput.value.trim();
  
  if (!name) {
    alert('⚠️ กรุณาใส่ชื่อนักรบของคุณ!');
    return;
  }
  
  state.playerName = name;
  await submitScoreToAPI();
  await renderLeaderboard();
  saveToStorage();
  
  showAchievement('🚀 ส่งแล้ว!', 'คะแนนของคุณถูกบันทึกแล้ว!', '✅');
}

function shareScore() {
  const shareText = `🎮 Study Battle Arena 🎮
  
⚔️ ${state.playerName || 'นักรบนิรนาม'}
🏆 Level ${state.level}
📚 เรียนไป ${Math.floor(state.totalStudyMinutes)} นาที
🔥 Combo ${state.streak} ครั้ง
${state.rank > 0 ? `📊 อันดับ #${state.rank}` : ''}

คะแนน: ${(state.level * 100 + Math.floor(state.totalStudyMinutes) * 2 + state.streak * 10).toLocaleString()}

มาแข่งกับฉันสิ! 💪`;

  if (navigator.share) {
    navigator.share({
      title: 'Study Battle Arena',
      text: shareText
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(shareText).then(() => {
      showAchievement('📋 คัดลอกแล้ว!', 'นำไปแชร์ได้เลย!', '✅');
    });
  }
}

// ============ Themes ============
function renderThemes() {
  const container = document.getElementById('themesContainer');
  container.innerHTML = '';
  
  themes.forEach(theme => {
    const btn = document.createElement('button');
    btn.className = 'theme-btn';
    btn.style.background = theme.gradient;
    btn.title = `${theme.name} (LV${theme.unlockLevel})`;
    
    const isUnlocked = state.unlockedThemes.includes(theme.id);
    if (!isUnlocked) {
      btn.classList.add('locked');
    }
    
    if (state.currentTheme === theme.id) {
      btn.classList.add('active');
    }
    
    btn.onclick = () => {
      if (isUnlocked) {
        state.currentTheme = theme.id;
        applyTheme(theme.id);
        renderThemes();
        saveToStorage();
        showAchievement('🎨 เปลี่ยนธีม!', theme.name, '✨');
      }
    };
    
    container.appendChild(btn);
  });
}

function applyTheme(themeId) {
  const theme = themes.find(t => t.id === themeId);
  if (theme) {
    document.body.style.background = theme.gradient;
  }
}

// ============ Visual Effects ============
function createStars() {
  const container = document.getElementById('bgAnimation');
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    container.appendChild(star);
  }
}

function createConfetti() {
  const colors = ['#ff6b9d', '#ffd93d', '#6BCF7F', '#667eea', '#764ba2'];
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-20px';
    confetti.style.width = (Math.random() * 10 + 5) + 'px';
    confetti.style.height = (Math.random() * 10 + 5) + 'px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear`;
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 4000);
  }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confettiFall {
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(confettiStyle);

function updateQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteBox = document.querySelector('.quote-box');
  quoteBox.querySelector('.quote-text').textContent = `"${quote.text}"`;
  quoteBox.querySelector('.quote-author').textContent = `— ${quote.author}`;
}

// ============ Event Listeners ============
document.getElementById('focusTime').addEventListener('change', updateTimerSettings);
document.getElementById('breakTime').addEventListener('change', updateTimerSettings);
document.getElementById('totalRounds').addEventListener('change', updateTimerSettings);

// ============ Start App ============
init();
setInterval(updateQuote, 30000);
