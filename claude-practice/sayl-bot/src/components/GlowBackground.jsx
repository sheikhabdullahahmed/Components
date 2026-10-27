// Blurred shapes that make the purple glow on the black panel.
// Sizes and positions are copied from the Figma frame.
const shapes = [
  { left: 190.4, top: 0, width: 729.3, height: 493.9, color: '#ffffff', blur: 61, radius: 0 },
  { left: 65.5, top: 19.4, width: 977.4, height: 776.1, color: '#4735fd', blur: 121 },
  { left: 159.8, top: 115.2, width: 788.2, height: 584.5, color: '#3927ef', blur: 121 },
  { left: 236.3, top: 212.2, width: 635.5, height: 390.5, color: '#1904e4', blur: 121 },
  { left: 0, top: 243.7, width: 1108.4, height: 720.3, color: '#000000', blur: 133 },
]

function GlowBackground() {
  return (
    <div className="absolute" style={{ left: -219, top: -113.9 }}>
      {shapes.map((shape) => (
        <div
          key={shape.color}
          className="absolute"
          style={{
            left: shape.left,
            top: shape.top,
            width: shape.width,
            height: shape.height,
            background: shape.color,
            borderRadius: shape.radius ?? '50%',
            filter: `blur(${shape.blur}px)`,
          }}
        />
      ))}
    </div>
  )
}

export default GlowBackground
