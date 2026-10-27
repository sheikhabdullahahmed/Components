import Icon from '../../components/Icon'
import AdminLayout from '../../components/admin/AdminLayout'
import AdminTopBar from '../../components/admin/AdminTopBar'
import TicketCard from '../../components/admin/TicketCard'

const tickets = [
  { bot: 'Smit Bot', description: 'Bot not responding to user queries Unable to process request due to a system error. Please try again. The bot is currently experiencing technical difficulties and may not be able to re....', ticketId: '128396', priority: 'Low', category: 'Chat Bot Feedback', date: 'Jan,12' },
  { bot: 'Saylani', description: 'User requests guidance on how to integrate third-party APIs with the chat bot builder. Documentation might need updating for clarity.', ticketId: '128396', priority: 'Low', category: 'Chat Bot Feedback', date: 'Jan,12' },
  { bot: 'Folify', description: 'User has encountered a bug when trying to modify existing bot flows. The interface freezes and requires a refresh to continue working.', ticketId: '128396', priority: 'Low', category: 'Chat Bot Feedback', date: 'Jan,12' },
]
const rows = [tickets, tickets]

function FilterSelect({ label, rotate }) {
  return (
    <button type="button" className="flex h-8 items-center gap-2 rounded-[3px] bg-white px-2 text-xs leading-[18px] text-[#615d5d]">
      {label}
      <Icon name="chevron" size={12} rotate={rotate} />
    </button>
  )
}

function SupportTickets() {
  return (
    <AdminLayout active="tickets">
      <AdminTopBar title="Support Tickets" subtitle="Quickly Create and manage your existing bots" />

      <section className="flex flex-col items-center gap-4 rounded-2xl bg-white p-4">
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-base leading-[25px] font-medium text-text">Tickets</h2>
          <div className="flex items-center gap-4">
            <label className="flex h-10 w-[791px] items-center gap-[10px] rounded-md bg-page p-[10px]">
              <Icon name="search" />
              <input placeholder="Search by Session ID, User, or Date" className="flex-1 text-xs text-text outline-none placeholder:text-text/60" />
            </label>
            <FilterSelect label="All time" rotate={90} />
            <FilterSelect label="All Priority" rotate={-90} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
          {rows.map((row, i) => (
            <div key={i} className="flex justify-between">
              {row.map((ticket, j) => (
                <TicketCard key={j} {...ticket} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  )
}

export default SupportTickets
