import { useFormContext, Controller } from 'react-hook-form';
import QuestionBox from '../../shared/QuestionBox';
import RadioButton from '../../shared/RadioButton';
import YesNoBox from '../../shared/YesNoBox';

const StepFive = () => {
  const { control } = useFormContext();

  const questions = [
    {
      id: '1',
      title: 'Performance Standard 5',
      description: '- Land Acquisition and Involuntary Resettlement',
      question: 'Will there be any access restrictions due to the Project?',
      field: 'accessRestrictions',
      options: ['Yes', 'No'],
    },
    {
      id: '2',
      title: 'Performance Standard 6',
      description:
        '- Biodiversity Conservation and Sustainable Management of Living Natural Resources',
      children: [
        {
          question: 'Will the Project involve any vegetation clearing?',
          field: 'involveVegetationClearing',
          options: ['Yes', 'No', 'Not sure'],
        },
        {
          question:
            'Will the Project be entirely or partly developed in areas of high ecological value or in the buffer zone of protected areas?',
          field: 'developedInBufferZoneOfProtectedAreas',
          options: ['Yes', 'No', 'Not sure'],
        },
      ],
    },
    {
      id: '3',
      title: 'Performance Standard 7',
      description: '- Indigenous People',
      question:
        'Is the Project site in an area inhabited or important to indigenous people?',
      field: 'siteInImportantAreaToIndigenousPeople',
      options: ['Yes', 'No', 'Not sure'],
    },
    {
      id: '4',
      title: 'Performance Standard 8',
      description: '- Cultural Heritage',
      question:
        'Do any known sites with archaeological, historical, cultural, artistic or religious value exist in the Project area?',
      field: 'archaeologicalSitesExsit',
      options: ['Yes', 'No', 'Not sure'],
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
        {questions.map(
          ({ id, title, question, field, options, description, children }) => (
            <div key={id} className="mb-6">
              <QuestionBox
                title={title}
                description={description}
                titleBorderd
                direction="flex">
                {children ? (
                  children.map((child, index) => (
                    <YesNoBox label={child.question} key={index}>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        {child.options.map((option) => (
                          <Controller
                            key={`${option}${child.field}`}
                            name={`esdd.${child.field}`}
                            control={control}
                            render={({ field }) => (
                              <RadioButton
                                variant="green"
                                label={option}
                                id={`${option}${child.field}`}
                                value={option}
                                checked={field.value === option}
                                onChange={() => field.onChange(option)}
                              />
                            )}
                          />
                        ))}
                      </div>
                    </YesNoBox>
                  ))
                ) : (
                  <YesNoBox label={question}>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      {options.map((option) => (
                        <Controller
                          key={`${option}${field}`}
                          name={`esdd.${field}`}
                          control={control}
                          render={({ field }) => (
                            <RadioButton
                              variant="green"
                              label={option}
                              id={`${option}${field}`}
                              value={option}
                              checked={field.value === option}
                              onChange={() => field.onChange(option)}
                            />
                          )}
                        />
                      ))}
                    </div>
                  </YesNoBox>
                )}
              </QuestionBox>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StepFive;
