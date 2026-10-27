import Icon from './Icon'

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs leading-[11px] text-text">{label}</span>
      {children}
    </div>
  )
}

function SelectBox({ value }) {
  return (
    <button type="button" className="flex h-9 w-full items-center justify-between rounded-[4px] bg-page p-[10px] text-xs text-text/60">
      {value}
      <Icon name="chevron-light" size={16} rotate={-90} />
    </button>
  )
}

function NewRequestModal() {
  return (
    <div className="fixed inset-0 bg-text/50">
      <div className="absolute top-[166px] left-[634px] flex w-[407px] flex-col gap-6 rounded-[15px] bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl leading-[18px] text-text">New Request</h2>
          <a href="#/support" aria-label="Close">
            <Icon name="close-circle" size={24} />
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <Field label="Select Bot">
            <SelectBox value="Saylani Tec" />
          </Field>
          <Field label="Selected Severity">
            <SelectBox value="Low" />
          </Field>
          <Field label="Subject">
            <input
              placeholder="Bug Issue"
              className="h-9 rounded-[4px] bg-page p-[10px] text-xs text-text outline-none placeholder:text-text/60"
            />
          </Field>
          <Field label="Request For">
            <SelectBox value="Bug Issue" />
          </Field>
          <Field label="Discription">
            <div className="relative">
              <textarea
                placeholder="Please Include All Information Relevant to your Issue."
                className="h-[119px] w-full resize-none rounded-[10px] bg-page p-[10px] text-xs text-text outline-none placeholder:text-text/60"
              />
              <Icon name="resize-handle" size={10.5} className="absolute right-3 bottom-3" />
            </div>
          </Field>
          <div className="flex justify-between">
            <button type="button" className="h-[33px] w-[91px] rounded-md bg-page text-sm text-text">
              Attach File
            </button>
            <button type="button" className="h-[33px] w-[111px] rounded-md bg-primary text-sm text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRequestModal
