import Icon from '../Icon'

function Breadcrumb({ parent, parentHref, current }) {
  return (
    <div className="flex items-center gap-2 pl-[15px] text-xs leading-[11px] text-text">
      <a href={parentHref}>{parent}</a>
      <Icon name="breadcrumb-arrow" size={14} rotate={180} />
      <span>{current}</span>
    </div>
  )
}

export default Breadcrumb
