import Icon from '../Icon'

function AdminBreadcrumb({ parent, parentHref, current }) {
  return (
    <div className="flex h-[14px] items-center justify-center gap-2 text-xs leading-[11px] text-text">
      <a href={parentHref}>{parent}</a>
      <Icon name="breadcrumb-arrow" size={14} rotate={180} />
      <span>{current}</span>
    </div>
  )
}

export default AdminBreadcrumb
