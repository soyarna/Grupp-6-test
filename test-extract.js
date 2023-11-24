// import exifr - a metadata extractor for images
import exifr from 'exifr';

// read the metadata from the greyhound image
let metadata = await exifr.parse('greyhound-with-meta.jpg');

// check that we got the metadata
console.log(metadata);