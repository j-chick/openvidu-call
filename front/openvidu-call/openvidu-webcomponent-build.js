const fs = require('fs-extra');
const concat = require('concat');
const VERSION = require('./package.json').version;

console.log("Building OpenVidu Web Component (" + VERSION + ")");

async function buildElement() {
  const files = [
    './dist/openvidu-call/runtime.js',
    './dist/openvidu-call/polyfills.js',
    './dist/openvidu-call/scripts.js',
    './dist/openvidu-call/main.js',
  ];

  try {
    await fs.ensureDir('openvidu-webcomponent');
    await concat(files, './openvidu-webcomponent/openvidu-webcomponent-' + VERSION + '.js')
    await fs.copy('./dist/openvidu-call/styles.css', './openvidu-webcomponent/openvidu-webcomponent-' + VERSION + '.css');
  } catch (err) {
    console.error('Error executing build funtion in webcomponent-builds.js', err);
  }
}

async function copyFiles() {
  const destination = '../../../openvidu-tutorials/openvidu-webcomponent/web';
  try {
    console.log("Copying openvidu-webcomponents files from: ./openvidu-webcomponent to: " + destination);
    await fs.ensureDir('openvidu-webcomponent');
    await fs.copy('./openvidu-webcomponent/', destination);
  } catch (err) {
    console.error('Error executing copy function in webcomponent-builds.js', err);
  }
}

async function deleteFilesBuilt() {
  try {
    console.log("Deleting openvidu-webcomponent directory...");
    await fs.ensureDir('openvidu-webcomponent');
    await fs.remove("./openvidu-webcomponent");
  } catch (err) {
    console.error('Error executing delete function in webcomponent-builds.js', err);
  }
}

buildElement()
  .then(() => {
    copyFiles().then(() => {
      return deleteFilesBuilt();
    });
  })
  .then(() => {
    console.log('OpenVidu Web Component (' + VERSION + ') built');
  }).catch((error) => console.error(error));
