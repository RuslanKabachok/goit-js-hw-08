import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

let stopTime;

player.on('timeupdate', function (obj) {
  stopTime = obj.seconds;
  // localStorage.setItem('videoplayer-current-time', JSON.stringify(stopTime));
  // _.throttle(() => {}, 1000);
  _.throttle(() => {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(stopTime));
  }, 1000);
});

player
  .setCurrentTime(JSON.parse(localStorage.getItem('videoplayer-current-time')))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
