const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/AlphaVideoFrontendComponents/runtime-es5.js',
    './dist/AlphaVideoFrontendComponents/polyfills-es5.js',
    './dist/AlphaVideoFrontendComponents/scripts.js',
    './dist/AlphaVideoFrontendComponents/main-es5.js'
  ];

  await fs.ensureDir('./dist/elements');
  await fs.emptyDir('./dist/elements');
  await concat(files, './dist/elements/imagegallery.js');
  await fs.copyFile(
    './dist/AlphaVideoFrontendComponents/styles.css',
    './dist/elements/styles.css'
  );
})();