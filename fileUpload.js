var path = require('path');
var db = require('./db.js');
var fs = require('fs');

/*
// app.get('/upload/:listingId')
exports.uploadInit = function (req, res) {
    console.log('listingId ==> ' + req.params.listingId);
    res.sendFile(path.join(__dirname + '/upload.html'));
};
*/



// app.post('/upload')
exports.upload = function (req, res) {
    console.log(req.body.listingId);
    
    var file = req.file;
    fs.readFile(file.path, function (err, data) {  
        if (err) 
        {
            res.status(500).send('Unable to save post: ' + err);
        }
        else
        {
            var imageFile = {
                listingId: req.body.listingId,
                imageData: data,
                mimeType: file.mimetype, 
                // path: file.path,
                // fileName: file.originalname,
                // encoding: file.encoding, 
                // fileSize: file.size
            };
 
            db.createListingImage(imageFile, (err, result) => {
                if (!err)
                {
                    if (result)
                    {
                        res.send('ok');
                    }
                    else
                    {
                        console.log("Something unexpected happened while saving the post");
                        res.status(500).send();
                    }
                }
                else
                {
                    console.log("Error creating post: " + err);
                    res.status(500).send(err);
                }

                fs.unlink(file.path, function (err) {
                    if (err) {
                        console.log("Unable to delete file " + file.path + ": " + err);
                    }
                });
            });
            
            // console.dir(post);
            // res.send('ok');
        }
    });
};