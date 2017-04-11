/* jshint node: true */
'use strict';

module.exports = {
  name: 'simple-mde',
  isDevelopingAddon() {
    return true;
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import(`${app.bowerDirectory}/simplemde/dist/simplemde.min.js`);
    app.import(`${app.bowerDirectory}/simplemde/dist/simplemde.min.css`);
  }
};