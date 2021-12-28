// validate whether or not the user entered data is correct
const validation = function(obj, ...props) {
    const errors = [];

    props.forEach((prop) => {
        if (obj[prop] === 'undefined' || obj[prop] === '') {
            errors.push(`No ${prop} defined`);
        }
    });

    if (errors.length) {
        return {
            error: errors.join(' ')
        };
    }
    return null;
};

module.exports = validation;