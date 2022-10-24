const formidable = require('formidable');
const path = require("path");
const fs = require("fs");
const {t} = require('localizify');
const httpStatus = require('http-status');
const config = require('../../config/config');

const fileUpload = async(req, res, next) => {
    try {
        const form = await formidable.IncomingForm();
        // Upload folder
        const uploadFolder = path.join(__dirname, "../../public/files/");
        form.uploadDir = uploadFolder;

        // parsed form
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    message: t("text_file_upload_error")
                });
            }

            const file = files.photo;
            
            if(typeof file === "undefined"){
                req.body = fields;
                next();
            } else {
                // checks if the file is valid
                const isValid = await isFileValid(file);
                if (!isValid) {
                    // throes error if file isn't valid
                    return res.status(httpStatus.BAD_REQUEST).json({
                        status: httpStatus.BAD_REQUEST,
                        message: t("text_file_type_not_valid"),
                    });
                }
    
                // check file size
                if(file.size > config.fileMaxSize) {
                    return res.status(httpStatus.BAD_REQUEST).json({
                        status: httpStatus.BAD_REQUEST,
                        message: t("text_file_size_too_big"),
                    });
                }
                // creates a valid name by removing spaces
                const fileName =  await generateFileName() + "." + file.type.split("/").pop();
                fs.renameSync(file.path, path.join(uploadFolder, fileName));
    
                // set fields in the req.body
                req.body = fields;
                req.body.photo = {};
                req.body.photo.data = fs.readFileSync(path.join(uploadFolder, fileName));
                req.body.photo.contentType = file.type;
    
                next();
            }
            
        });
    } catch (error) {
        console.log("errr" , error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: t("text_rest_something_went_wrong")
        });
    }
}

// check file is valid or not
const isFileValid = async (file) => {
    const type = file.type.split("/").pop();
    const validTypes = config.allowedTypes;
    if (validTypes.indexOf(type) === -1) {
        return false;
    }
    return true;
}

// Generate filename
const generateFileName = async () => {
    var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    return timestamp+random;  
}

module.exports = fileUpload;