const createError = require('http-errors');

const notFoundHandler = (req, res, next) => {
    next(createError(404, 'your request content was not found'));
};

const errorHandler = (err, req, res) => {
    res.locals.error = process.env.NODE_ENV === 'development' ? err : { message: err.message };

    res.status(res.status || 500);
    if (res.locals.html) {
        res.render('error', {
            title: 'Error',
        });
    } else {
        res.json(res.locals.error);
    }
};

module.exports = {
    notFoundHandler,
    errorHandler,
};
