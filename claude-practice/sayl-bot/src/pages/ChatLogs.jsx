import Icon from '../components/Icon'
import AppLayout from '../components/layout/AppLayout'
import TopBar from '../components/layout/TopBar'
import PrimaryButton from '../components/PrimaryButton'
import StatusBadge from '../components/StatusBadge'

const chats = [
  { id: 'ABC1234567', user: 'John Doe', date: '12 Dec 26', duration: '3 Mins 10 Secs', status: 'Resolved' },
  { id: 'DEF2345678', user: 'Jane Smith', date: '15 Dec 26', duration: '5 Mins 20 Secs', status: 'Escalated' },
  { id: 'GHI3456789', user: 'Alice Johnson', date: '18 Dec 26', duration: '2 Mins 15 Secs', status: 'Resolved' },
  { id: 'JKL4567890', user: 'Bob Brown', date: '20 Dec 26', duration: '4 Mins 50 Secs', status: 'Pending' },
  { id: 'MNO5678901', user: 'Charlie White', date: '22 Dec 26', duration: '3 Mins 30 Secs', status: 'Resolved' },
  { id: 'PQR6789012', user: 'Diana Green', date: '24 Dec 26', duration: '6 Mins 5 Secs', status: 'Escalated' },
  { id: 'STU7890123', user: 'Ethan Black', date: '26 Dec 26', duration: '1 Min 45 Secs', status: 'Resolved' },
  { id: 'VWX8901234', user: 'Fiona Blue', date: '28 Dec 26', duration: '7 Mins 25 Secs', status: 'Escalated' },
  { id: 'YZA9012345', user: 'George Red', date: '30 Dec 26', duration: '4 Mins 1 Sec', status: 'Resolved' },
]

// Column positions are taken from the Figma frame.
const headColumns = 'grid-cols-[212.6px_183.6px_179.6px_239.6px_226.6px_1fr]'
const rowColumns = 'grid-cols-[224px_179px_185px_227px_203px_1fr]'

function FilterSelect({ label, rotate }) {
  return (
    <button type="button" className="flex h-8 w-[72px] items-center justify-evenly rounded-[3px] bg-white text-xs leading-[18px] text-[#615d5d]">
      {label}
      <Icon name="chevron" size={12} rotate={rotate} />
    </button>
  )
}

function ChatLogs() {
  return (
    <AppLayout active="chatlogs">
      <div className="flex flex-col items-center gap-5">
        <div className="flex w-full flex-col gap-5">
          <TopBar title="Chatlogs" subtitle="Quickly view and manage your existing bots" />

          <section className="flex h-[690px] flex-col gap-6 rounded-[10px] bg-white p-4">
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl leading-[31px] font-medium text-text">Users</h2>
                <PrimaryButton icon="download" className="w-[125px]">
                  Export Logs
                </PrimaryButton>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex h-10 w-[423px] items-center gap-[10px] rounded-md bg-page p-[10px]">
                  <Icon name="search" />
                  <input
                    placeholder="Search by Session ID, User, or Date"
                    className="flex-1 text-xs text-text outline-none placeholder:text-text/60"
                  />
                </label>
                <div className="flex h-[37px] items-center gap-2 rounded-md bg-page px-[6px]">
                  <button type="button" className="h-[29px] w-[51px] rounded-[4px] bg-white text-xs text-text">
                    All
                  </button>
                  <button type="button" className="text-xs text-text/60">
                    Rescent
                  </button>
                </div>
                <div className="flex gap-[30px]">
                  <FilterSelect label="Time" rotate={-90} />
                  <FilterSelect label="Date" rotate={90} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className={`grid h-[29px] items-center rounded-[5px] bg-table-head px-3 text-sm leading-[21px] text-text ${headColumns}`}>
                <span>Session ID</span>
                <span>Users</span>
                <span>Date</span>
                <span>Chat Duration</span>
                <span>Chat Status</span>
                <span className="text-right">Actions</span>
              </div>

              <div className="flex w-[1107px] flex-col gap-2">
                {chats.map((chat, index) => (
                  <div
                    key={chat.id}
                    className={`grid items-center text-sm leading-[21px] text-muted ${rowColumns} ${
                      index < chats.length - 1 ? 'h-[49px] border-b-[0.5px] border-line' : 'h-[39px]'
                    }`}
                  >
                    <span>{chat.id}</span>
                    <span>{chat.user}</span>
                    <span>{chat.date}</span>
                    <span>{chat.duration}</span>
                    <span>
                      <StatusBadge status={chat.status} />
                    </span>
                    <a href="#/chat-view" className="flex h-[29px] w-[89px] items-center justify-center justify-self-end rounded-full bg-page text-xs font-medium text-primary">
                      View Chats
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="flex h-11 w-[195px] items-center justify-between rounded-[7px] bg-white p-[10px]">
          <Icon name="page-arrow" size={24} rotate={90} />
          <span className="text-xs leading-4 font-medium text-text">Page 2 Out 6</span>
          <Icon name="page-arrow" size={24} rotate={-90} />
        </div>
      </div>
    </AppLayout>
  )
}

export default ChatLogs
