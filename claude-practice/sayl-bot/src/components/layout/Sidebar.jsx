import BotLogo from '../BotLogo'
import Icon from '../Icon'

const mainLinks = [
  { id: 'home', label: 'Home', href: '#/home' },
  { id: 'chatlogs', label: 'Chatlogs', href: '#/chatlogs' },
]

const bottomLinks = [
  { id: 'setting', label: 'Setting', href: '#/settings', gap: 'gap-2' },
  { id: 'support', label: 'Support', href: '#/support', gap: 'gap-3' },
]

// Active items use the dark version of their icon.
const iconFor = (id, isActive) => (isActive ? `${id}-active` : id)

function Sidebar({ active }) {
  return (
    <aside className="flex h-[837px] w-[213px] shrink-0 flex-col justify-between rounded-2xl bg-white p-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-[10px]">
          <BotLogo width={32} height={32} />
          <span className="font-haas text-base leading-[19px] text-text">Chat Bot Builder</span>
        </div>
        <nav className="flex flex-col gap-2">
          {mainLinks.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                className={`flex items-center gap-2 rounded-md p-2 text-base leading-5 ${
                  isActive ? 'bg-white text-text shadow-[0_4px_11.7px_rgba(0,0,0,0.12)]' : 'text-text/60'
                }`}
              >
                <Icon name={iconFor(link.id, isActive)} />
                {link.label}
              </a>
            )
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {bottomLinks.map((link) => {
            const isActive = active === link.id
            return (
              <a key={link.id} href={link.href} className={`flex items-center text-base leading-5 ${link.gap} ${isActive ? 'text-text' : 'text-text/60'}`}>
                <Icon name={iconFor(link.id, isActive)} />
                {link.label}
              </a>
            )
          })}
          <a href="#/" className="flex items-center gap-2 text-base leading-5 text-text/60">
            <Icon name="logout" rotate={180} />
            Logout
          </a>
        </div>

        <div className="flex flex-col gap-5">
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

          <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-[10px] bg-page p-4">
            <div className="absolute top-[91px] -left-[50px] size-[132px] rounded-full bg-primary blur-[40px]" />
            <div className="relative flex w-[149px] flex-col gap-4">
              <div className="flex flex-col gap-[6px]">
                <span className="text-[10px] leading-[9px] text-text/60">Current Plane</span>
                <span className="text-base leading-[14px] text-text">Basic</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[7px] leading-[6px] text-text/60">12,000 Credits out of 15,000</span>
                <div className="h-1 rounded-full bg-line">
                  <div className="h-1 w-[103px] rounded-full bg-primary" />
                </div>
              </div>
            </div>
            <button type="button" className="relative h-[31px] w-[149px] rounded-[3px] bg-primary text-sm text-white">
              Upgrade To Pro
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
