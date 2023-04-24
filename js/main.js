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
      <input type="text" class="memo-title ${
        title ? "hidden" : ""
      }" value="${title}" maxlength="20" placeholder="제목" />
      <button class="edit">등록</button>
      <button class="delete">삭제</button>
    </div>
    <div class="show-text ${text ? "" : "hidden"}">${text}</div>
    <textarea class="${text ? "hidden" : ""}">${text}</textarea>
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

    if (editBtn.textContent === "등록") {
      editBtn.textContent = "수정";
      textArea.focus();

      if (!titleArea.value) {
        const now = new Date();
        titleArea.value = `${now.getFullYear()}.${
          now.getMonth() + 1
        }.${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
        titleShow.innerHTML = titleArea.value;
      }
      textShow.innerHTML = textArea.value;
    } else {
      textShow.innerHTML = textArea.value;
      titleShow.innerHTML = titleArea.value;
      editBtn.textContent = "등록";
      update();
    }
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
