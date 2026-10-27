import Icon from '../../components/Icon'
import AdminLayout from '../../components/admin/AdminLayout'
import AdminTopBar from '../../components/admin/AdminTopBar'
import StatusBadge from '../../components/StatusBadge'

const plans = { Pro: 'bg-white text-text', Standard: 'bg-page text-primary' }

const users = [
  { bot: 'Customer Support', owner: 'Jhondeo@example.com', conversations: '12,40', created: 'Jan 20, 2024', plan: 'Pro', status: 'Active' },
  { bot: 'Customer Support', owner: 'Jhondeo@example.com', conversations: '12,40', created: 'Jan 20, 2024', plan: 'Standard', status: 'Paused' },
  { bot: 'Customer Support', owner: 'Jhondeo@example.com', conversations: '12,40', created: 'Jan 20, 2024', plan: 'Standard', status: 'Active' },
  { bot: 'Customer Support', owner: 'Jhondeo@example.com', conversations: '12,40', created: 'Jan 20, 2024', plan: 'Standard', status: 'Active' },
  { bot: 'Customer Support', owner: 'Jhondeo@example.com', conversations: '12,40', created: 'Jan 20, 2024', plan: 'Standard', status: 'Paused' },
  { bot: 'Customer Support', owner: 'Jhondeo@example.com', conversations: '12,40', created: 'Jan 20, 2024', plan: 'Standard', status: 'Active' },
  { bot: 'Customer Support', owner: 'Jhondeo@example.com', conversations: '12,40', created: 'Jan 20, 2024', plan: 'Standard', status: 'Paused' },
  { bot: 'Customer Support', owner: 'Jhondeo@example.com', conversations: '12,40', created: 'Jan 20, 2024', plan: 'Standard', status: 'Active' },
]

function FilterSelect({ label, rotate }) {
  return (
    <button type="button" className="flex h-8 items-center gap-2 rounded-[3px] bg-white px-2 text-xs leading-[18px] text-[#615d5d]">
      {label}
      <Icon name="chevron" size={12} rotate={rotate} />
    </button>
  )
}

function AdminUser() {
  return (
    <AdminLayout active="user">
      <AdminTopBar title="Dashboard" subtitle="Quickly Create and manage your existing bots" />

      <section className="flex flex-col gap-5 rounded-[10px] bg-white p-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-base leading-[25px] font-medium text-text">User</h2>
          <div className="flex items-center gap-4">
            <label className="flex h-10 w-[791px] items-center gap-[10px] rounded-md bg-page p-[10px]">
              <Icon name="search" />
              <input placeholder="Search by Session ID, User, or Date" className="flex-1 text-xs text-text outline-none placeholder:text-text/60" />
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
          <div className="grid grid-cols-[211px_189px_232px_233px_38px_1fr] items-center rounded-[5px] bg-table-head px-3 py-1 text-sm leading-[21px] text-text">
            <span>Bot Name</span>
            <span>Owner</span>
            <span>Conversation</span>
            <span>Created Date</span>
            <span>Plane</span>
            <span className="text-right">Status</span>
          </div>

          <div className="flex flex-col gap-2">
            {users.map((user, index) => (
              <div
                key={index}
                className={`grid h-12 grid-cols-[211px_189px_232px_233px_90px_1fr] items-center text-sm leading-[21px] text-muted ${
                  index < users.length - 1 ? 'border-b-[0.5px] border-line' : ''
                }`}
              >
                <span>{user.bot}</span>
                <span>{user.owner}</span>
                <span>{user.conversations}</span>
                <span>{user.created}</span>
                <span className={`inline-flex h-[25px] w-[70px] items-center justify-center rounded-full text-sm ${plans[user.plan]}`}>
                  {user.plan}
                </span>
                <span className="justify-self-end">
                  <StatusBadge status={user.status} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex h-11 w-[195px] items-center justify-between self-center rounded-[7px] bg-white p-[10px]">
        <Icon name="page-arrow" size={24} rotate={90} />
        <span className="text-xs leading-4 font-medium text-text">Page 2 Out 6</span>
        <Icon name="page-arrow" size={24} rotate={-90} />
      </div>
    </AdminLayout>
  )
}

export default AdminUser
