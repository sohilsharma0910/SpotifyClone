console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('./Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('Progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Metallica – Lux Æterna", filepath: "./Songs/1.mp3", coverPath: "./Cover/1.jpg" },
    { songName: "Metallica – Wherever I May Roam", filepath: "./Songs/2.mp3", coverPath: "./Cover/2.jpg" },
    { songName: "kets4eki & asteria – BFM (feat. Britney Manson)", filepath: "./Songs/3.mp3", coverPath: "./Cover/3.jpg" },
    { songName: "Metallica – Ride The Lightning", filepath: "./Songs/4.mp3", coverPath: "./Cover/4.jpg" },
    { songName: "hubithekid, 6arelyhuman, BAEBYALEX, skypebf & syris – EYEZ ON ME", filepath: "./Songs/5.mp3", coverPath: "./Cover/5.jpg" },
    { songName: "6arelyhuman – DANCE! Till We Die", filepath: "./Songs/6.mp3", coverPath: "./Cover/6.jpg" },
    { songName: "Metallica – For Whom The Bell Tolls", filepath: "./Songs/7.mp3", coverPath: "./Cover/7.jpg" },
    { songName: "6arelyhuman – CR4CK HOUSE", filepath: "./Songs/8.mp3", coverPath: "./Cover/8.jpg" },
    { songName: "6arelyhuman – Faster N Harder", filepath: "./Songs/9.mp3", coverPath: "./Cover/9.jpg" },
    { songName: "asteria – ULTRA INSTINCT (feat. kets4eki)", filepath: "./Songs/10.mp3", coverPath: "./Cover/10.jpg" }
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
});

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-circle-play')) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `./Songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        } else {
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
        }
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `./Songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `./Songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

// Code for the modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('codeModal');
    const submitCode = document.getElementById('submitCode');
    const accessCode = document.getElementById('accessCode');

    modal.style.display = 'flex';

    // Encoded the access code
    const encodedCode = 'MDkxMA==';

    // Decode the code when needed
    const decodedCode = atob(encodedCode);

    // Event listener for the submit button
    submitCode.addEventListener('click', () => {
        if (accessCode.value === decodedCode) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            alert('Incorrect code. Please try again.');
        }
    });


    accessCode.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitCode.click();
        }
    });
});
