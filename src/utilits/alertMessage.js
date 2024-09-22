const alertValidationMessage = (errors) => {
    const messages = [];

    const extractMessages = (errorObj) => {
        for (const key in errorObj) {
            if (errorObj[key]?.message) {
                messages.push(errorObj[key].message);
            }
            // Check for nested objects (in case of nested form structure)
            if (typeof errorObj[key] === 'object' && errorObj[key] !== null) {
                extractMessages(errorObj[key]);
            }
        }
    };

    extractMessages(errors);

    const combinedMessage = messages.join('\n');
    if (combinedMessage) {
        alert(combinedMessage);
    }
};

export default alertValidationMessage;
