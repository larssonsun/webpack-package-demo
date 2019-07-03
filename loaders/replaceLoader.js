module.exports = function (source) {
    var rt = source.replace("alert", ";alert('NODE_ENV in replaceLoader: " + process.env.NODE_ENV + "');confirm");
    return rt;
}