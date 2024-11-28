import ContactFormEmail from "@/components/Email/Contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Parse the request body for dynamic data
    const body = await request.json();

    const { name, email, message } = body;

    //
    const data = await resend.emails.send({
      from: "TumainiFitnessCentre<no-reply@tumainifitness.co.ke>",
      to: ["mainavitalis65@gmail.com"],
      subject: "Inquiry",
      react: ContactFormEmail({
        name,
        email,
        message,
      }),
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
