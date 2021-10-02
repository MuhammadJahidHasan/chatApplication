const uploader = require('../../utilities/singleFileUploader');

const avatarUpload = (req, res, next) => {
    const upload = uploader(
        'avatars',
        ['image/jpeg', 'image/jpg', 'image/png'],
        1000000,
        'only jpeg, jpg or png format allowed',
    );

    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                error: {
                    avatar: {
                        msg: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
};

module.exports = avatarUpload;
