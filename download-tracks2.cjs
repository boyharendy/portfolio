const fs = require('fs');
const https = require('https');
const path = require('path');

const PLAYLIST = [
  { name: 'track-0.mp3', url: 'https://cdn.pixabay.com/audio/2022/11/22/audio_d171b308be.mp3' }, // Jazz Lounge
  { name: 'track-1.mp3', url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3' }, // Lofi Vintage
  { name: 'track-2.mp3', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b8285514.mp3' }, // Saxophone Jazz
  { name: 'track-3.mp3', url: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_e89139fc66.mp3' }, // Blues Guitar
  { name: 'track-4.mp3', url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3' }, // Smooth Jazz
  { name: 'track-5.mp3', url: 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_91b3cb3982.mp3' }  // Night Blues
];

const dir = path.join(__dirname, 'public', 'assets', 'sounds');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, function(response) {
      if (response.statusCode === 302 || response.statusCode === 301) {
        let redirectUrl = response.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const urlObj = new URL(url);
          redirectUrl = urlObj.origin + redirectUrl;
        }
        download(redirectUrl, dest).then(resolve).catch(reject);
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
    
    // Add user agent
    req.setHeader('User-Agent', 'Mozilla/5.0');
  });
}

async function main() {
  for (const track of PLAYLIST) {
    const dest = path.join(dir, track.name);
    console.log(`Downloading ${track.name} from ${track.url}...`);
    try {
      await download(track.url, dest);
      console.log(`Downloaded ${track.name}`);
    } catch (e) {
      console.error(`Failed ${track.name}:`, e);
    }
  }
}

main();
