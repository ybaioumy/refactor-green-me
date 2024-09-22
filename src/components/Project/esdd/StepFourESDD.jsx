import { useFormContext, Controller } from 'react-hook-form';
import QuestionBox from '../../shared/QuestionBox';
import RadioButton from '../../shared/RadioButton';
import YesNoBox from '../../shared/YesNoBox';

const StepFour = () => {
  const { control } = useFormContext();

  const questionsCol_1 = [
    {
      id: '1',
      question:
        'Will the Project involve any land clearance or construction activities?',
      field: 'landClearance',
      options: ['Yes', 'No'],
    },
    {
      id: '2',
      question:
        'Does the Project require creation of quarries or similar as source of construction materials?',
      field: 'sourceOfConstructionMaterials',
      options: ['Yes', 'No', 'Not sure'],
    },
    {
      id: '3',
      question:
        'Will the Project involve use, transport, or storage of hazardous materials and/or hazardous wastes?',
      field: 'hazardousMaterials',
      options: ['Yes', 'No', 'Not sure'],
    },
  ];
  const questionsCol_2 = [
    {
      id: '4',
      question: 'Does the Project’s additional footprint exceed 2 ha?',
      field: 'additionalFootprint',
      options: ['Yes', 'No', 'Not sure'],
    },
    {
      id: '5',
      question:
        'Does the Project include measures to address resource efficiency and pollution impacts?',
      field: 'pollutionImpacts',
      options: ['Yes', 'No', 'Not sure'],
    },
  ];

  const questionsCol_3 = [
    {
      id: '6',
      question:
        'Are there measures in place to ensure the Project complies with national community health, safety, and security regulations?',
      field: 'securityRegulations',
      options: ['Yes', 'No', 'Not sure'],
    },
    {
      id: '7',
      question:
        'Are there any potential community health and safety impacts resulting from the Project?',
      field: 'safetyImpacts',
      options: ['Yes', 'No', 'Not sure'],
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
        <QuestionBox
          title="Performance Standard 3"
          titleBorderd
          description="- Resource Efficiency and Pollution Prevention">
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-16">
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
              {questionsCol_1.map((item) => (
                <YesNoBox label={item.question} key={item.id}>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    {item.options.map((option) => (
                      <Controller
                        key={`${option}${item.field}`}
                        name={`esdd.${item.field}`}
                        control={control}
                        render={({ field }) => (
                          <RadioButton
                            variant="green"
                            label={option}
                            id={`${option}${item.field}`}
                            value={option}
                            checked={field.value === option}
                            onChange={() => field.onChange(option)}
                          />
                        )}
                      />
                    ))}
                  </div>
                </YesNoBox>
              ))}
            </div>
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
              {questionsCol_2.map((item) => (
                <YesNoBox label={item.question} key={item.id}>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    {item.options.map((option) => (
                      <Controller
                        key={`${option}${item.field}`}
                        name={`esdd.${item.field}`}
                        control={control}
                        render={({ field }) => (
                          <RadioButton
                            variant="green"
                            label={option}
                            id={`${option}${item.field}`}
                            value={option}
                            checked={field.value === option}
                            onChange={() => field.onChange(option)}
                          />
                        )}
                      />
                    ))}
                  </div>
                </YesNoBox>
              ))}
            </div>
          </div>
        </QuestionBox>

        <QuestionBox
          title="Performance Standard 4"
          titleBorderd
          description="- Community Health & Safety and Security">
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-16">
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
              {questionsCol_3.map((item) => (
                <YesNoBox label={item.question} key={item.id}>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    {item.options.map((option) => (
                      <Controller
                        key={`${option}${item.field}`}
                        name={`esdd.${item.field}`}
                        control={control}
                        render={({ field }) => (
                          <RadioButton
                            variant="green"
                            label={option}
                            id={`${option}${item.field}`}
                            value={option}
                            checked={field.value === option}
                            onChange={() => field.onChange(option)}
                          />
                        )}
                      />
                    ))}
                  </div>
                </YesNoBox>
              ))}
            </div>
          </div>
        </QuestionBox>
      </div>
    </div>
  );
};

export default StepFour;
