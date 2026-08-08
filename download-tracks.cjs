const fs = require('fs');
const https = require('https');
const path = require('path');

const PLAYLIST = [
  { name: 'track-0.mp3', url: 'https://ia800305.us.archive.org/30/items/BessieSmith-St.LouisBlues1925/BessieSmith-StLouisBlues1925.mp3' },
  { name: 'track-1.mp3', url: 'https://ia800500.us.archive.org/35/items/ScottJoplinTheEntertainer1902/Scott_Joplin_-_The_Entertainer_1902.mp3' },
  { name: 'track-2.mp3', url: 'https://ia802905.us.archive.org/27/items/maple-leaf-rag-scott-joplin/Maple%20Leaf%20Rag%20-%20Scott%20Joplin.mp3' },
  { name: 'track-3.mp3', url: 'https://ia800301.us.archive.org/13/items/BlindWillieJohnson-DarkWasTheNightColdWasTheGround/Blind_Willie_Johnson_-_Dark_Was_the_Night_Cold_Was_the_Ground.mp3' },
  { name: 'track-4.mp3', url: 'https://ia800203.us.archive.org/16/items/RobertJohnsonCrossRoadBlues/Robert_Johnson_-_Cross_Road_Blues.mp3' },
  { name: 'track-5.mp3', url: 'https://ia802700.us.archive.org/3/items/HesitationBlues/Hesitation_Blues_-_Macon_Ed_and_Tampa_Joe.mp3' }
];

const dir = path.join(__dirname, 'public', 'assets', 'sounds');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // handle redirect
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', function() {
        file.close(resolve);
      });
    }).on('error', function(err) {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const track of PLAYLIST) {
    const dest = path.join(dir, track.name);
    console.log(`Downloading ${track.name}...`);
    try {
      await download(track.url, dest);
      console.log(`Downloaded ${track.name}`);
    } catch (e) {
      console.error(`Failed ${track.name}:`, e);
    }
  }
}

main();
