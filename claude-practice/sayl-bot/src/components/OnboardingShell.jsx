import BotLogo from './BotLogo'
import Icon from './Icon'

function StepLine({ done }) {
  return <div className={`w-[89.5px] border-t ${done ? 'border-primary' : 'border-dashed border-text/60'}`} />
}

// Header + 3-step progress bar shared by both onboarding screens.
// `step` is the current step (2 = "Select Goal", 3 = "Create Boat").
function OnboardingShell({ step, children }) {
  const onLastStep = step === 3

  return (
    <div className="min-h-screen bg-page px-8 pt-[55px]">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <BotLogo width={32} height={32} />
          <span className="font-haas text-base leading-[19px] text-[#0c0c0c]">Chat Bot Builder</span>
        </div>
        <a href="#/home" className="rounded-[4px] bg-white px-[21px] py-[5px] text-xs leading-[18px] text-[#898383]">
          Skip
        </a>
      </header>

      <div className="mx-auto mt-[31px] flex w-[568px] flex-col items-center gap-16">
        <div className="flex w-full items-center gap-6 text-xs leading-[11px]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Icon name="step-done" size={24} />
              <span className={onLastStep ? 'text-text' : 'text-black'}>Create Account</span>
            </div>
            <StepLine done />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-[10px]">
              <Icon name="step-done" size={24} />
              <span className={onLastStep ? 'text-text' : 'text-black'}>Select Goal</span>
            </div>
            <StepLine done={onLastStep} />
          </div>
          <div className="flex items-center gap-2">
            {onLastStep ? (
              <span className="size-5 rounded-full bg-primary" />
            ) : (
              <span className="size-5 rounded-full border border-text/60 shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
            )}
            <span className={onLastStep ? 'text-text' : 'text-text/60'}>Create Boat</span>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}

export function BigButton({ href, children }) {
  return (
    <a
      href={href}
      className="flex h-14 w-full items-center justify-center gap-4 rounded-lg border border-primary-border bg-primary text-xl leading-[18px] font-medium text-white shadow-[0_0_9.6px_rgba(71,53,253,0.25),0_0_5px_rgba(71,53,253,0.24)]"
    >
      {children}
    </a>
  )
}

export default OnboardingShell
