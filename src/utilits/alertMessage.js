import React from 'react';
import { Alert } from 'antd';

const alertValidationMessage = (errors) => {
    const messages = [];
    const visited = new Set();
    const extractMessages = (errorObj, depth = 0, maxDepth = 10) => {
        if (depth > maxDepth || visited.has(errorObj)) {
            
            return;
        }

        visited.add(errorObj); 

        for (const key in errorObj) {
            if (errorObj[key]?.message) {
                messages.push(errorObj[key].message);
            }
            // Check for nested objects (in case of nested form structure)
            if (typeof errorObj[key] === 'object' && errorObj[key] !== null) {
                extractMessages(errorObj[key], depth + 1, maxDepth);
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
