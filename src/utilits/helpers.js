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

    steps.forEach((parentStep, parentIndex) => {
        parentStep.children.forEach((childStep, childIndex) => {
            // Iterate through the missing data fields
            missingDataArray.forEach((field) => {
                // Check if the field belongs in the current step
                if (childStepContainsField(childStep, field)) {
                    mapping[field] = {
                        parentStep: parentStep.parentStep,
                        parentIndex,
                        childIndex,
                    };
                }
            });
        });
    });
    return mapping;
};

const childStepContainsField = (childStep, field) => {
    // Recursively search for the field in the content of the child step
    return findFieldInContent(childStep.content, field);
};

const findFieldInContent = (content, field) => {
    if (!content || typeof content !== 'object') return false;

    // Check if it's a field directly within this component's props
    if (content.props?.name === field || (content.props?.fields && content.props.fields.includes(field))) {
        return true;
    }

    // Recursively check for child components
    const children = content.props?.children;
    if (Array.isArray(children)) {
        return children.some(child => findFieldInContent(child, field));
    } else if (children && typeof children === 'object') {
        return findFieldInContent(children, field);
    }

    return false;
};
