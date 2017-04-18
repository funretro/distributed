'use strict';

var multer = require('multer');
var parse = require('csv-parse');
var storage = multer.memoryStorage(); //we will use memoryStorage object to keep data in memory

var upload = multer({ 
                storage: storage 
            }).single('file');

module.exports = function(req, res) {
    upload(req,res,function(err){
        if(err){
                res.json({error_code:1,err_desc:err});
                return;
        }
        var parser = parse({delimiter: ";"},function(err, output){
            if (err) throw err;
            res.json({error_code:0,parsed_table: output});
        });
        parser.write(req.file.buffer.toString());
        parser.end(); 
    });
};
