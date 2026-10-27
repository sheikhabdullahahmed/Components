import Icon from '../Icon'

function PlanCard({ name, price, features, subscribers }) {
  return (
    <div className="flex h-[389px] w-[358px] flex-col justify-evenly gap-5 rounded-xl bg-page p-4">
      <div className="flex flex-col gap-[27px]">
        <div className="flex items-center justify-between">
          <span className="text-base leading-[14px] text-text">{name}</span>
          <div className="flex flex-col">
            <span className="text-base leading-[14px] text-text">{price}</span>
            <span className="text-xs leading-[11px] text-text/60">Per user/ Month</span>
          </div>
        </div>
        <ul className="flex flex-col gap-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-[9px] text-xs leading-[11px] text-text">
              <span className="flex size-3 items-center justify-center rounded-full bg-primary/20">
                <span className="size-1 rounded-full bg-primary" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-white px-4 py-[10px]">
        <span className="text-xs leading-[11px] text-text/60">Active Subscription</span>
        <span className="text-base leading-[14px] text-text">{subscribers}</span>
      </div>

      <div className="flex items-center justify-between">
        <button type="button" className="h-[33px] w-[266px] rounded-md bg-white text-xs leading-[11px] text-black">
          Edit Plan
        </button>
        <button type="button" className="flex size-8 items-center justify-center rounded-md bg-[#cf0000]">
          <Icon name="trash" />
        </button>
      </div>
    </div>
  )
}

export default PlanCard
