import barChart from '../../assets/images/bar-chart.svg'
import lineChart from '../../assets/images/line-chart.svg'
import Icon from '../../components/Icon'
import AdminLayout from '../../components/admin/AdminLayout'
import AdminStatCard from '../../components/admin/AdminStatCard'
import AdminTopBar from '../../components/admin/AdminTopBar'
import StatusBadge from '../../components/StatusBadge'

const stats = [
  { icon: 'stat-total-users', label: 'Total User', value: '12,458', width: 268 },
  { icon: 'stat-active-bots', label: 'Active Bots', value: '2,118', width: 270 },
  { icon: 'stat-active-sub', label: 'Active Subscription', value: '3,567', width: 270 },
  { icon: 'message-tick', label: 'Today Conversations', value: '1,230', width: 265 },
]

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const yAxis = ['4k', '3k', '2k', '1k', '0']

const events = [
  { user: 'Jhondeo@example.com', action: 'Created New Bot', bot: 'Coustomer Support Bot', date: '2 Days Ago', status: 'Resolved' },
  { user: 'Jhondeo@example.com', action: 'Created New Bot', bot: 'Coustomer Support Bot', date: '2 Days Ago', status: 'Escalated' },
  { user: 'Jhondeo@example.com', action: 'Created New Bot', bot: 'Coustomer Support Bot', date: '2 Days Ago', status: 'Pending' },
  { user: 'Jhondeo@example.com', action: 'Created New Bot', bot: 'Coustomer Support Bot', date: '2 Days Ago', status: 'Escalated' },
]

function AdminDashboard() {
  return (
    <AdminLayout active="dashboard">
      <AdminTopBar title="Dashboard" subtitle="Quickly Create and manage your existing bots" />

      <div className="flex justify-between">
        {stats.map((stat) => (
          <AdminStatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="flex items-center gap-5">
        <div className="relative h-[362px] w-[680px] rounded-[20px] bg-white">
          <div className="flex items-center justify-between border-b border-page px-4 pt-[11px] pb-[9px]">
            <span className="text-base leading-5 text-text">User Statics</span>
            <div className="flex items-center gap-[7px]">
              <Icon name="growth-up" size={22} />
              <div className="flex flex-col items-end">
                <span className="text-sm leading-[18px] font-semibold text-text">1.3%</span>
                <span className="text-xs leading-4 text-text/60">VS LAST WEEK</span>
              </div>
            </div>
          </div>
          <div className="relative flex" style={{ height: 300 }}>
            <div className="flex flex-col justify-between py-3 pl-2 text-sm text-text/60">
              {yAxis.map((y) => (
                <span key={y}>{y}</span>
              ))}
            </div>
            <div className="relative flex-1">
              <img src={lineChart} alt="" className="h-full w-full" />
              <div className="absolute inset-x-8 bottom-6 flex justify-between text-sm text-[#615e83]">
                {days.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[362px] w-[447px] flex-col justify-evenly gap-5 rounded-xl bg-white p-4">
          <div className="flex items-center justify-between border-b border-text/20 pb-4">
            <span className="text-base leading-[14px] text-text">Bot Activity</span>
            <div className="flex items-center gap-5 text-sm leading-4 text-text/60">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" /> Solved
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#d0ccff]" /> Escaleted
              </span>
            </div>
          </div>
          <img src={barChart} alt="" className="w-full" />
          <div className="flex justify-between text-xs text-text/60">
            {days.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-5 rounded-[10px] bg-white p-4">
        <h2 className="text-base leading-[25px] font-medium text-text">Resent User</h2>
        <div className="grid grid-cols-[292px_229px_229px_229px_1fr] items-center rounded-[5px] bg-table-head px-3 py-1 text-sm leading-[21px] text-text">
          <span>User</span>
          <span>Action</span>
          <span>Bot</span>
          <span>Date</span>
          <span className="text-right">Status</span>
        </div>
        <div className="flex flex-col gap-2">
          {events.map((event, index) => (
            <div
              key={index}
              className={`grid h-12 grid-cols-[292px_229px_229px_229px_1fr] items-center text-sm leading-[21px] text-muted ${
                index < events.length - 1 ? 'border-b-[0.5px] border-line' : ''
              }`}
            >
              <span>{event.user}</span>
              <span>{event.action}</span>
              <span>{event.bot}</span>
              <span>{event.date}</span>
              <span className="justify-self-end">
                <StatusBadge status={event.status} />
              </span>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  )
}

export default AdminDashboard
