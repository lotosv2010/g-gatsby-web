import { useState } from "react"

function useInput(initalValue: string) {
  const [value, setValue] = useState(initalValue)
  return {
    input: {
      value,
      onChange(e: any) {
        setValue(e.target.value)
      }
    },
    setValue
  }
}

export default useInput;