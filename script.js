const intro = document.getElementById("intro");
const letterScreen = document.getElementById("letterScreen");
const memoryScreen = document.getElementById("memoryScreen");
const ending = document.getElementById("ending");
const audio = document.getElementById("song");
const currentLyric = document.getElementById("lyricCurrent");
const nextLyric = document.getElementById("lyricNext");
const musicStatus = document.getElementById("musicStatus");
const soundDot = document.getElementById("soundDot");
const playPause = document.getElementById("playPause");
const musicTime = document.getElementById("musicTime");

const START_AT = 50; // Start the actual audio at 00:50.

const lyrics = [
  [50, "Sa'n man maglayag"],
  [54, "Ikaw lang patutunguhan"],
  [59, "At sa aking pagdating"],
  [63, "Sa 'yo ko lang sasabihing"],
  [68, "Kay palad na ikaw"],
  [73, "Ang kapiling ko sa ilalim ng buwan"],
  [80, "At kay saya na ikaw"],
  [85, "Ang katabi ko sa pagsikat ng araw"],
  [93, "Ooh-ooh, oh, ooh-ooh, oh"],
  [101, "'Di mawawala, gabay ang kalawakan"],
  [107, "Dama ang pananabik, ako'y papalapit na, giliw"],
  [115, "Parating na'ng dapithapon"],
  [120, "At kay sarap umuwi sa 'yo"],
  [126, "Kaya tuwing gabi"],
  [130, "Ako'y nananalangin dahil"],
  [136, "Kay palad na ikaw"],
  [141, "Ang kapiling ko sa ilalim ng buwan"],
  [148, "At kay saya na ikaw"],
  [153, "Ang katabi ko sa pagsikat ng araw"],
  [161, "Ooh-ooh, oh, ooh-ooh, oh"],
  [169, "Ooh-ooh-ooh-ooh-ooh"],
  [176, "Ooh-ooh, oh, ooh-ooh, oh"],
  [184, "Sa'n man maglayag"],
  [188, "Ikaw lang patutunguhan"],
  [193, "Sa'n man maglayag"],
  [197, "Ikaw lang patutunguhan"],
  [202, "Sa'n man maglayag"],
  [206, "Ikaw lang patutunguhan"],
  [211, "Sa'n man maglayag"],
  [215, "Ikaw lang patutunguhan"],
  [220, "Sa'n man maglayag"],
  [224, "Ikaw lang patutunguhan"],
  [229, "At sa aking pagdating"],
  [233, "Sa 'yo ko lang sasabihing"],
  [238, "Kay palad na ikaw"],
  [243, "Ang kapiling sa mga along nagdaan"],
  [250, "At kay saya na ako'y sa 'yo"]
];

let started = false;
let lyricIndex = -1;

function show(el) { el.classList.remove("hidden"); }
function formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
}
function updateLyrics() {
  const t = audio.currentTime;
  let idx = -1;
  for (let i=0;i<lyrics.length;i++) if (t >= lyrics[i][0]) idx=i;
  if (idx !== lyricIndex && idx >= 0) {
    lyricIndex = idx;
    currentLyric.style.opacity = "0";
    setTimeout(() => {
      currentLyric.textContent = lyrics[idx][1];
      nextLyric.textContent = lyrics[idx+1] ? lyrics[idx+1][1] : "";
      currentLyric.style.opacity = "1";
    }, 250);
  }
  musicTime.textContent = formatTime(t);
}
async function startSong() {
  if (!started) {
    started = true;
    audio.currentTime = START_AT;
  }
  try {
    await audio.play();
    playPause.textContent = "Ⅱ";
    musicStatus.textContent = "Now playing from 00:50";
    soundDot.classList.add("playing");
  } catch (e) {
    musicStatus.textContent = "Tap play to start the song";
  }
}

document.getElementById("openEnvelope").addEventListener("click", () => {
  const flap = document.querySelector(".envelope-flap");
  flap.style.transform = "rotateX(180deg)";
  document.querySelector(".envelope").style.transform = "translateY(8px) scale(.94)";
  setTimeout(() => {
    intro.classList.add("hidden");
    show(letterScreen);
    window.scrollTo({top:0,behavior:"smooth"});
  }, 500);
});

document.getElementById("continueBtn").addEventListener("click", async () => {
  show(memoryScreen);
  window.scrollTo({top:0,behavior:"smooth"});
  await startSong();
});

playPause.addEventListener("click", async () => {
  if (audio.paused) {
    if (!started) audio.currentTime = START_AT;
    await audio.play();
    started = true;
    playPause.textContent = "Ⅱ";
    musicStatus.textContent = "Now playing";
    soundDot.classList.add("playing");
  } else {
    audio.pause();
    playPause.textContent = "▶";
    musicStatus.textContent = "Paused";
    soundDot.classList.remove("playing");
  }
});

audio.addEventListener("timeupdate", updateLyrics);
audio.addEventListener("ended", () => {
  playPause.textContent = "▶";
  musicStatus.textContent = "A song for you ♡";
  soundDot.classList.remove("playing");
  show(ending);
});
document.getElementById("againBtn").addEventListener("click", () => {
  audio.pause();
  audio.currentTime = START_AT;
  started = false;
  lyricIndex = -1;
  ending.classList.add("hidden");
  letterScreen.classList.add("hidden");
  memoryScreen.classList.add("hidden");
  intro.classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
});
