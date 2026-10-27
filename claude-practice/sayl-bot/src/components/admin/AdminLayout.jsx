import AdminSidebar from './AdminSidebar'

// Shared shell for the admin screens: sidebar on the left, page on the right.
function AdminLayout({ active, children }) {
  return (
    <div className="flex min-h-screen gap-5 bg-page px-[30px] py-5">
      <AdminSidebar active={active} />
      <main className="flex w-[1147px] flex-col gap-5">{children}</main>
    </div>
  )
}

export default AdminLayout
