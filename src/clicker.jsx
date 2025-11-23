import { useState, useEffect } from "react"

const Clicker = () => {
  const [click, setClick] = useState(0)

  useEffect(() => {
    document.title = `Hiciste ${click} click`
  }, [click])

  return (
    <button onClick={() => setClick(click + 1)}>
      Contador ({click})
    </button>
  )
}

export default Clicker