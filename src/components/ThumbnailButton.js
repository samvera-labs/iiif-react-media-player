import videojs from 'video.js';

let Button = videojs.getComponent('ClickableComponent');

const ThumbnailButton = videojs.extend(Button, {
  constructor: function () {
    console.log(this);
    Button.apply(this, arguments);
    this.addClass('vjs-thumbnail');
    this.controlText('Create Thumbnail');

    /* initialize your button */
  },
  handleClick: function () {
    //   'http://localhost:3000/master_files/3b591858s/poster?offset=87.968323&preview=true'
    const modal = document.getElementById('thumbnailModal');
    const imageContainer = document.getElementById('preview');
    imageContainer.src =
      'http://localhost:3000/master_files/3b591858s/poster?offset=87.968323&preview=true';
    modal.style.display = 'block';
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  },
});

export default ThumbnailButton;
