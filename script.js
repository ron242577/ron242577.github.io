var cachelist = []
var previndex = -1
var data = null
var ans = null

function next(clicked) {
  //put random qn in question h1 element and set stats
  randomqn(clicked)

  //play press audio
  const audio = new Audio('assets/press.mp3');
  audio.play();

  //restart animations
  question = document.getElementById("question");
  question.style.animation = 'none';
  question.offsetHeight;
  question.style.animation = null;

  // If YES button is clicked, go to flower-index.html
  if (clicked.id === "buttonyes") {
    setTimeout(() => {
      window.location.href = 'flower-index.html';
    }, 300); // Delay for audio/animation (optional)
  }
}

// helper: smoothly fade out, change text, fade in
async function smoothChangeText(el, newText, duration = 260) {
  // ensure element has an explicit opacity & transition context
  el.style.transition = `opacity ${duration}ms ease`;
  el.style.opacity = el.style.opacity || '1';
  // fade out
  el.style.opacity = '0';
  await new Promise(r => setTimeout(r, duration));
  // swap text
  el.innerHTML = newText;
  // fade in
  el.style.opacity = '1';
  await new Promise(r => setTimeout(r, duration));
  // cleanup inline transition (keep if you prefer)
  el.style.transition = '';
}

async function randomqn(clicked) {

  //change this in production
  if (previndex == -1 && clicked.id == "buttonyes") {

    // const response2 = await fetch("http://192.168.0.111:5500//assets/answers.json")

    data = await response.json()
    ans = await response2.json()

    previndex = 0;
  }

  else if (previndex == -1 && clicked.id == "buttonno") {
    pressedno = ["Please Press Yes", "Yes feels right.", "Press Yes for good grades", "Press YES to start", "Go for yes", "Only yes works.", "Do you like flowers?"]

    // smooth text transition instead of instant swap
    await smoothChangeText(document.getElementById("question"),
      pressedno[Math.floor(Math.random() * pressedno.length)], 260);
  }

  //changing STATS
  if (previndex != -1) {

    qnno = Math.floor(Math.random() * (Object.keys(data).length))
    while (cachelist.includes(qnno)) {
      qnno = Math.floor(Math.random() * (Object.keys(data).length))
    }

    // smooth transition for questions as well
    await smoothChangeText(document.getElementById("question"), data[qnno], 260);
    cachelist.push(qnno);

    document.getElementById("stats-text").innerHTML =
      "answered " + clicked.id.slice(6).toUpperCase() + " to<br>" + data[previndex]

    if (clicked.id == "buttonyes")
      percent = ans[previndex]

    else
      percent = 100 - ans[previndex]

    document.getElementById("stats-percentage").innerHTML = percent.toString() + "%"

    if (previndex != 0)
      document.getElementById("stats").style.visibility = "visible";

    previndex = qnno;
  }

  // repeat qns endlessly
  if (data != null)
    if (cachelist.length == Object.keys(data).length) {
      cachelist = []
    }
}

function goToPortrait() {
    // Play the press audio if needed
    const audio = new Audio('assets/press.mp3');
    audio.play();
    
    // Navigate to the portrait page using relative path
    window.location.href = 'flower-index.html';
}
