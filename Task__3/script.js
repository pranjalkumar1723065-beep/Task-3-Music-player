
const songs = [
    {
        title: "Dreams",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Summer Vibes",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Relaxing Music",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

let songIndex = 0;

// Load song
function loadSong(index) {
    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.src;

    updatePlaylist();
}

// Play song
function playSong() {
    audio.play();
    playBtn.textContent = "⏸";
}

// Pause song
function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶";
}

// Play and Pause button
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

// Next song
function nextSong() {
    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
}

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Update progress bar
audio.addEventListener("timeupdate", () => {

    if (audio.duration) {
        const percentage =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percentage;

        currentTime.textContent =
            formatTime(audio.currentTime);

        duration.textContent =
            formatTime(audio.duration);
    }
});

// Format time
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Seek music
progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }
});

// Volume control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Playlist
function updatePlaylist() {
    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const songElement = document.createElement("div");

        songElement.classList.add("song");

        if (index === songIndex) {
            songElement.classList.add("active");
        }

        songElement.innerHTML = `
            <div>
                <div class="song-name">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <span class="song-number">
                ${index === songIndex ? "♫" : "▶"}
            </span>
        `;

        songElement.addEventListener("click", () => {
            songIndex = index;
            loadSong(songIndex);
            playSong();
        });

        playlist.appendChild(songElement);
    });
}

// Autoplay next song when current song ends
audio.addEventListener("ended", () => {
    nextSong();
});

// Initial setup
audio.volume = 0.7;
loadSong(songIndex);
