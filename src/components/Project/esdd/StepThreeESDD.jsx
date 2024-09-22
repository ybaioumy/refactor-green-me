import { useFormContext, Controller } from 'react-hook-form';
import QuestionBox from '../../shared/QuestionBox';
import RadioButton from '../../shared/RadioButton';
import YesNoBox from '../../shared/YesNoBox';
const questions = [
  {
    title: 'Performance Standard 1',
    description: '- Assessment and Management on E&S Risks and Impacts',
    questions: [
      {
        label:
          'Does local legislation require an Environmental (and/or Social) Certificate?',
        name: 'esdd.legislationCerticate',
      },
      {
        label: 'Is there a Stakeholder Engagement Plan for the Project?',
        name: 'esdd.stakeholderPlan',
      },
      {
        label: 'Does the Project have an E&S monitoring plan in place?',
        name: 'esdd.esmonitoring',
      },
      {
        label:
          'Does the Project have any existing E&S management plans (incl. Emergency Response Plan) in place?',
        name: 'esdd.existingEsmanagementPlans',
      },
      {
        label: 'Does the Project have a Grievance Mechanism in place?',
        name: 'esdd.grievanceMechanism',
      },
    ],
  },
  {
    title: 'Performance Standard 2',
    description: '- Questions about Labour, Health, and Safety',
    questions: [
      {
        label:
          'Are there particular labour/social risks associated with the Project activities and its primary supply chains?',
        name: 'esdd.labourSocialRisks',
        options: ['Yes', 'No', 'Not sure'],
      },
      {
        label:
          'Are there measures in place to ensure that the Project complies with national occupational health & safety regulations?',
        name: 'esdd.safetyRegulations',
        options: ['Yes', 'No', 'Not sure'],
      },
      {
        label:
          'Will accommodation or workers’ camp(s) be built as part of the Project?',
        name: 'esdd.workersCamps',
        options: ['Yes', 'No', 'Not sure'],
      },
      {
        label:
          'Does the Applicant have a Human Resource Policy in place, and does it also cover the Project?',
        name: 'esdd.hrpolicyInPlace',
        options: ['Yes', 'No', 'Not sure'],
      },
      {
        label:
          'Are there measures in place to ensure the Project complies with current national labour regulations?',
        name: 'esdd.labourRegulations',
        options: ['Yes', 'No', 'Not sure'],
      },
    ],
  },
];

function StepThree() {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-10">
      {questions.map((section, sectionIndex) => (
        <QuestionBox
          key={sectionIndex}
          title={section.title}
          description={section.description}
          titleBorderd>
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-16">
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
              {section.questions.slice(0, 3).map((question, questionIndex) => (
                <YesNoBox key={questionIndex} label={question.label}>
                  <Controller
                    name={question.name}
                    control={control}
                    render={({ field }) => (
                      <>
                        <RadioButton
                          variant="green"
                          label="Yes"
                          id={`Yes${questionIndex}`}
                          value="Yes"
                          checked={field.value === 'Yes'}
                          onChange={() => field.onChange('Yes')}
                        />
                        <RadioButton
                          variant="green"
                          label="No"
                          id={`No${questionIndex}`}
                          value="No"
                          checked={field.value === 'No'}
                          onChange={() => field.onChange('No')}
                        />
                        {question.options?.includes('Not sure') && (
                          <RadioButton
                            variant="green"
                            label="Not Sure"
                            id={`NotSure${questionIndex}`}
                            value="Not sure"
                            checked={field.value === 'Not sure'}
                            onChange={() => field.onChange('Not sure')}
                          />
                        )}
                      </>
                    )}
                  />
                </YesNoBox>
              ))}
            </div>
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
              {section.questions.slice(3).map((question, questionIndex) => (
                <YesNoBox key={questionIndex} label={question.label}>
                  <Controller
                    name={question.name}
                    control={control}
                    render={({ field }) => (
                      <>
                        <RadioButton
                          variant="green"
                          label="Yes"
                          id={`Yes${questionIndex + 3}`}
                          value="Yes"
                          checked={field.value === 'Yes'}
                          onChange={() => field.onChange('Yes')}
                        />
                        <RadioButton
                          variant="green"
                          label="No"
                          id={`No${questionIndex + 3}`}
                          value="No"
                          checked={field.value === 'No'}
                          onChange={() => field.onChange('No')}
                        />
                        {question.options?.includes('Not sure') && (
                          <RadioButton
                            variant="green"
                            label="Not Sure"
                            id={`NotSure${questionIndex + 3}`}
                            value="Not sure"
                            checked={field.value === 'Not sure'}
                            onChange={() => field.onChange('Not sure')}
                          />
                        )}
                      </>
                    )}
                  />
                </YesNoBox>
              ))}
            </div>
          </div>
        </QuestionBox>
      ))}
    </div>
  );
}

export default StepThree;
