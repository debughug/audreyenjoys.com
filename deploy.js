require('dotenv').config({ path: __dirname + '/.env' });

const { upload } = require('s3-lambo');
const axios = require('axios');

const UpdateS3Recipes = async () => {
  await axios
    .get(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${process.env.CONTENTFUL_DELIVERY_KEY}`
    )
    .then(function (response) {
      upload({
        ACL: 'public-read',
        Key: 'recipes.json',
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: JSON.stringify(response.data),
      });
      console.log('Updated recipe site database, thank you!');
    })
    .catch(function (error) {
      console.log('Failed to update recipe site database.', error);
    });
};

UpdateS3Recipes();
