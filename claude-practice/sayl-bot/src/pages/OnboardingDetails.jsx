import layoutOne from '../assets/images/layout-small-1.svg'
import layoutTwo from '../assets/images/layout-small-2.svg'
import Icon from '../components/Icon'
import OnboardingShell, { BigButton } from '../components/OnboardingShell'

function SelectBox({ children }) {
  return (
    <button type="button" className="flex h-[41px] w-[215px] items-center justify-between rounded-[4px] bg-page p-[10px] text-sm leading-[21px] text-text">
      {children}
      <Icon name="chevron" size={16} rotate={-90} />
    </button>
  )
}

function OnboardingDetails() {
  return (
    <OnboardingShell step={3}>
      <div className="flex w-[494px] flex-col gap-8">
        <section className="flex flex-col items-center gap-6 rounded-[13px] bg-white p-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl leading-[18px] text-text">Create Your Bot in Minutes</h1>
            <p className="text-sm leading-[13px] text-text/60">Let's personalize your chatbot to match your needs</p>
          </div>

          <div className="flex w-full flex-col gap-4">
            <input
              placeholder="Enter Your Bot Name Here"
              className="h-[39px] rounded-[4px] bg-page px-[10px] text-sm text-text outline-none placeholder:text-text"
            />
            <div className="flex justify-between">
              <SelectBox>Customer Support Bot</SelectBox>
              <SelectBox>Language</SelectBox>
            </div>

            <div className="flex flex-col gap-4 rounded-xl bg-page p-4">
              <span className="text-sm leading-[13px] text-text">Select Layout</span>
              <div className="flex gap-[16.6px]">
                <img src={layoutOne} alt="Layout one" width={199} />
                <img src={layoutTwo} alt="Layout two" width={199} />
              </div>
            </div>

            <label className="relative flex h-11 flex-col rounded-md bg-page p-[10px]">
              <span className="text-sm leading-[13px] text-text">Purpose</span>
              <input placeholder="eg :" className="text-xs leading-[11px] text-text outline-none placeholder:text-text/60" />
              <Icon name="resize-handle-small" size={9} className="absolute right-[10px] bottom-2" />
            </label>
          </div>
        </section>

        <BigButton href="#/home">Create</BigButton>
      </div>
    </OnboardingShell>
  )
}

export default OnboardingDetails
