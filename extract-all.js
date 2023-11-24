import exifr from 'exifr';

import fs from 'fs';

let images = fs.readdirSync('images');

for(let image of images){

console.log(images);

if(image.slice(-4) =='.jpg') {

console.log('IMAGE: '+ image);

let metadata = await exifr.parse('images/' + image);

console.log(metadata);
}
}