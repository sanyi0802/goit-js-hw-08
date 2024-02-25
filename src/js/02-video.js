import Player from '@vimeo/player';

const player = new Player(document.getElementById('vimeo-player'));

player.on('timeupdate', function(data) {
    const currentTime = data.seconds;
    localStorage.setItem('videoPlayerCurrentTime', currentTime);
});

player.setCurrentTime(localStorage.getItem('videoPlayerCurrentTime') || 0);