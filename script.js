let qTitle = document.getElementById("question");

let r = document.querySelectorAll(".r");
let r1 = document.getElementById("r1");
let r2 = document.getElementById("r2");
let r3 = document.getElementById("r3");
let r4 = document.getElementById("r4");

let ans1 = document.getElementById("ans1");
let ans2 = document.getElementById("ans2");
let ans3 = document.getElementById("ans3");
let ans4 = document.getElementById("ans4");

let correctAns;

const populate = async () => {
  const response = await fetch("./quiz.json");
  const questions = await response.json();
  return questions;
};

populate().then((q) => {
  correctAns = q[0].correct_ans;

  qTitle.innerText = q[0].question;

  r1.value = q[0].ans1;
  r2.value = q[0].ans2;
  r3.value = q[0].ans3;
  r4.value = q[0].ans4;

  ans1.innerText = q[0].ans1;
  ans2.innerText = q[0].ans2;
  ans3.innerText = q[0].ans3;
  ans4.innerText = q[0].ans4;
});

let ans = document.querySelectorAll(".answers").forEach((answer) =>
  answer.addEventListener("click", (e) => {
    let radio = answer.closest(".answers").querySelector("input");
    console.log(radio.value);
    radio.checked = true;

    if (radio.value == correctAns) {
      document.querySelectorAll(".answers").forEach((ans) => {
        ans.classList.add("incorrect");
      });
      answer.closest(".answers").classList.add("correct");
      answer.closest(".answers").classList.remove("incorrect");
    } else {
      answer.closest(".answers").classList.add("incorrect");
    }
  })
);

let nextBtn = document.getElementById("next").addEventListener("click", () => {
  populate().then((q) => {
    document.querySelectorAll(".answers").forEach((ans) => {
      ans.classList.remove("incorrect");
      ans.classList.remove("correct");
    });

    let random = Math.floor(Math.random() * q.length + 1) - 1;

    correctAns = q[random].correct_ans;

    qTitle.innerText = q[random].question;

    r1.value = q[random].ans1;
    r2.value = q[random].ans2;
    r3.value = q[random].ans3;
    r4.value = q[random].ans4;

    ans1.innerText = q[random].ans1;
    ans2.innerText = q[random].ans2;
    ans3.innerText = q[random].ans3;
    ans4.innerText = q[random].ans4;

    r.forEach((el) => (el.checked = false));
  });
});
