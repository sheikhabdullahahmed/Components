import Icon from '../components/Icon'
import AppLayout from '../components/layout/AppLayout'
import Breadcrumb from '../components/layout/Breadcrumb'
import TopBar from '../components/layout/TopBar'

const stats = [
  { icon: 'stat-messages', label: 'Total Conversations', value: '1,045', width: 268 },
  { icon: 'stat-resolved', label: 'Resolved Conversations', value: '2,118', width: 270 },
  { icon: 'stat-response', label: 'Avg Response Time', value: '3,567', width: 270 },
  { icon: 'stat-like', label: 'Satisfaction Rate', value: '1,230', width: 265 },
]

const conversations = [
  { name: 'Jhon Deo', message: 'Hello, I need help with my order' },
  { name: 'Alice Smith', message: 'Can you provide me with an update on my shipment?' },
  { name: 'Michael Brown', message: 'I have a question about the product warranty.' },
  { name: 'Sophia Johnson', message: 'When will my refund be processed?' },
  { name: 'David Wilson', message: 'I need assistance with my account settings.' },
  { name: 'Sophia Lee', message: 'Can you help me reset my password?' },
]

const config = [
  ['Language', 'English'],
  ['Theme', 'Dark'],
  ['Typeface', 'Okta Neu'],
  ['Bot Type', 'Costumer Support'],
  ['Status', 'Active'],
]

function BotDetail() {
  return (
    <AppLayout active="home">
      <div className="flex flex-col gap-4">
        <TopBar title="Home" subtitle="Quickly Create and manage your existing bots" />
        <Breadcrumb parent="Home" parentHref="#/home" current="SMIT Assistant" />
      </div>

      <h2 className="mt-6 pl-4 text-xl leading-[18px] text-text">SMIT Assistant</h2>

      <div className="mt-5 flex flex-col gap-5">
        <div className="flex justify-between">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2 rounded-lg bg-white p-4" style={{ width: stat.width }}>
              <span className="flex size-[30px] items-center justify-center rounded-[5px] bg-white">
                <Icon name={stat.icon} />
              </span>
              <div className="flex flex-col">
                <span className="text-sm leading-[21px] text-text/60">{stat.label}</span>
                <span className="text-lg leading-7 text-text">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-5">
          <section className="flex w-[680px] flex-col gap-4 rounded-xl bg-white px-4 py-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base leading-6 text-text">Resent Conversation</h3>
              <button type="button" className="rounded-[7px] bg-page px-[10px] py-2 text-sm leading-[13px] text-text/60">
                View All
              </button>
            </div>
            {conversations.map((item) => (
              <div key={item.name} className="flex h-[54px] items-center justify-between rounded-lg bg-page p-[10px]">
                <div className="flex flex-col gap-2 text-sm leading-[13px]">
                  <span className="text-black">{item.name}</span>
                  <span className="text-text/60">{item.message}</span>
                </div>
                <a href="#/chat-view" className="flex h-[29px] w-[89px] items-center justify-center rounded-full bg-white text-xs font-medium text-primary">
                  View Chats
                </a>
              </div>
            ))}
          </section>

          <section className="flex w-[447px] flex-col gap-[22px] rounded-[11px] bg-white px-4 py-5">
            <div className="flex items-start justify-between">
              <h3 className="text-base leading-[14px] text-text">Bot Configuration</h3>
              <button type="button" className="flex items-center gap-1 text-sm leading-[15px] text-primary">
                <Icon name="edit" size={16} />
                Edit Bot
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {config.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm leading-[21px] text-text/60">{label}</span>
                  <span className="rounded-[4px] bg-page px-[10px] py-[5px] text-sm leading-[14px] text-text">{value}</span>
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <span className="text-sm leading-[21px] text-text/60">Prompt</span>
                <p className="rounded-[7px] bg-page px-[6px] py-[10px] pr-[31px] text-sm leading-[1.1] text-text">
                  You are a friendly customer support assistant. Understand the customer’s issue, ask if needed, and give clear
                  step-by-step solutions. Be polite and concise. If unsure, suggest contacting human support.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  )
}

export default BotDetail
