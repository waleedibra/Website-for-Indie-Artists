
// from the ash mp3 player
const musicContainer = document.querySelector('#Music-container')
const playBtn = document.querySelector('#playi')
const prevBtn = document.querySelector('#previ')
const nextBtn = document.querySelector('#nexti')
const audio = document.querySelector('#audio')
const progress = document.querySelector('#progress')
const progressContainer = document.querySelector('#progress-container')
const title = document.querySelector('#titlei')
const cover = document.querySelector('#coveri')

// song titles array
const songs = ['Triple Threat', 'What Am I', 'Carry on', "Dante's Letter"]
//create var to keep tracl of songs
let songIndex = 0

//initially load song into DOM
// this determins the song that is played
loadSong(songs[songIndex])

//create function to update song detials
function loadSong(song) {
  title.innerText = song
  audio.src = `/songs/${song}.mp3`
}

//the functions that store the logic to execute commands for
//music player buttons

//logic for pausing songs functionality
function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')
  audio.play()
}

//logic for pkaying songs functionalitys
function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  audio.pause()
}


//logic for prev song functionality
function prevSong() {
  songIndex --
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong()
}


//logic for next song functionality
function nextSong() {
  songIndex ++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}


//logic for dynamic song progress bar
function songProgress(e) {
  const {duration,currentTime} = e.srcElement
  const progressPercent = (currentTime/duration) * 100;
  progress.style.width = `${progressPercent}%`
}

//logic for allowing user to skip to certain parts of song
function jumpDuration(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration
  audio.currentTime = (clickX / width) * duration

}


//event listeners commands for our buttons on music player
playBtn.addEventListener('click', e => {
  //check if the key word is in the div that triggers css animation
  const playmusic = musicContainer.classList.contains('play')
  //then process it accordingly
  if(playmusic) {
    pauseSong()
  } else{
    playSong()
  }

})


// make the buttons to change song work
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
//event listener for progress bar
audio.addEventListener('timeupdate', songProgress)
// event listener to allow skipping to certain points of the song
progressContainer.addEventListener('click', jumpDuration)
//auto play next song
audio.addEventListener('ended', nextSong)
