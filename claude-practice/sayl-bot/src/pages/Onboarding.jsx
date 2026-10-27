import Icon from '../components/Icon'
import OnboardingShell, { BigButton } from '../components/OnboardingShell'

const goals = [
  { icon: 'goal-support', title: 'Customer Support Bot', text: 'Handle customer queries and provide instant support' },
  { icon: 'goal-faq', title: 'FAQ Bot', text: 'Instantly answer common customer questions' },
  { icon: 'goal-lead', title: 'Lead Generation Bot', text: 'Capture and qualify leads through conversations.' },
  { icon: 'goal-onboarding', title: 'Onboarding Bot', text: 'Guide users or employees through onboarding' },
]

function Onboarding() {
  return (
    <OnboardingShell step={2}>
      <div className="flex w-[494px] flex-col gap-8">
        <section className="flex flex-col items-center gap-6 rounded-2xl bg-white p-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl leading-[18px] text-text">Pick Your Bot's Goal</h1>
            <p className="text-sm leading-[13px] text-text/60">Choose a purpose to get started quickly.</p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {goals.map((goal) => (
              <button key={goal.title} type="button" className="flex h-[158px] w-[213px] flex-col gap-8 rounded-[11px] bg-page p-4 text-left">
                <span className="flex h-[50px] w-[54px] items-center justify-center rounded-md bg-white">
                  <Icon name={goal.icon} size={32} />
                </span>
                <span className="flex flex-col gap-2">
                  <span className="text-base leading-[14px] text-black">{goal.title}</span>
                  <span className="text-xs leading-[11px] text-text/60">{goal.text}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <BigButton href="#/onboarding-2">
          Next
          <Icon name="arrow-down-white" size={24} rotate={-90} />
        </BigButton>
      </div>
    </OnboardingShell>
  )
}

export default Onboarding
