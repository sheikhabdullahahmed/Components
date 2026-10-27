import Icon from './Icon'

// Small purple button with an optional icon, used in page headers and forms.
function PrimaryButton({ icon, children, href, className = '' }) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      type={href ? undefined : 'button'}
      className={`flex items-center justify-center gap-[10px] rounded-md bg-primary p-[10px] text-sm leading-[13px] whitespace-nowrap text-white ${className}`}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
    </Tag>
  )
}

export default PrimaryButton
