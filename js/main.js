let allMemo = JSON.parse(localStorage.getItem("allMemo")) ?? [];

const main = document.querySelector("main");
const addBtn = document.querySelector(".add-btn");

addBtn.addEventListener("click", function () {
  const memoWrap = newMemo("", "");
  main.appendChild(memoWrap);
});

allMemo.forEach((memo) => {
  const memoWrap = newMemo(memo.title, memo.text);
  main.appendChild(memoWrap);
});

function newMemo(title = "", text = "") {
  const memoWrap = document.createElement("article");
  memoWrap.classList.add("memo-wrap");
  memoWrap.innerHTML = `
  <div class="top-memo">
  <div class="input-title ${title ? "" : "hidden"}">${title}</div>
  <label for="memo-title" class="a11y-hidden">제목</label>
  <input type="text" class="memo-title ${
    title ? "hidden" : ""
  }" value="${title}" maxlength="17" placeholder="제목" id="memo-title" />
  <button type="button" class="edit" aria-label="메모 수정"></button>
  <button type="button" class="delete" aria-label="메모 삭제"></button>
</div>
<div class="show-text ${text ? "" : "hidden"}">${text}</div>
<label for="memo-text" class="a11y-hidden">내용</label>
<textarea class="${
    text ? "hidden" : ""
  }" id="memo-text" placeholder="내용"></textarea>

  `;

  const editBtn = memoWrap.querySelector(".edit");
  const delBtn = memoWrap.querySelector(".delete");
  const titleArea = memoWrap.querySelector(".memo-title");
  const titleShow = memoWrap.querySelector(".input-title");
  const textShow = memoWrap.querySelector(".show-text");
  const textArea = memoWrap.querySelector("textarea");

  editBtn.addEventListener("click", () => {
    textArea.classList.toggle("hidden");
    textShow.classList.toggle("hidden");
    titleArea.classList.toggle("hidden");
    titleShow.classList.toggle("hidden");

    if (!titleArea.value) {
      const now = new Date();
      titleArea.value = `${now.getFullYear()}.${
        now.getMonth() + 1
      }.${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
      titleShow.innerHTML = titleArea.value;
    }
    textShow.innerHTML = textArea.value;
    titleShow.innerHTML = titleArea.value;
    update();
  });

  delBtn.addEventListener("click", () => {
    memoWrap.remove();
    update();
  });

  titleArea.addEventListener("input", () => {
    titleShow.innerHTML = titleArea.value;
    update();
  });

  return memoWrap;
}

function update() {
  const memoWraps = document.querySelectorAll(".memo-wrap");
  const allMemo = [];

  memoWraps.forEach((memoWrap) => {
    const title = memoWrap.querySelector(".memo-title").value;
    const inputVal = memoWrap.querySelector(".input-title").textContent;
    const text = memoWrap.querySelector("textarea").value;
    const inputVall = memoWrap.querySelector(".show-text").value;

    if (title || text) {
      allMemo.push({ title, text, inputVal, inputVall });
    } else {
      allMemo.push({ title: "", text: "", inputVal: "", inputVall: "" });
    }
  });

  localStorage.setItem("allMemo", JSON.stringify(allMemo));
}

// 배경음악 플레이어
const musicPlayer = document.querySelector(".music-player");
const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn");
const progressBar = document.querySelector(".progress");
const modeSwitchBtn = document.querySelector(".mode-switch-btn");

let isPlaying = false;
let isDarkMode = false;
let currentAudio = null;

function pauseMusic() {
  if (currentAudio) {
    currentAudio.pause();
  }
  isPlaying = false;
}

function stopMusic() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  isPlaying = false;
}

const audio1 = new Audio("./audio/GoodMorning.mp3");
audio1.addEventListener("timeupdate", () => {
  const progress = (audio1.currentTime / audio1.duration) * 100;
  progressBar.style.width = `${progress}%`;
});

const audio2 = new Audio("./audio/NIGHTDANCER.mp3");
audio2.addEventListener("timeupdate", () => {
  const progress = (audio2.currentTime / audio2.duration) * 100;
  progressBar.style.width = `${progress}%`;
});

function playMusic() {
  if (isPlaying) {
    if (currentAudio) {
      currentAudio.play();
    }
  } else {
    isPlaying = true;
    if (!currentAudio) {
      currentAudio = audio1;
    }
    currentAudio.play();
  }
}

function switchMode() {
  if (currentAudio) {
    stopMusic();
  }

  const h1 = document.querySelector("h1");
  const p = document.querySelector("p");
  const body = document.querySelector("body");

  body.classList.toggle("dark");
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    currentAudio = audio2;
    document.querySelector(".title-btn h1").classList.add("neon");

    h1.textContent = "NIGHT\nDANCER";
    p.textContent = "🕺춤추며 언제나 즐겁게!💃";
  } else {
    currentAudio = audio1;
    document.querySelector(".title-btn h1").classList.remove("neon");

    h1.textContent = "Good\nMorning";
    p.textContent = "오늘 하루도 화이팅!";
  }

  if (isPlaying) {
    currentAudio.play();
  }
}

playBtn.addEventListener("click", () => {
  playMusic();
});

pauseBtn.addEventListener("click", () => {
  pauseMusic();
});

modeSwitchBtn.addEventListener("click", () => {
  switchMode();
});
