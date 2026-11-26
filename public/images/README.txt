Put your product photos in this folder (jpg, png or webp).

Example: save a photo as   nova-x1-front.jpg
Then in src/db/seedData.js use:

  images: ['/images/nova-x1-front.jpg', '/images/nova-x1-side.jpg'],

Tips: square photos (800 x 800) under about 300 KB load fastest.
Run `npm run db:seed` after changing seedData.js, then restart the API.
