import BotLogo from '../BotLogo'
import Icon from '../Icon'

const links = [
  { id: 'dashboard', label: 'Dashboard', href: '#/admin', icon: 'admin-dashboard' },
  { id: 'user', label: 'User', href: '#/admin/user', icon: 'admin-user' },
  { id: 'subscription', label: 'Subscription', href: '#/admin/subscription', icon: 'admin-subscription' },
  { id: 'tickets', label: 'Support Tickets', href: '#/admin/tickets', icon: 'admin-tickets' },
  { id: 'setting', label: 'Setting', href: '#/admin/settings', icon: 'admin-setting' },
]

function AdminSidebar({ active }) {
  return (
    <aside className="flex h-[867px] w-[213px] shrink-0 flex-col justify-between rounded-2xl bg-white p-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-[10px]">
          <BotLogo width={32} height={32} />
          <span className="font-haas text-base leading-[19px] text-text">Chat Bot Builder</span>
        </div>
        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                className={`flex items-center gap-2 rounded-md p-2 text-base leading-5 ${
                  isActive ? 'bg-white text-text shadow-[0_4px_11.7px_rgba(0,0,0,0.12)]' : 'text-text/60'
                }`}
              >
                <Icon name={isActive ? `${link.icon}-active` : link.icon} />
                {link.label}
              </a>
            )
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-8">
        <a href="#/" className="flex items-center gap-2 text-base leading-5 text-text/60">
          <Icon name="logout" rotate={180} />
          Logout
        </a>
        <div className="flex h-9 items-center justify-evenly rounded-[4px] bg-page p-[5px]">
          <button type="button" className="flex h-[26px] w-[81px] items-center gap-2 rounded-[4px] bg-white px-4 text-xs text-text">
            <Icon name="sun-small" size={12} />
            Light
          </button>
          <button type="button" className="flex h-[26px] w-[81px] items-center gap-2 rounded-[3px] px-4 text-xs text-text/60">
            <Icon name="moon-small" size={12} />
            Dark
          </button>
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar
