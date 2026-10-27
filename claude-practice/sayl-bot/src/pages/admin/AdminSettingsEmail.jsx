import AdminLayout from '../../components/admin/AdminLayout'
import AdminTopBar from '../../components/admin/AdminTopBar'
import SettingsField from '../../components/admin/SettingsField'
import SettingsTabs from '../../components/admin/SettingsTabs'

const templates = ['Password', 'Subscription Renewal']

function AdminSettingsEmail() {
  return (
    <AdminLayout active="setting">
      <AdminTopBar title="Seeting" subtitle="Quickly Create and manage your existing bots" />
      <SettingsTabs active="email" />

      <section className="flex flex-col gap-5 rounded-xl bg-white p-4">
        <h2 className="text-base leading-[14px] text-text">SMT Configuration</h2>
        <div className="flex gap-5">
          <SettingsField label="SMTP Host" value="smtp.gmail.com" />
          <SettingsField label="SMTP Port" value="587" />
        </div>
        <div className="flex gap-5">
          <SettingsField label="SMTP Username" value="noreply@chatbotbuilder.com" />
          <SettingsField label="SMTP Password" value="******************" />
        </div>
      </section>

      <section className="flex flex-col gap-5 rounded-md bg-white p-4">
        <h2 className="text-base leading-[14px] text-text">Email Template</h2>
        {templates.map((label) => (
          <div key={label} className="flex flex-col gap-4">
            <span className="text-xs leading-[11px] text-text">{label}</span>
            <div className="flex items-center justify-between rounded-[5px] bg-page px-[10px] py-[7px]">
              <span className="text-xs leading-[11px] text-text/60">Sent when user requests password reset`</span>
              <button type="button" className="h-[25px] rounded-[2px] bg-white px-[5px] text-sm text-text/60">
                Edit Detail
              </button>
            </div>
          </div>
        ))}
      </section>
    </AdminLayout>
  )
}

export default AdminSettingsEmail
