import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    projectObject: {},

};

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {
        setProject: (state, action) => {
            state.projectObject = _.cloneDeep(action.payload);
        },
        changeInProject: (state, action) => {
            state.projectObject = { ...state.projectObject, [action.payload.key]: action.payload.value }
            if (state?.projectObject?.contractingModelId === 2) {
                if (!state?.projectObject?.economicViabilty) {
                    state.projectObject.economicViabilty = {}
                }
                state.projectObject.economicViabilty.sharedSavingPercentage = null
            }
            if (state?.projectObject?.contractingModelId === 1) {
                if (!state?.projectObject?.economicViabilty) {
                    state.projectObject.economicViabilty = {}
                }
                state.projectObject.economicViabilty.guaranteedSavingPremiumValue = null
                state.projectObject.economicViabilty.guaranteedSavingPremiumPercentage = null
                state.projectObject.economicViabilty.isGuaranteedSavingValue = false
                state.projectObject.economicViabilty.isGuaranteedSavingPercentage = false

            }
        },
        changeInProjectConsumption: (state, action) => {
            if (state.projectObject.consumption === null) {
                state.projectObject.consumption = {}
            }
            state.projectObject = { ...state.projectObject, consumption: { ...state.projectObject.consumption, [action.payload.key]: action.payload.value } }
        },
        changeProjectUtilitiesAvailables: (state, action) => {
            let array = state.projectObject.utilitiesAvailablesIds || []
            if (!action.payload.indicator) {
                state.projectObject.utilitiesAvailablesIds = array.filter(x => x !== action.payload.id)
            } else {
                state.projectObject.utilitiesAvailablesIds = [...array, action.payload.id]
            }
        },
        changeProjectGreenCertificationIds: (state, action) => {
            let array = state.projectObject.greenCertificationIds || []
            if (!action.payload.indicator) {
                state.projectObject.greenCertificationIds = array.filter(x => x !== action.payload.id)
            } else {
                state.projectObject.greenCertificationIds = [...array, action.payload.id]
            }
        },
        changeInProjectTechnicalInfo: (state, action) => {
            if (state.projectObject.technicalInfo === null) {
                state.projectObject.technicalInfo = {}
            }
            state.projectObject = { ...state.projectObject, technicalInfo: { ...state.projectObject.technicalInfo, [action.payload.key]: action.payload.value } }

        },

        changeInProjectTechnicalInfoInterconnection: (state, action) => {
            if (!state.projectObject.technicalInfo) {
                state.projectObject.technicalInfo = {};
            }
            state.projectObject.technicalInfo = {
                ...state.projectObject.technicalInfo,
                ...action.payload
            };

            if (state.projectObject.technicalInfo.offGrid === false) {
                state.projectObject.technicalInfo = {
                    ...state.projectObject.technicalInfo,
                    "offGridAlternativeElectricityCost": null
                };
            }
            if (state.projectObject.technicalInfo.netMeteringGride === false) {
                state.projectObject.technicalInfo = {
                    ...state.projectObject.technicalInfo,
                    "netMeteringGridElectricityCost": null
                };
            }
            if (state.projectObject.technicalInfo.gridConnected === false) {
                state.projectObject.technicalInfo = {
                    ...state.projectObject.technicalInfo,
                    "gridConnectedPpasellingTariff": null
                };
            }
            if (state.projectObject.technicalInfo.wheeling === false) {
                state.projectObject.technicalInfo = {
                    ...state.projectObject.technicalInfo,
                    "wheelingGridAccessCharges": null,
                    "wheelingSellingTariff": null
                };
            }
        },
        changeInProjectEsdd: (state, action) => {
            if (state.projectObject.esdd === null) {
                state.projectObject.esdd = {}
            }
            state.projectObject = { ...state.projectObject, esdd: { ...state.projectObject.esdd, [action.payload.key]: action.payload.value } }

        },
        changeInProjectEconomicViabilty: (state, action) => {
            if (state.projectObject.economicViabilty === null) {
                state.projectObject.economicViabilty = {}
            }
            state.projectObject = { ...state.projectObject, economicViabilty: { ...state.projectObject.economicViabilty, [action.payload.key]: action.payload.value } }
            if (state.projectObject.economicViabilty.isGuaranteedSavingPercentage) {
                state.projectObject.economicViabilty.guaranteedSavingPremiumValue = null
            }
            if (state.projectObject.economicViabilty.isGuaranteedSavingValue) {
                state.projectObject.economicViabilty.guaranteedSavingPremiumPercentage = null
            }
        },
        changeInProjectEconomicViabiltyCapex: (state, action) => {
            if (state.projectObject.economicViabilty === null) {
                state.projectObject.economicViabilty = {}
            }
            if (!state?.projectObject?.economicViabilty?.capexes) {
                state.projectObject.economicViabilty.capexes = []
            }
            let array = state.projectObject.economicViabilty.capexes
            if (action.payload.indicator === "plus") {
                state.projectObject.economicViabilty.capexes = [...array, action.payload.object]
            }
            if (action.payload.indicator === "edit") {
                let newArray = array.map((x) => {
                    if (x.name === action.payload.object.name) {
                        return { ...x, [action.payload.object.key]: action.payload.object.value }
                    } else {
                        return x
                    }
                })
                state.projectObject.economicViabilty.capexes = newArray

            }
            if (action.payload.indicator === "delete") {
                let newArray = array.filter((x) => { return x.name !== action.payload.object.name })
                state.projectObject.economicViabilty.capexes = newArray
            }
        },
        changeInProjectEconomicViabiltyOpex: (state, action) => {
            if (state.projectObject.economicViabilty === null) {
                state.projectObject.economicViabilty = {}
            }
            if (!state?.projectObject?.economicViabilty?.opexes) {
                state.projectObject.economicViabilty.opexes = []
            }
            let array = state.projectObject.economicViabilty.opexes

            if (action.payload.indicator === "plus") {
                state.projectObject.economicViabilty.opexes = [...array, action.payload.object]
            }
            if (action.payload.indicator === "edit") {
                let newArray = array.map((x) => {
                    if (x.name === action.payload.object.name) {
                        return { ...x, [action.payload.object.key]: action.payload.object.value }
                    } else {
                        return x
                    }
                })
                state.projectObject.economicViabilty.opexes = newArray
            }
            if (action.payload.indicator === "delete") {
                let newArray = array.filter((x) => { return x.name !== action.payload.object.name })
                state.projectObject.economicViabilty.opexes = newArray
            }
        },
        ChangeInProjectDocumentSections: (state, action) => {
            if (state.projectObject.documentSections === null) {
                state.projectObject.documentSections = []
            }
            let array = state.projectObject.documentSections

            const findSectionByName = (sections, name) => {
                return sections.find(section => section.name === name);
            };

            const findFileByPath = (files, filePath) => {
                return files.find(file => file.filePath === filePath);
            };

            const addDocumentFile = (sections, sectionName, newFile) => {
                let section = findSectionByName(sections, sectionName);
                if (!section) {
                    section = { name: sectionName, documentFiles: [] };
                    sections.push(section);
                }

                let existingFile = findFileByPath(section.documentFiles, newFile.filePath);
                if (existingFile) {
                    return;  // File already exists, no need to add
                }

                section.documentFiles.push(newFile);
            };
            const deleteDocumentFile = (sections, sectionName, filePath) => {
                let section = findSectionByName(sections, sectionName);
                if (!section) {
                    return;  // Section not found
                }

                let fileIndex = section.documentFiles.findIndex(file => file.filePath === filePath);
                if (fileIndex === -1) {
                    return;  // File not found
                }

                section.documentFiles.splice(fileIndex, 1);
            };

            const { indicator, object } = action.payload;

            if (indicator === "plus") {
                const { name, filePath } = object;
                addDocumentFile(array, name, { filePath });
            }

            if (indicator === "delete") {
                const { name, filePath } = object;
                deleteDocumentFile(array, name, filePath);
            }
        }
    },
})


export const {
    setProject,
    changeInProject,
    changeInProjectConsumption,
    changeProjectUtilitiesAvailables,
    changeInProjectTechnicalInfo,
    changeInProjectTechnicalInfoInterconnection,
    changeProjectGreenCertificationIds,
    changeInProjectEsdd,
    changeInProjectEconomicViabilty,
    changeInProjectEconomicViabiltyCapex,
    changeInProjectEconomicViabiltyOpex,
    ChangeInProjectDocumentSections
} = projectSlice.actions;
export default projectSlice.reducer;
