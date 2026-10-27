function SettingsField({ label, value, half = true }) {
  return (
    <label className={`flex flex-col gap-2 ${half ? 'flex-1' : 'w-full'}`}>
      <span className="text-xs leading-[11px] text-text">{label}</span>
      <input
        defaultValue={value}
        className="h-[39px] rounded-md bg-page px-[10px] text-xs leading-[11px] text-text/60 outline-none"
      />
    </label>
  )
}

export default SettingsField
