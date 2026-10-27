// All SVG icons exported from the Figma file live in assets/icons.
const icons = import.meta.glob('../assets/icons/*.svg', { eager: true, import: 'default' })

function Icon({ name, size = 20, rotate, className = '' }) {
  return (
    <img
      src={icons[`../assets/icons/${name}.svg`]}
      alt=""
      width={size}
      className={`shrink-0 ${className}`}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    />
  )
}

export default Icon
