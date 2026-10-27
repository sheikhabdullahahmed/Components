import BotCard from '../components/BotCard'
import AppLayout from '../components/layout/AppLayout'
import TopBar from '../components/layout/TopBar'
import PrimaryButton from '../components/PrimaryButton'

const sampleBots = [
  { name: 'Kita', lastInteraction: '2 hours Ago', status: 'Active', interactions: 18, responseTime: '5 Sec' },
  { name: 'Snapfreez', lastInteraction: '2 Minutes Ago', status: 'Active', interactions: 23, responseTime: '5 Sec' },
  { name: 'Saylani Tech', lastInteraction: '5 hours Ago', status: 'Disable', interactions: 200, responseTime: '10 Sec' },
]
const bots = [...sampleBots, ...sampleBots]

function Home() {
  return (
    <AppLayout active="home">
      <div className="flex flex-col gap-5">
        <TopBar title="Home" subtitle="Quickly Create and manage your existing bots" />

        <section className="flex flex-col gap-4 rounded-lg bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl leading-[31px] text-text">Agents</h2>
            <PrimaryButton icon="add-bot" href="#/create-bot" className="w-[118px]">
              Create Bot
            </PrimaryButton>
          </div>
          <div className="flex flex-wrap justify-between gap-y-4">
            {bots.map((bot, index) => (
              <BotCard key={index} bot={bot} />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  )
}

export default Home
