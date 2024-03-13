import { NextResponse } from "next/server"
import WelcomeEmail from "@/src/emails/welcome"
import { Resend } from "resend"

const resend = new Resend("re_HSFxNvYS_4oAFrLdGL3S56aq6ZAKRZX38")

export async function POST(request: Request) {
  const { firstName, email } = await request.json()

  try {
    await resend.sendEmail({
      from: "email@peter.mail.com",
      to: email,
      subject: "hello world",
      react: WelcomeEmail({
        firstName,
      }),
    })
    return NextResponse.json(
      {
        status: "Ok",
      },
      {
        status: 200,
      }
    )
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`Failed to send email: ${e.message}`)
    }
    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    )
  }
}
