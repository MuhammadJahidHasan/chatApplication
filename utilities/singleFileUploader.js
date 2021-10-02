const multer = require('multer');
const path = require('path');
const createError = require('http-errors');

const uploader = (sub_folder, allowed_file_types, max_size, error_msg) => {
    const UPLOAD_FOLDERS = `${__dirname}/../public/uploads/${sub_folder}/`;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOAD_FOLDERS);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);

            const filename = `${file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-')
                .toLowerCase()
                .split(' ')
                .join('-')}-${Date.now()}`;
            cb(null, filename + fileExt);
        },
    });

    const upload = multer({
        storage,
        limits: {
            fileSize: max_size,
        },
        fileFilter: (req, file, cb) => {
            if (allowed_file_types.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(error_msg));
            }
        },
    });

    return upload;
};

module.exports = uploader;
