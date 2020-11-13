export default class UtilityHelpers {
  constructor() {
    this.errorClass = 'error-message';
    this.elementTitles = this.getElementTitles();
  }

  getElementTitles() {
    return {
      alertElId: 'alert-message',
      currentManifestId: 'manifest-current',
      defaultManifest: 'lunchroom_manners_v2.json',
      manifestTitle: 'current-manifest-title',
      manifestUrlForm: 'manifest-url-form',
      mountElId: 'iiif-standalone-player-mount',
      playerId: 'iiif-av-player',
      playerWrapperId: 'iiif-player-wrapper',
      sourceElId: 'data-iiifav-source',
      structureElId: 'iiif-structure-wrapper',
      urlTextInputId: 'manifest-url'
    };
  }

  /**
   * Helper method to parse label field of manifests
   * @param  {Object} label Label object
   * @return {string} label string
   */
  getLabel(obj) {
    let labelText = '';

    if (obj.hasOwnProperty('@none')) {
      labelText = obj['@none'][0];
    } else if (obj.hasOwnProperty('en')) {
      labelText = obj['en'][0];
    }
    return labelText;
  }

  createTrackTags(tracks) {
    const tracksTags = [];
    for (let i = 0, total = tracks.length; i < total; i++) {
      const track = tracks[i];
      tracksTags.push(
        `<track srcLang="en" kind="subtitles" type="${track.format}" src="${track.id}"></track>`
      );
    }
    return tracksTags;
  }
}
