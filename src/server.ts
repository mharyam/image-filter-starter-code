import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );


  // filteredimage enpoint
  // Get filtered image and download
  app.get( "/filteredimage/", async (req:express.Request, res:express.Response) => {
    // destruct our body params
    let {image_url} = req.query;

    // call filterImageFromURL query to filter the image
    // validate if image URL exists
    if (!image_url){
        return res.status(400).send("Bad request")
    }
    let filteredpath = await filterImageFromURL(image_url);


    if (filteredpath){
      return res.status(200).sendFile(filteredpath);
    }
    else {
      return res.status(400).send("Bad ")
    }
  });
  

  // delete images enpoint
  // Get all images in default folder and delete
  app.get( "/delete-images", async ( req, res ) => {

    // delete all files 
    const fs = require('fs');
    const files = fs.readdirSync("./src/util/tmp");
    await deleteLocalFiles(files);
    return res.status(200).send("files deleted succesfully");
  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();