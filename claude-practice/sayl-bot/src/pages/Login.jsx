import ChatWidget from '../components/ChatWidget'
import GlowBackground from '../components/GlowBackground'
import LoginForm from '../components/LoginForm'

function Login() {
  return (
    <main className="flex min-h-screen bg-page px-[30px] py-[25px]">
      <section className="relative h-[850px] w-[670px] shrink-0 overflow-hidden rounded-[27px] bg-black">
        <GlowBackground />
        <div className="absolute top-[122px] left-[97px]">
          <ChatWidget tone="login" className="h-[576px] w-[438px] rounded-2xl bg-white" />
        </div>
      </section>

      <section className="flex flex-1 items-center pl-[127px]">
        <LoginForm />
      </section>
    </main>
  )
}

export default Login
