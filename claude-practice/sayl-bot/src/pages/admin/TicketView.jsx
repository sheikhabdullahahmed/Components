import Icon from '../../components/Icon'
import AdminLayout from '../../components/admin/AdminLayout'
import AdminBreadcrumb from '../../components/admin/AdminBreadcrumb'
import AdminTopBar from '../../components/admin/AdminTopBar'

function TicketView() {
  return (
    <AdminLayout active="dashboard">
      <AdminTopBar title="Dashboard" subtitle="Quickly Create and manage your existing bots" />
      <AdminBreadcrumb parent="Support Tickets" parentHref="#/admin/tickets" current="View" />

      <section className="relative flex flex-col gap-12 rounded-xl bg-white p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl leading-[18px] text-text">SMIT Bot</h2>
            <button type="button" className="flex h-7 items-center justify-center rounded-full bg-primary/10 px-3 text-xs font-medium text-primary">
              Mark As Resoled
            </button>
          </div>

          <div className="flex w-[468px] flex-col gap-[194px]">
            <div className="flex flex-col gap-[10px]">
              <p className="w-[404px] rounded-md bg-page p-[10px] font-poppins text-sm leading-4 text-text">
                Hi, I'm having trouble with my chatbot not responding to customer queries. It was working fine yesterday but suddenly stopped
                responding this morning.
              </p>
              <div className="flex flex-col gap-3 rounded-lg bg-page p-[10px]">
                <p className="text-sm leading-[13px] text-[#374151]">I've attached a screenshot showing the error message that appears.</p>
                <div className="flex items-center justify-between rounded-[4px] bg-white p-[10px]">
                  <div className="flex items-center gap-2">
                    <Icon name="file-icon" size={16} />
                    <div className="flex flex-col">
                      <span className="text-xs leading-[13px] font-medium text-[#111827]">error-screenshot.png</span>
                      <span className="text-xs leading-[11px] text-[#6b7280]">245 KB</span>
                    </div>
                  </div>
                  <Icon name="download-small" size={16} />
                </div>
              </div>
            </div>

            <p className="w-[404px] rounded-md bg-page p-[10px] font-poppins text-sm leading-4 text-text">
              Thank you! It's working now. Really appreciate the quick response.
            </p>
          </div>
        </div>

        {/* admin reply, positioned on the right like in the Figma frame */}
        <div className="absolute top-[240px] right-4 flex w-[489px] flex-col gap-5">
          <p className="ml-[52px] rounded-md bg-page p-[10px] font-poppins text-sm leading-4 text-text">
            Hello John, thank you for reaching out. I can see the issue. It appears there was a brief service disruption. Let me check your bot
            configuration.
          </p>
          <p className="rounded-md bg-page p-[10px] font-poppins text-sm leading-4 text-text">
            I've reviewed your bot settings and reset the webhook connection. Can you please test it again and let me know if it's working now?
          </p>
        </div>

        <div className="flex flex-col gap-5 border-t border-black pt-4">
          <span className="text-sm leading-[13px] text-text">Reply</span>
          <textarea
            placeholder="Write a reply..."
            className="h-[120px] resize-none rounded-xl bg-page p-4 text-sm leading-[21px] text-[#111827]/50 outline-none"
          />
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-[7px] text-sm leading-[13px] text-text/60">
              <Icon name="attach" size={16} />
              Attach file
            </span>
            <button type="button" className="flex h-[37px] w-[128px] items-center justify-center gap-2 rounded-md bg-primary text-sm leading-[21px] text-white">
              <Icon name="send-small" size={16} />
              Send Reply
            </button>
          </div>
        </div>
      </section>
    </AdminLayout>
  )
}

export default TicketView
