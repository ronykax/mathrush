import { useAppearance } from "@/hooks/useAppearance";

function Close() {
  const { mode } = useAppearance();

  return (
    <div className="fixed top-0 right-0 m-6 outline-2" onClick={() => window.location.reload()}>
      <svg className={`w-6 cursor-pointer stroke-${mode}-secondary hover:stroke-${mode}-primary`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_40_6)">
        <path d="M1 1L23 23" strokeWidth="2"/>
        <path d="M23 1L1 23" strokeWidth="2"/>
        </g>
        <defs>
        <clipPath id="clip0_40_6">
        <rect width="24" height="24"/>
        </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default Close;