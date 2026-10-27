import ChatWidget from '../components/ChatWidget'

function ChatFullscreen() {
  return (
    <main className="min-h-screen bg-page px-[30px] py-[31px]">
      <ChatWidget className="h-[821px] w-[1380px] rounded-[20px] bg-white" welcomeGap={237} inputWidth={1261} />
    </main>
  )
}

export default ChatFullscreen
