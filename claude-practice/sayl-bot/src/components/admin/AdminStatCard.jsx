import Icon from '../Icon'

function AdminStatCard({ icon, label, value, width = 270 }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white p-4" style={{ width }}>
      <span className="flex size-[30px] items-center justify-center rounded-[5px] bg-white">
        <Icon name={icon} />
      </span>
      <div className="flex flex-col">
        <span className="text-sm leading-[21px] text-text/60">{label}</span>
        <span className="text-lg leading-7 text-text">{value}</span>
      </div>
    </div>
  )
}

export default AdminStatCard
