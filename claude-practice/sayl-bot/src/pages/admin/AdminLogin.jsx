import BotLogo from '../../components/BotLogo'
import { GoogleIcon, MicrosoftIcon } from '../../components/icons'

function SocialButton({ icon, children }) {
  return (
    <button type="button" className="flex h-14 w-full items-center justify-center gap-4 rounded-md bg-white px-[10px] text-base leading-6 text-black">
      {icon}
      {children}
    </button>
  )
}

// Admin login looks like the user login, but centered on a plain page (no chat preview panel).
function AdminLogin() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-page">
      <div className="flex w-[517px] flex-col items-center gap-[60px]">
        <div className="flex w-[351px] flex-col items-center gap-4">
          <BotLogo width={73.6} height={60} />
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-[32px] leading-[0.9] text-black">Welcome Back</h1>
            <p className="text-base leading-[0.9] whitespace-nowrap text-text/60">Log in to access your Chat bot Builder account</p>
          </div>
        </div>

        <form
          className="flex w-full flex-col items-center gap-6"
          onSubmit={(e) => {
            e.preventDefault()
            window.location.hash = '#/admin'
          }}
        >
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-4">
                  <SocialButton icon={<GoogleIcon />}>Sign up With Google</SocialButton>
                  <SocialButton icon={<MicrosoftIcon />}>Sign up With Microsoft</SocialButton>
                </div>
                <span className="text-center text-[10px] leading-[15px] text-black">or</span>
              </div>
              <input
                type="email"
                placeholder="Enter you Email"
                className="h-[53px] w-full rounded-md bg-white px-[10px] text-sm leading-[21px] text-black outline-none placeholder:text-black/60"
              />
            </div>
            <button
              type="submit"
              className="h-[63px] w-full rounded-lg border border-primary-border bg-primary text-xl leading-[31px] font-medium text-white shadow-[0_0_9.6px_rgba(71,53,253,0.25),0_0_5px_rgba(71,53,253,0.24)]"
            >
              Continue
            </button>
          </div>
          <p className="text-center text-sm leading-[21px] text-black">Already have Account ? Log in</p>
        </form>
      </div>
    </main>
  )
}

export default AdminLogin
