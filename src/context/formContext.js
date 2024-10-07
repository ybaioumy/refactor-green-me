import React, { createContext, useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useUpdateProjectByIdMutation } from '../redux/features/project';
import { useDispatch } from 'react-redux';
import { setProject } from '../redux/slices/project';
import { useParams } from 'react-router-dom';
import alertValidationMessage from '../utilits/alertMessage'
import { message } from 'antd';
import Cookies from 'js-cookie';
import { useGetUserProjectPermissionsQuery } from '../redux/features/auth';


const StepContext = createContext();

export const StepProvider = ({ children, steps, canEdit }) => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const userId = Cookies.get('userId')
    const [currentParentIndex, setCurrentParentIndex] = useState(0);
    const [currentChildIndex, setCurrentChildIndex] = useState(0);

    const { trigger, getValues, formState: { errors } } = useFormContext();

    const [updateProjectById, { isLoading }] = useUpdateProjectByIdMutation();
    const { data: projectPermissions } = useGetUserProjectPermissionsQuery({ projectId: id, userId: userId })


    const handleNext = async () => {
        if (canEdit) {
            const isValid = await trigger();
            if (!isValid) {
                alertValidationMessage(errors);
                return;
            }
            const currentData = getValues();
            try {
                if (canEdit) {
                    await updateProjectById({ id, data: currentData }).unwrap();
                    dispatch(setProject(currentData));
                }
            } catch (error) {
                console.error(error.message || 'Some things went wrong')
                message.error('Failed to update the project. Please try again.');
            }
        }
        // Continue with navigation regardless of edit mode
        if (currentChildIndex < steps[currentParentIndex].children.length - 1) {
            setCurrentChildIndex(currentChildIndex + 1);
        } else if (currentParentIndex < steps.length - 1) {
            setCurrentParentIndex(currentParentIndex + 1);
            setCurrentChildIndex(0);
        }
    };

    const handlePrevious = () => {
        if (currentChildIndex > 0) {
            setCurrentChildIndex(currentChildIndex - 1);
        } else if (currentParentIndex > 0) {
            setCurrentParentIndex(currentParentIndex - 1);
            setCurrentChildIndex(steps[currentParentIndex - 1].children.length - 1);
        }
    };
    const onSubmit = async (data) => {
        const isValid = await trigger();
        const currentData = getValues();
        if (!isValid) {
            alertValidationMessage(errors);
            return;
        }

        try {
            await updateProjectById({ id, data: currentData }).unwrap();
            message.success('Project Updated Successfully!');
            setCurrentParentIndex(0);
            setCurrentChildIndex(0);
        } catch (error) {
            console.error('Failed to update project: ', error);
            alert('Failed to update the project. Please try again.');
        }
    };

    //utility function to navigate to certain controller input 
    const goToField = (fieldName, fieldStepMapping) => {
        const mapping = fieldStepMapping[fieldName];
        if (mapping) {
            console.log(`Navigating to field: ${fieldName}, Parent Index: ${mapping.parentIndex}, Child Index: ${mapping.childIndex}`);
            setCurrentParentIndex(mapping.parentIndex);
            setCurrentChildIndex(mapping.childIndex);
        } else {
            console.warn(`Field ${fieldName} not found in any step.`);
        }
    };

    return (
        <StepContext.Provider
            value={{
                currentParentIndex,
                currentChildIndex,
                handleNext,
                handlePrevious,
                setCurrentChildIndex,
                setCurrentParentIndex,
                onSubmit,
                steps,
                isLoading,
                canEdit,
                projectPermissions,
                goToField,


            }}>
            {children}
        </StepContext.Provider>
    );
};

export const useStep = () => useContext(StepContext);
