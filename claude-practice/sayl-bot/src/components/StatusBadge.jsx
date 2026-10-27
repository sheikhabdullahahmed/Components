const styles = {
  Resolved: 'bg-[#28a745]/8 text-[#28a745]',
  Active: 'bg-[#28a745]/8 text-[#28a745]',
  Escalated: 'bg-[#ce1325]/9 text-[#ce1325]',
  Pending: 'bg-[#ff9400]/12 text-[#ff9400]',
  Open: 'bg-[#1348ce]/9 text-[#1348ce]',
  Paused: 'bg-page text-text/60',
  Disable: 'bg-page text-text/60',
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex h-7 w-[81px] items-center justify-center rounded-full text-xs leading-4 font-medium ${styles[status]}`}>
      {status}
    </span>
  )
}

export default StatusBadge
