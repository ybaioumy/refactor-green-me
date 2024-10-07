export function findTopLevelParent(childId, data) {
    function search(items, parentId) {
        for (const item of items) {
            if (item.id === childId) {
                return parentId;
            }
            if (item.children && item.children.length > 0) {
                const result = search(item.children, parentId || item.id);
                if (result) return result;
            }
        }
        return null;
    }

    for (const category of data) {
        const result = search(category.crietria, category.id);
        if (result) return result;
    }
    return null;
}


export const getTimeAgo = (time) => {
    if (!time) {
        return "Not Available"; // Handle null, undefined, or empty string
    }

    const updatedTime = new Date(time);

    // Check if the date is invalid
    if (isNaN(updatedTime.getTime())) {
        return "Unknown"; // Handle invalid date formats
    }

    const now = new Date();
    const timeDifference = now - updatedTime; // Difference in milliseconds
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Approximation: 30 days in a month

    if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
};

export const generateFieldStepMapping = (steps, missingDataArray) => {
    const mapping = {};
    console.log(mapping);
    steps.forEach((parentStep, parentIndex) => {
        // console.log(`Processing parent step: ${parentStep.parentStep}`);
        parentStep.children.forEach((childStep, childIndex) => {
            // console.log(`Processing child step at index: ${childIndex}`);

            // Iterate through the missing data fields
            missingDataArray.forEach((field) => {
                const normalizedField = normalizeFieldName(field); // Normalize the field name
                // Check if the field belongs in the current step
                if (childStepContainsField(childStep, field)) {
                    // console.log(`Field "${normalizedField}" found in Parent: ${parentStep.parentStep}, Child Index: ${childIndex}`);
                    mapping[normalizedField] = {
                        parentStep: parentStep.parentStep,
                        parentIndex,
                        childIndex,
                    };
                } else {
                    // console.log(`Field "${normalizedField}" not found in this child step.`);
                }
            });
        });
    });
    // console.log("Mapping generated:", mapping);
    return mapping;
};

// Utility function to normalize the field name
export const normalizeFieldName = (fieldName) => {
    console.log(fieldName);
    return fieldName
        .toLowerCase() // Convert to lowercase
        .replace(/\s+/g, '') // Remove all spaces
        .replace(/[^a-zA-Z0-9]/g, ''); // Remove any non-alphanumeric characters
};

const childStepContainsField = (childStep, field) => {
    // console.log("Checking child step for field:", field);
    // console.log("Child step content:", childStep.content); // Log the entire content structure
    return findFieldInContent(childStep.content, field);
};

const findFieldInContent = (content, field) => {
    if (!content || typeof content !== 'object') {
        // console.log("Invalid content structure:", content);
        return false;
    }

    // Check if the field is directly within this component's props
    if (content.props?.fields && content.props.fields.includes(field)) {
        // console.log(`Field "${field}" found in content's props.`);
        return true;
    }

    // Recursively check for child components and children arrays
    const children = content.props?.children;

    if (Array.isArray(children)) {
        // console.log("Processing an array of children...");
        return children.some(child => findFieldInContent(child, field));
    } else if (children && typeof children === 'object') {
        // console.log("Processing a single child object...");
        return findFieldInContent(children, field);
    }

    // console.log(`Field "${field}" not found in this content.`);
    return false;
};
