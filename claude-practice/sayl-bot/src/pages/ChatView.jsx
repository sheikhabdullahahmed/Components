import AppLayout from '../components/layout/AppLayout'
import Breadcrumb from '../components/layout/Breadcrumb'
import TopBar from '../components/layout/TopBar'
import StatusBadge from '../components/StatusBadge'

const messages = [
  { from: 'user', text: 'Hello, I need help with my order' },
  { from: 'bot', text: 'Hi, how can I assist you with your order today?', width: 322 },
  { from: 'user', text: 'I need to check the status of my order' },
  { from: 'bot', text: 'Can you please provide your order number?', width: 322 },
  { from: 'user', text: 'Order #123456' },
  { from: 'bot', text: 'I have found your order. It was shipped and is expected to arrive tomorrow.', width: 399 },
]

const bubble = 'rounded-[5px] bg-page p-[10px] font-poppins text-base leading-4 text-text'

function ChatView() {
  return (
    <AppLayout active="chatlogs">
      <div className="flex flex-col gap-4">
        <TopBar title="Chatlogs" subtitle="Quickly view and manage your existing bots Chats" />
        <Breadcrumb parent="Chatlogs" parentHref="#/chatlogs" current="View Chats" />
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <h2 className="pl-[14.5px] text-xl leading-[18px] text-text">Conversation History</h2>

        <section className="flex h-[610px] flex-col rounded-xl bg-white p-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-[6px]">
                <span className="text-xl leading-[18px] text-text">Jhon Smith</span>
                <span className="text-xs leading-[11px] text-text/60">Jhonsmith@gmail.com</span>
              </div>
              <StatusBadge status="Resolved" />
            </div>
            <span className="rounded-[4px] bg-page p-[10px] font-poppins text-xs leading-3 text-black shadow-[3px_2px_8px_rgba(0,0,0,0.1),12px_8px_14px_rgba(0,0,0,0.09),26px_18px_19px_rgba(0,0,0,0.05)]">
              Session 01 : 15 Feb
            </span>
          </div>

          {/* user messages sit 16px below the previous bot message, bot replies 68px below the user */}
          <div className="mt-[55px] flex flex-col">
            {messages.map((message, index) =>
              message.from === 'user' ? (
                <div key={index} className={`flex items-center gap-4 ${index > 0 ? 'mt-[68px]' : ''}`}>
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xl text-white">J</span>
                  <span className={bubble}>{message.text}</span>
                </div>
              ) : (
                <p key={index} className={`mt-4 self-end ${bubble}`} style={{ width: message.width }}>
                  {message.text}
                </p>
              ),
            )}
          </div>
        </section>
      </div>
    </AppLayout>
  )
}

export default ChatView
