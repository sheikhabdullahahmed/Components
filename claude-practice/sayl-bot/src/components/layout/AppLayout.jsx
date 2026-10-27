import Sidebar from './Sidebar'

// Shared shell for the logged-in screens: sidebar on the left, page on the right.
function AppLayout({ active, children }) {
  return (
    <div className="flex min-h-screen gap-5 bg-page px-[30px] py-[22px]">
      <Sidebar active={active} />
      <main className="flex w-[1147px] flex-col">{children}</main>
    </div>
  )
}

export default AppLayout
