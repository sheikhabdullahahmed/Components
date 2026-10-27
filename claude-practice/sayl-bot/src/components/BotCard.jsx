import ChatWidget from './ChatWidget'
import Icon from './Icon'

// The preview is the real chat widget scaled down to the card size.
const PREVIEW_SCALE = 179 / 438

function Stat({ icon, children }) {
  return (
    <span className="flex items-center gap-[5px] text-[10px] leading-[13px] whitespace-nowrap text-text/60">
      <Icon name={icon} size={12} />
      {children}
    </span>
  )
}

function BotCard({ bot }) {
  return (
    <a href="#/bot-detail" className="flex h-[323px] w-[356px] flex-col justify-evenly rounded-[9px] bg-page p-[10px]">
      <div className="relative h-[196px] overflow-hidden rounded-t-[9px] bg-white">
        <div className="absolute top-16 left-[90px] size-[148px] rounded-full bg-primary opacity-50 blur-[75px]" />
        <div className="absolute top-[20px] left-[78px] h-[235.5px] w-[179px]">
          <div className="origin-top-left" style={{ transform: `scale(${PREVIEW_SCALE})` }}>
            <ChatWidget className="h-[576px] w-[438px] rounded-2xl bg-white" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-b-[10px] bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm leading-[21px] text-black">{bot.name}</span>
          <span className="rounded-full bg-line px-[10px] py-[2px] text-[10px] leading-[13px] text-text">Chat Bot</span>
        </div>
        <div className="grid grid-cols-[165px_auto] gap-y-3">
          <Stat icon="clock">Last Interaction : {bot.lastInteraction}</Stat>
          <Stat icon="status">Status : {bot.status}</Stat>
          <Stat icon="users">Total Interactions : {bot.interactions}/Day</Stat>
          <Stat icon="message-time">Avg Response Time : {bot.responseTime}</Stat>
        </div>
      </div>
    </a>
  )
}

export default BotCard
