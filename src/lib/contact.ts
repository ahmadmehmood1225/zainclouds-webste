export type ContactPayload = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  projectDetails: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { ok: false, error: body?.error ?? "Something went wrong. Please try again." };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "We could not send your message right now. Please try again shortly.",
    };
  }
}