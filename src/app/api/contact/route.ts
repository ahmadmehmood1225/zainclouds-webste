import { NextResponse } from "next/server";

type ContactRequest = {
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  country?: string;
  service?: string;
  projectDetails?: string;
};

const SERVICES = [
  "Ecommerce",
  "CRM",
  "ERP",
  "ERPNext",
  "POS",
  "Custom Software",
  "Other",
];

export async function POST(request: Request) {
  let body: ContactRequest;
  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors: string[] = [];

  if (!body.fullName || body.fullName.trim().length < 2) {
    errors.push("Please provide your full name.");
  }
  if (!body.email || !emailPattern.test(body.email)) {
    errors.push("Please provide a valid email address.");
  }
  if (body.phone && body.phone.replace(/\D/g, "").length < 6) {
    errors.push("Please provide a valid phone number.");
  }
  if (body.service && !SERVICES.includes(body.service)) {
    errors.push("Please select a valid service.");
  }
  if (!body.projectDetails || body.projectDetails.trim().length < 20) {
    errors.push("Please describe your project in at least a few sentences.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors[0] }, { status: 422 });
  }

  const submission = {
    ...body,
    receivedAt: new Date().toISOString(),
  };

  const activeEndpoint = process.env.CONTACT_WEBHOOK_URL;
  if (activeEndpoint) {
    try {
      await fetch(activeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
    } catch {
      return NextResponse.json({ ok: true });
    }
  }

  return NextResponse.json({ ok: true });
}