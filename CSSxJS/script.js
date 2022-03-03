const playerContainer = document.getElementById("player-container");

const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopaBtn = document.getElementById("stopa-btn");
const listbtn = document.getElementById("list-btn");

const playerListContainer = document.getElementById("player-listid-container");
const listofSong = document.getElementById("listid-of-song");

const table = document.getElementById("table");
const headtitle = document.getElementById("head-title");
const vinyl = document.getElementById("vincov");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const album = document.getElementById("album");
const cover = document.getElementById("cover");
const currTime = document.querySelector("#currTime");
const durTime = document.querySelector("#durTime");
const runtime = document.getElementById("runing-time");
const estime = document.getElementById("est-time");

const songlist = document.getElementById("td-id");

const song = [
  "Black-Catcher",
  "Fukai-Mori",
  "01. Hakujitsu",
  "JUSTadICE",
  "Linkin Park - Papercut",
  "Linkin Park - What I-'ve Done",
  "Yesterday",
];
const titleSong = [
  "Black Catcher",
  "Fukai Mori",
  "Hakujitsu",
  "JUSTadICE",
  "Papercut",
  "What I've Done",
  "Yesterday",
];
const artistSong = [
  "Vickeblanka",
  "Do As Infinity",
  "King Gnu",
  "Seiko Oomori",
  "Linkin Park",
  "Linkin Park",
  "Official HIGE DANdism",
];
const albumSong = [
  "Black Catcher",
  "Fukai Mori",
  "白日",
  "JUSTadICE",
  "Hybrid Theory (Bonus Edition)",
  "Minutes to Midnight",
  "Traveler",
];

let songIndex = 0;

loadSong(song[songIndex]);
songinfo();
befstart();
colorlist(songIndex);
// listsongs();
console.log(song.length);

function loadSong(song) {
  audio.src = `source/music/${song}.mp3`;
  cover.src = `source/cover/${song}.jpg`;
}

function befstart() {
  if (songIndex == 0) {
    prevBtn.disabled = true;
    nextBtn.disabled = false;
    console.log("okeh");
  } else if (songIndex == song.length - 1) {
    prevBtn.disabled = false;
    nextBtn.disabled = true;
  }
}

// function listsongs() {
//     song.forEach((item) => {
//         let list = document.createElement('li');
//         list.innerText = item;
//         list.appendChild(li);
//     });
// }

function songinfo() {
  title.innerText = titleSong[songIndex];
  artist.innerText = artistSong[songIndex];
  album.innerText = albumSong[songIndex];
}

playBtn.addEventListener("click", () => {
  play();
});

pauseBtn.addEventListener("click", () => {
  pause();
});

stopaBtn.addEventListener("click", () => {
  stopa();
});

prevBtn.addEventListener("click", () => {
  prev();
});

nextBtn.addEventListener("click", () => {
  next();
});

listbtn.addEventListener("click", () => {
  playerListContainer.classList.toggle("show-list");
  if (playerListContainer.classList.contains("show-list")) {
    console.log("lah koq");
    listbtn.style.backgroundColor = "#B0B6BA";
  } else {
    listbtn.style.backgroundColor = "#fff";
  }
});

function play() {
  playerContainer.classList.add("play-btn");
  audio.play();
  playBtn.style.backgroundColor = "#B0B6BA";
  pauseBtn.style.backgroundColor = "#fff";
  stopaBtn.style.backgroundColor = "#fff";
  vinyl.style.animationPlayState = "running";
  colorlist(songIndex);
  headtitle.innerText = titleSong[songIndex];
}

function pause() {
  playerContainer.classList.add("pause-btn");
  audio.pause();
  pauseBtn.style.backgroundColor = "#B0B6BA";
  playBtn.style.backgroundColor = "#fff";
  stopaBtn.style.backgroundColor = "#fff";
  vinyl.style.animationPlayState = "paused";
  headtitle.innerText = "Web Player";
}

function stopa() {
  playerContainer.classList.add("stop-btn");
  pause();
  audio.currentTime = 0;
  stopaBtn.style.backgroundColor = "#B0B6BA";
  playBtn.style.backgroundColor = "#fff";
  pauseBtn.style.backgroundColor = "#fff";
  vinyl.style.animationPlayState = "paused";
  headtitle.innerText = "Web Player";
}

function prev() {
  songIndex--;
  nextBtn.disabled = false;
  if (songIndex == 0) {
    prevBtn.disabled = true;
  }
  console.log(songIndex);
  stopa();
  loadSong(song[songIndex]);
  songinfo();
  play();
}

function next() {
  songIndex++;
  prevBtn.disabled = false;
  if (songIndex == song.length - 1) {
    nextBtn.disabled = true;
  }
  console.log(songIndex);
  stopa();
  loadSong(song[songIndex]);
  songinfo();
  play();
}

function listclick(nowlist) {
  songIndex = nowlist.rowIndex;
  loadSong(song[songIndex]);
  play();
  songinfo();
  befstart();
  colorlist(songIndex);

  // table.rows[nowlist.rowIndex].classList.toggle('list-clicked');
  console.log(nowlist.rowIndex);
}

function colorlist(Slist) {
  var x = document.getElementsByTagName("td");
  var i;
  for (i = 0; i < x.length; i++) {
    if (i == Slist) {
      table.rows[Slist].style.backgroundColor = "rgb(190, 190, 190)";
    } else {
      table.rows[i].style.backgroundColor = "rgb(121, 121, 121)";
    }
  }
  console.log(x.length);
  console.log(Slist);
}

function runningTime(time) {
  var seconds = Math.floor(time % 60);
  var minutes = Math.floor(time / 60);
  if (seconds < 10) {
    seconds = "0" + seconds.toString();
  }
  var nowtime = minutes + ":" + seconds;
  runtime.innerText = nowtime;
}

function estimateTime(time) {
  var seconds = Math.floor(time % 60);
  var minutes = Math.floor(time / 60);
  if (seconds < 10) {
    seconds = "0" + seconds.toString();
  }
  var estimTime = minutes + ":" + seconds;
  estime.innerText = estimTime;
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  runningTime(currentTime);
  estimateTime(duration);
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

audio.onended = function () {
  prevBtn.disabled = false;
  if (songIndex == song.length - 1) {
    nextBtn.disabled = true;
    console.log("beng");
    vinyl.style.animationPlayState = "paused";
    stopaBtn.style.backgroundColor = "#B0B6BA";
    playBtn.style.backgroundColor = "#fff";
    pauseBtn.style.backgroundColor = "#fff";
  } else {
    console.log(songIndex);
    next();
  }
};

audio.onpause = function () {
  pauseBtn.style.backgroundColor = "#B0B6BA";
  playBtn.style.backgroundColor = "#fff";
  stopaBtn.style.backgroundColor = "#fff";
  vinyl.style.animationPlayState = "paused";
  headtitle.innerText = "Web Player";
};

audio.onplay = function () {
  playBtn.style.backgroundColor = "#B0B6BA";
  pauseBtn.style.backgroundColor = "#fff";
  stopaBtn.style.backgroundColor = "#fff";
  vinyl.style.animationPlayState = "running";
  headtitle.innerText = titleSong[songIndex];
};
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
