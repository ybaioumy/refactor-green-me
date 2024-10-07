import { Children, cloneElement, isValidElement } from 'react';
import { Controller } from 'react-hook-form'; // Import the Controller for comparison

export const navigateToErrorStep = (fieldName, steps, setCurrentStep) => {
    for (let parentIndex = 0; parentIndex < steps.length; parentIndex++) {
        const parentStep = steps[parentIndex];

        for (let childIndex = 0; childIndex < parentStep.children.length; childIndex++) {
            const childStep = parentStep.children[childIndex];

            // Function to traverse through children and find matching Controller
            const findControllerInChildren = (children) => {
                let found = false;
                const traverse = (children) => {
                    Children.forEach(children, (child) => {
                        if (isValidElement(child)) {
                            if (child.type === Controller && child.props.name === fieldName) {
                                found = true;
                                return;
                            }

                            if (child.props && child.props.children) {
                                traverse(child.props.children);
                            }
                        }
                    });
                };

                traverse(children);
                return found;
            };

            // Check if the content contains the Controller
            if (findControllerInChildren(childStep.content.props.children)) {
                setCurrentStep({ parentIndex, childIndex });
                return;
            }
        }
    }
};