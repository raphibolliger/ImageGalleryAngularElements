const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/AlphaVideoFrontendComponents/vendor.js',
    './dist/AlphaVideoFrontendComponents/runtime.js',
    './dist/AlphaVideoFrontendComponents/polyfills.js',
    './dist/AlphaVideoFrontendComponents/scripts.js',
    './dist/AlphaVideoFrontendComponents/main.js'
  ];

  await fs.ensureDir('./dist/elements');
  await fs.emptyDir('./dist/elements');
  await concat(files, './dist/elements/imagegallery.js');
  await fs.copyFile(
    './dist/AlphaVideoFrontendComponents/styles.css',
    './dist/elements/styles.css'
  );
})();