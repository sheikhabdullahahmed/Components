const tabs = [
  { id: 'general', label: 'General Settings', href: '#/admin/settings' },
  { id: 'email', label: 'Email Configuration', href: '#/admin/settings/email' },
  { id: 'limits', label: 'Platform Limits', href: '#/admin/settings/limits' },
]

function SettingsTabs({ active }) {
  return (
    <div className="flex h-[41px] w-[398px] items-center rounded-[4px] bg-white p-[5px]">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          href={tab.href}
          className={`flex h-[31px] w-[131px] items-center justify-center rounded-[5px] text-xs leading-[11px] ${
            active === tab.id ? 'bg-page text-text' : 'text-text/60'
          }`}
        >
          {tab.label}
        </a>
      ))}
    </div>
  )
}

export default SettingsTabs
