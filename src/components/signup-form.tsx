"use client"

import { useState } from "react"
import { buttonVariants } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"

function isInputNamedElement(
  e: Element
): e is HTMLInputElement & { name: string } {
  return "value" in e && "name" in e
}

const SignupForm = () => {
  const [state, setState] = useState<string>()

  async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData: Record<string, string> = {}

    Array.from(e.currentTarget.elements)
      .filter(isInputNamedElement)
      .forEach((field) => {
        if (!field.name) return
        formData[field.name] = field.value
      })

    setState("loading")

    await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        firstName: formData.firstName,
        email: formData.email,
      }),
    })

    setState("ready")
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
      <Label htmlFor="firstName">First Name</Label>
      <Input id="firstName" name="firstName" />
      <Label htmlFor="email">Second Name</Label>
      <Input id="email" name="email" />
      <button className={buttonVariants()} disabled={state === "loading"}>
        Click here to open
      </button>
    </form>
  )
}

export default SignupForm
