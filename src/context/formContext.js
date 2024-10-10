import React, { createContext, useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useUpdateProjectByIdMutation } from '../redux/features/project';
import { useDispatch, useSelector } from 'react-redux';
import { setProject } from '../redux/slices/project';
import { useParams } from 'react-router-dom';
import alertValidationMessage from '../utilits/alertMessage'
import { message } from 'antd';
import Cookies from 'js-cookie';
import { useGetUserProjectPermissionsQuery } from '../redux/features/auth';
import { createContextualCan } from '@casl/react';
import { defineAbilityFor } from '../utilits/abilities';
import { useGetRoleName, useGetuserId, useTypeId } from '../hooks/useCookies';
import { useGetTypesQuery } from '../redux/features/auth';

const StepContext = createContext();
const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

export const StepProvider = ({ children, steps }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const userId = useGetuserId()
    const typeId = useTypeId();
    const role = useGetRoleName()
    const [currentParentIndex, setCurrentParentIndex] = useState(0);
    const [currentChildIndex, setCurrentChildIndex] = useState(0);
    const { projectObject } = useSelector((state) => state.project);
    const { trigger, getValues, formState: { errors }, watch } = useFormContext();

    const [updateProjectById, { isLoading }] = useUpdateProjectByIdMutation();
    const { data: projectPermissions } = useGetUserProjectPermissionsQuery({ projectId: id, userId });

    // Define abilities based on project permissions
    const ability = defineAbilityFor({ role: role }, projectPermissions || [], Number(typeId), { hisOwn: projectObject.isProjectBelongsToThisEsco});

    // Dynamically calculate the total number of inputs based on the fields
    const formValues = watch();
    const totalInputs = Object.keys(formValues).length;
    const filledInputs = Object.values(formValues).filter(value => value !== '').length;
    const filledPercentage = (filledInputs / totalInputs) * 100;

    const handleNext = async () => {
        if (ability.can('edit', steps[currentParentIndex].entity)) {

            const isValid = await trigger();
            if (!isValid) {
                alertValidationMessage(errors);
                return;
            }
            const currentData = getValues();
            try {
                if (ability.can('edit', steps[currentParentIndex].entity)) {
                    await updateProjectById({ id, data: currentData }).unwrap();
                    dispatch(setProject(currentData));
                }
            } catch (error) {
                console.error(error.message || 'Something went wrong');
                message.error('Failed to update the project. Please try again.');
            }
        }
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
        <AbilityContext.Provider value={ability}> {/* Provide ability to children */}
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

                    projectPermissions,
                    goToField,
                    ability,
                }}>
                {children}
            </StepContext.Provider>
        </AbilityContext.Provider>
    );
};

export const useStep = () => useContext(StepContext);
export const useAbility = () => useContext(AbilityContext);
