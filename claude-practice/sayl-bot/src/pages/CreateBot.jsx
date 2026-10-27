import colorWheel from '../assets/images/color-wheel.png'
import layoutOne from '../assets/images/layout-large-1.svg'
import layoutTwo from '../assets/images/layout-large-2.svg'
import ChatWidget from '../components/ChatWidget'
import Icon from '../components/Icon'
import AppLayout from '../components/layout/AppLayout'
import Breadcrumb from '../components/layout/Breadcrumb'
import TopBar from '../components/layout/TopBar'

const swatches = ['#e84e58', '#f88800', '#feca39', '#0ebe75', '#116eef', '#5438db', '#6a4c28']

function Option({ label, children }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <span className="text-xs leading-[18px] text-text">{label}</span>
      {children}
    </div>
  )
}

function UpcomingStep({ label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-5 rounded-full border border-dashed border-text/60 shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
      <span className="text-xs leading-[11px] text-text/60">{label}</span>
    </div>
  )
}

function CreateBot() {
  return (
    <AppLayout active="home">
      <div className="flex flex-col gap-4">
        <TopBar title="Home" subtitle="Quickly Create and manage your existing bots" />
        <Breadcrumb parent="Dashboard" parentHref="#/home" current="Create Bot" />
      </div>

      <div className="mt-4 flex flex-col gap-[17px]">
        <h2 className="pl-4 text-xl leading-[18px] text-text">Create Bot</h2>

        <section className="flex justify-center rounded-[19px] bg-white px-[19px] pt-6 pb-[66px]">
          <div className="flex gap-[41px]">
            <div className="flex w-[587px] flex-col gap-4">
              <div className="flex items-end">
                <div className="relative h-[544px] w-6">
                  <div className="flex w-max items-center gap-2">
                    <Icon name="step-done" size={24} />
                    <span className="text-xs leading-[11px] text-text">Select Layout</span>
                  </div>
                  <div className="absolute top-[37px] left-3 h-[507px] border-l border-primary" />
                </div>

                <div className="flex w-[553px] flex-col gap-6 rounded-[15px] bg-page p-4">
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-5">
                      <img src={layoutOne} alt="Layout one" width={250} />
                      <img src={layoutTwo} alt="Layout two" width={250} />
                    </div>

                    <div className="flex justify-between">
                      <Option label="Theme">
                        <div className="flex h-7 w-16 items-center justify-evenly rounded-[4px] bg-white">
                          <span className="flex size-5 items-center justify-center rounded-[2px] bg-white shadow-[0_0_1px_rgba(0,0,0,0.05),1px_1px_2px_rgba(0,0,0,0.04),3px_3px_2px_rgba(0,0,0,0.03)]">
                            <Icon name="moon" />
                          </span>
                          <Icon name="sun" />
                        </div>
                      </Option>
                      <Option label="Typeface">
                        <button type="button" className="flex h-[26px] w-[83px] items-center justify-between rounded-[4px] bg-white px-[3px] text-xs text-text">
                          Okta Neu
                          <Icon name="chevron" size={16} rotate={-90} />
                        </button>
                      </Option>
                      <Option label="Color">
                        <div className="flex h-7 w-[220px] items-center justify-evenly rounded-[4px] bg-white">
                          {swatches.map((color) => (
                            <span key={color} className="size-5 rounded-[2px]" style={{ background: color }} />
                          ))}
                          <span className="flex size-5 items-center justify-center rounded-[3px] bg-cover" style={{ backgroundImage: `url(${colorWheel})`, backgroundSize: '100% 100%' }}>
                            <Icon name="plus-white" />
                          </span>
                        </div>
                      </Option>
                    </div>
                  </div>

                  <button type="button" className="h-10 w-[518px] rounded-md bg-primary text-base text-white">
                    Continue to Details
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-[7px]">
                  <UpcomingStep label="Enter Detail" />
                  <div className="ml-[10px] h-[43px] border-l border-dashed border-text/60" />
                </div>
                <UpcomingStep label="Deploy" />
              </div>
            </div>

            <ChatWidget tone="gray" className="h-[576px] w-[438px] rounded-2xl bg-page" />
          </div>
        </section>
      </div>
    </AppLayout>
  )
}

export default CreateBot
