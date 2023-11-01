function Close() {
  return (
    <main className="fixed top-0 right-0 m-6 cursor-pointer">
      <svg className="w-6 stroke-secondary hover:stroke-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_40_6)">
      <path d="M1 1L23 23" strokeWidth="2"/>
      <path d="M23 1L1 23" strokeWidth="2"/>
      </g>
      <defs>
      <clipPath id="clip0_40_6">
      <rect width="24" height="24" fill="white"/>
      </clipPath>
      </defs>
      </svg>
    </main>
  )
}

export default Close;