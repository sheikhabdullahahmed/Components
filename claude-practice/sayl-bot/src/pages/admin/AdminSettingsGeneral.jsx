import botIcon from '../../assets/bot-icon.png'
import AdminLayout from '../../components/admin/AdminLayout'
import AdminTopBar from '../../components/admin/AdminTopBar'
import SettingsField from '../../components/admin/SettingsField'
import SettingsTabs from '../../components/admin/SettingsTabs'

function Toggle({ on }) {
  return (
    <button type="button" className={`flex h-5 w-[37px] items-center rounded-full px-1 ${on ? 'justify-end bg-primary' : 'bg-line'}`} aria-label="Toggle">
      <span className="size-[14px] rounded-full bg-white" />
    </button>
  )
}

function AdminSettingsGeneral() {
  return (
    <AdminLayout active="setting">
      <AdminTopBar title="Seeting" subtitle="Quickly Create and manage your existing bots" />
      <SettingsTabs active="general" />

      <section className="flex flex-col gap-5 rounded-xl bg-white p-4">
        <h2 className="text-base leading-[14px] text-text">Platform Information</h2>
        <div className="flex items-center gap-[10px]">
          <span
            className="size-[50px] rounded-full bg-primary"
            style={{ maskImage: `url(${botIcon})`, maskSize: 'cover', maskPosition: 'center' }}
          />
          <button type="button" className="h-[33px] w-24 rounded-[3px] bg-primary text-[10px] text-white">
            Upload New Logo
          </button>
          <button type="button" className="h-[33px] w-[50px] rounded-[3px] bg-page text-[10px] text-text/60">
            Remove
          </button>
        </div>
        <div className="flex gap-5">
          <SettingsField label="SMIT Chat Bot Builder" value="SMIT Chat Bot Builder" />
          <SettingsField label="Support Email" value="support@chatbotbuilder@gmail.com" />
        </div>
        <div className="flex gap-5">
          <SettingsField label="Email" value="admin.muneeb@gmail.com" />
          <SettingsField label="Password" value="******************" />
        </div>
      </section>

      <section className="flex flex-col items-center gap-5 rounded-md bg-white p-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-base leading-[14px] text-text">Maintenance Mode</span>
          <Toggle />
        </div>
        <div className="flex w-full flex-col gap-4">
          <span className="text-xs leading-[11px] text-text">Maintenance Messege</span>
          <div className="flex items-center justify-between rounded-[5px] bg-page p-[10px]">
            <span className="text-xs leading-[11px] text-text/60">We're currently performing scheduled maintenance. We'll be back soon!</span>
          </div>
        </div>
        <p className="text-[10px] leading-[9px] text-text/60">Users will see a maintenance message and won't be able to access the platform</p>
      </section>
    </AdminLayout>
  )
}

export default AdminSettingsGeneral
