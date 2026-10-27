import Icon from '../Icon'

function TopBar({ title, subtitle }) {
  return (
    <header className="flex h-[63px] items-center justify-between rounded-[7px] bg-white px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-base leading-[14px] text-text">{title}</h1>
        <p className="text-sm leading-[13px] text-text/60">{subtitle}</p>
      </div>
      <div className="flex items-center gap-[13px]">
        <div className="flex items-center gap-[10px]">
          <Icon name="bell" />
          <Icon name="support-active" />
        </div>
        <div className="h-5 w-px bg-text" />
        <div className="flex items-center gap-2">
          <div className="flex size-5 items-center justify-center rounded-full bg-primary">
            <Icon name="profile-white" />
          </div>
          <span className="text-base leading-6 text-text">muneeburehman@gmail.com</span>
        </div>
      </div>
    </header>
  )
}

export default TopBar
