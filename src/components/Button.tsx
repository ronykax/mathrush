function Button({ text }: { text: string }) {
  return (
    <button className="px-4 py-2 w-fit rounded bg-default hover:bg-hover shadow-black hover:shadow-2xl">{text}</button>
  )
}

export default Button;