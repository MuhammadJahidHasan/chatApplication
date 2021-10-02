const decorateHtmlRes = (pageTitle) => (req, res, next) => {
    res.locals.html = true;
    res.locals.title = pageTitle;
    res.locals.loggedInUser = {};
    res.locals.error = {};
    res.locals.data = {};
    next();
};

module.exports = decorateHtmlRes;
