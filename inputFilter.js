// jshint esversion:8

exports.validate = (text) => {
    let result = "";

    result = text.replace(/\s/, "%20");

    return result;
};
