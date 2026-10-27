import Icon from '../components/Icon'
import AppLayout from '../components/layout/AppLayout'
import TopBar from '../components/layout/TopBar'

const notifications = [
  { title: 'Email Notifications', text: 'Receive important updates about your account' },
  { title: 'Bot Alerts', text: 'Get notified when issues occur' },
  { title: 'Weekly Report', text: 'Get weekly chatbot performance summaries' },
  { title: 'Marketing Emails', text: 'Product updates and announcements' },
]

function Field({ label, value, disabled = false }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs leading-[11px] text-text">{label}</span>
      <input
        defaultValue={value}
        disabled={disabled}
        className={`h-[39px] rounded-[5px] bg-page px-[10px] text-xs outline-none ${disabled ? 'text-line' : 'text-text/60'}`}
      />
    </label>
  )
}

function Card({ title, rounded = 'rounded-lg', children }) {
  return (
    <section className={`flex flex-col gap-6 bg-white p-4 ${rounded}`}>
      <h2 className="text-base leading-[14px] text-text">{title}</h2>
      {children}
    </section>
  )
}

function Toggle() {
  return (
    <button type="button" className="flex h-5 w-[37px] items-center rounded-full bg-line px-1" aria-label="Toggle">
      <span className="size-[14px] rounded-full bg-white" />
    </button>
  )
}

function Settings() {
  return (
    <AppLayout active="setting">
      <div className="flex flex-col gap-5">
        <TopBar title="Settings" subtitle="Quickly Create and manage your existing bots" />

        <div className="flex flex-col gap-6">
          <Card title="Profile Information">
            <div className="grid grid-cols-2 gap-5">
              <Field label="Full Name" value="Muneeb ur Rehman" />
              <Field label="Email Address" value="muneeburehman@gmail.com" disabled />
              <Field label="Phone Number" value="+92 12345689" />
              <div className="flex flex-col gap-2">
                <span className="text-xs leading-[11px] text-text">Language</span>
                <div className="flex h-[39px] items-center justify-between rounded-[5px] bg-page px-[10px] text-xs text-text">
                  English
                  <button type="button" className="flex h-6 items-center gap-[6px] rounded-full bg-white px-1">
                    <Icon name="flag-us" />
                    <Icon name="chevron" size={10} rotate={-90} />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Organization Details">
            <div className="grid grid-cols-2 gap-5">
              <Field label="Organization Name" value="Saylani Tech" />
              <Field label="Industry" value="IT" />
              <Field label="Company Size" value="10-20" />
              <Field label="Website URL" value="www.saylanitech.com" />
            </div>
          </Card>

          <Card title="Notification" rounded="rounded-xl">
            <div className="flex flex-col gap-5">
              {notifications.map((item) => (
                <div key={item.title} className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 text-xs leading-[11px]">
                    <span className="text-text">{item.title}</span>
                    <span className="text-text/60">{item.text}</span>
                  </div>
                  <Toggle />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-between text-sm">
          <button type="button" className="h-[33px] w-[121px] rounded-md bg-[#be0a13] text-white">
            Delete Account
          </button>
          <div className="flex gap-5">
            <button type="button" className="h-[33px] w-[66px] rounded-md bg-line text-text/60">
              Cancel
            </button>
            <button type="button" className="h-[33px] w-[103px] rounded-md bg-primary text-white">
              Save Setting
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Settings
