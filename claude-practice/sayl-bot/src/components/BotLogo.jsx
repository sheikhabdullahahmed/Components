import botIcon from '../assets/bot-icon.png'

// In Figma the bot image is used as a mask over a purple rectangle,
// so the icon always takes the brand color.
function BotLogo({ width, height }) {
  return (
    <div
      className="shrink-0 bg-primary"
      style={{
        width,
        height,
        maskImage: `url(${botIcon})`,
        maskSize: 'cover',
        maskPosition: 'center',
      }}
    />
  )
}

export default BotLogo
