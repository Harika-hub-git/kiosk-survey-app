const questions = [
  { id: 1, text: "How satisfied are you?", type: "rating-5" },
  { id: 2, text: "Recommend us?", type: "rating-10" }
];

let index = 0;
let answers = {};

function startSurvey() {
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("survey").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  let q = questions[index];

  document.getElementById("progress").innerText =
    `${index + 1}/${questions.length}`;
  document.getElementById("question").innerText = q.text;

  let options = document.getElementById("options");
  options.innerHTML = "";

  let max = q.type === "rating-5" ? 5 : 10;

  for (let i = 1; i <= max; i++) {
    let btn = document.createElement("button");
    btn.innerText = i;
    btn.onclick = () => (answers[q.id] = i);
    options.appendChild(btn);
  }
}

function next() {
  if (index < questions.length - 1) {
    index++;
    loadQuestion();
  } else {
    submit();
  }
}

function prev() {
  if (index > 0) {
    index--;
    loadQuestion();
  }
}

function skip() {
  if (confirm("Exit survey?")) {
    location.reload();
  }
}

function submit() {
  alert("Survey Submitted!");
  document.getElementById("survey").classList.add("hidden");
  document.getElementById("thankyou").classList.remove("hidden");
}