import AdminLayout from '../../components/admin/AdminLayout'
import AdminTopBar from '../../components/admin/AdminTopBar'
import SettingsField from '../../components/admin/SettingsField'
import SettingsTabs from '../../components/admin/SettingsTabs'

const systemLimits = [
  { label: 'Max Concurrent Bot Sessions', value: '10000' },
  { label: 'Database Connection Pool Size', value: '100' },
]

function AdminSettingsLimits() {
  return (
    <AdminLayout active="setting">
      <AdminTopBar title="Seeting" subtitle="Quickly Create and manage your existing bots" />
      <SettingsTabs active="limits" />

      <section className="flex flex-col gap-5 rounded-xl bg-white p-4">
        <h2 className="text-base leading-[14px] text-text">Default Platform Limits</h2>
        <div className="flex gap-5">
          <SettingsField label="Max Bots Per User (Free Tier)" value="3" />
          <SettingsField label="Max Messages Per Month (Free Tier)" value="1000" />
        </div>
        <div className="flex gap-5">
          <SettingsField label="Max File Upload Size (MB)" value="10" />
          <SettingsField label="API Rate Limit (requests per minute)" value="60" />
        </div>
      </section>

      <section className="flex flex-col gap-5 rounded-md bg-white p-4">
        <h2 className="text-base leading-[14px] text-text">System Resource Limits</h2>
        {systemLimits.map((limit) => (
          <div key={limit.label} className="flex flex-col gap-4">
            <span className="text-xs leading-[11px] text-text">{limit.label}</span>
            <div className="rounded-[5px] bg-page px-[10px] py-[14px] text-xs leading-[11px] text-text/60">{limit.value}</div>
          </div>
        ))}
      </section>
    </AdminLayout>
  )
}

export default AdminSettingsLimits
