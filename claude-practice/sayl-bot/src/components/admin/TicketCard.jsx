import BotLogo from '../BotLogo'
import Icon from '../Icon'

function TicketCard({ bot, description, ticketId, priority, category, date }) {
  return (
    <div className="flex h-[161px] w-[358px] flex-col justify-evenly gap-4 rounded-lg bg-page p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BotLogo width={39.2} height={32} />
          <span className="text-base leading-[14px] text-text">{bot}</span>
        </div>
        <a href="#/admin/tickets/view" className="flex h-[23px] w-[52px] items-center justify-center rounded-full bg-page text-xs font-medium text-primary">
          View
        </a>
      </div>
      <p className="line-clamp-3 text-xs leading-[11px] text-text">{description}</p>
      <div className="flex flex-col gap-2 text-[10px] leading-[9px] text-text/60">
        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <Icon name="ticket-id" size={12} />
            Ticket ID: {ticketId}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="priority" size={12} />
            Priority: {priority}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-[7px]">
            <Icon name="category" size={12} />
            Category: {category}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="calendar" size={12} />
            Created Date: {date}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
