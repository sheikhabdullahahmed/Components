import BotLogo from './BotLogo'
import Icon from './Icon'
import { CrossIcon } from './icons'

const suggestions = ['Admission Process Guide', 'Do You Provide Certificates']

// The widget appears on different backgrounds, so chip colors change with it.
const tones = {
  login: { label: 'border-chip-border bg-chip', chip: 'bg-chip', name: 'text-[#0c0c0c]' },
  white: { label: 'border-text bg-page', chip: 'bg-page', name: 'text-text' },
  gray: { label: 'border-text bg-page', chip: 'bg-white', name: 'text-text' },
}

function ChatWidget({ tone = 'white', className = '', welcomeGap = 107, inputWidth = 333 }) {
  const colors = tones[tone]

  return (
    <div className={`flex flex-col items-center justify-between p-6 ${className}`}>
      <div className="flex w-full flex-col items-center" style={{ gap: welcomeGap }}>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <BotLogo width={39.2} height={32} />
            <span className={`font-haas text-base leading-[19px] ${colors.name}`}>Smit Bot</span>
          </div>
          <button type="button" className="rounded-[4px] bg-white" aria-label="Close">
            <CrossIcon />
          </button>
        </div>

        <div className="flex w-[351px] flex-col items-center gap-[14px]">
          <span className={`rounded-[4px] border px-[10px] py-[6px] font-montserrat text-xs leading-[15px] text-chip-text ${colors.label}`}>
            AI Assistant
          </span>
          <div className="flex flex-col items-center gap-4 text-center font-montserrat">
            <h2 className="text-xl leading-6 font-medium text-[#1a1a1a]">Welcome to SMIT Assistant</h2>
            <p className="text-sm leading-[17px] text-chip-text">
              Assalamu Alaikum! I am SMIT's AI Assistant. Feel free to ask about admissions, courses, or anything else.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[21px]">
        <div className="flex gap-[11px]">
          {suggestions.map((text) => (
            <span key={text} className={`rounded-[4px] px-[10px] py-[6px] font-montserrat text-xs leading-[15px] text-chip-text ${colors.chip}`}>
              {text}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div
            className={`flex h-[43px] items-center justify-between rounded-[5px] px-4 shadow-[0_4px_8.7px_rgba(0,0,0,0.05)] ${colors.chip}`}
            style={{ width: inputWidth }}
          >
            <span className="font-montserrat text-xs font-medium text-chip-text">Type You message here....</span>
            <Icon name="refresh" size={23} />
          </div>
          <button type="button" className="flex size-[43px] items-center justify-center rounded-md bg-primary" aria-label="Send">
            <Icon name="send" size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWidget
