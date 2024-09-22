import React from 'react';
import YesNoBox from '../../shared/YesNoBox';
import QuestionBox from '../../shared/QuestionBox';
import { useFormContext, Controller } from 'react-hook-form';
import RadioButton from '../../shared/RadioButton';
function StepTwoESDD() {
  const questions = [
    {
      id: '1',
      label: 'Is the Project type listed on IFE’s Exclusion List?',
      field: 'ifesExclusionList',
    },
    {
      id: '2',
      label:
        'Does the Project include construction of non-rural roads longer than 2 km or rural roads longer than 10 km?',
      field: 'ruralRoads',
    },
    {
      id: '3',
      label:
        'Does the Project include NEW land use in areas protected by national or international standards (parks, nature reserves, etc.)?',
      field: 'newLandUseProtected',
    },
    {
      id: '4',
      label:
        'Does the Project include simultaneous mobilisation of more than 100 workers for construction?',
      field: 'simultaneousMobilisation',
    },
    {
      id: '5',
      label:
        'Does the Project include NEW land use of more than 15 hectare in total?',
      field: 'newLandUseMoreThan',
    },
    {
      id: '6',
      label:
        'Does the Project include construction of electrical transmission lines of capacity above 110 kV?',
      field: 'electricalTransmission',
    },
    {
      id: '7',
      label:
        'Are there any cultural heritage sites in the Project area (e.g. UNESCO)?',
      field: 'culturalHeritageSites',
    },
  ];
  const { control } = useFormContext();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
        <QuestionBox title={'Screening Questions'}>
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-16">
            {/* Left Column */}
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
              {questions.slice(0, 4).map((question) => (
                <YesNoBox key={question.id} label={question.label}>
                  {['Yes', 'No', 'Not sure'].map((option) => (
                    <Controller
                      key={`${option}-${question.id}`}
                      name={`esdd.${question.field}`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <RadioButton
                          variant="green"
                          label={option}
                          id={`${option}${question.id}`}
                          name={question.id}
                          value={option}
                          checked={field.value === option}
                          onChange={() => {
                            field.onChange(option);
                          }}
                        />
                      )}
                    />
                  ))}
                </YesNoBox>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
              {questions.slice(4).map((question) => (
                <YesNoBox key={question.id} label={question.label}>
                  {['Yes', 'No', 'Not sure'].map((option) => (
                    <Controller
                      key={`${option}-${question.id}`}
                      name={`esdd.${question.field}`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <RadioButton
                          variant="green"
                          label={option}
                          id={`${option}${question.id}`}
                          name={question.id}
                          value={option}
                          checked={field.value === option}
                          onChange={() => {
                            field.onChange(option);
                          }}
                        />
                      )}
                    />
                  ))}
                </YesNoBox>
              ))}
            </div>
          </div>
        </QuestionBox>
      </div>
    </div>
  );
}

export default StepTwoESDD;
