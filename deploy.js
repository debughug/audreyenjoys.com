require("dotenv").config({ path: __dirname + "/.env" });

const { upload } = require("s3-lambo");
const axios = require("axios");

const UpdateS3Recipes = async () => {
  let englishCall = axios.get(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=recipe&access_token=${process.env.CONTENTFUL_DELIVERY_KEY}`
  );

  let spanishCall = axios.get(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=recipe&access_token=${process.env.CONTENTFUL_DELIVERY_KEY}&locale=es`
  );

  await axios
    .all([englishCall, spanishCall])
    .then(
      axios.spread(function (englishRes, spanishRes) {
        upload({
          ACL: "public-read",
          Key: "recipes.json",
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: JSON.stringify(englishRes.data),
        });

        upload({
          ACL: "public-read",
          Key: "recipes-es.json",
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: JSON.stringify(spanishRes.data),
        });

        console.log("Successfully Updated S3 Files! :)");
      })
    )
    .catch(function (error) {
      console.log("Unsuccessfully Updated S3 Files! :(", error);
    });
};

UpdateS3Recipes();
