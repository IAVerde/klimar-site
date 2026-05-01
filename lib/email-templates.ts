import { SITE } from "./site";

export function waitlistWelcomeHtml(): string {
  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;background:#0F172A;font-family:system-ui,sans-serif;color:#F1F5F9;">
    <div style="max-width:600px;margin:0 auto;padding:48px 24px;">
      <div style="font-family:'Space Grotesk',system-ui,sans-serif;font-weight:700;font-size:24px;letter-spacing:-0.04em;color:#00B8D4;margin-bottom:16px;">klimar™</div>
      <h1 style="font-family:'Space Grotesk',system-ui,sans-serif;font-weight:700;font-size:32px;letter-spacing:-0.04em;line-height:1.1;margin:0 0 16px;">Você está na lista.</h1>
      <p style="font-size:16px;line-height:1.6;color:#CBD5E1;margin:0 0 16px;">
        Obrigado por se inscrever. Em breve liberamos seu acesso ao painel — mandamos o link assim que sua vaga abrir.
      </p>
      <p style="font-size:16px;line-height:1.6;color:#CBD5E1;margin:0 0 24px;">
        Enquanto isso, dá uma olhada no roadmap público pra saber o que estamos construindo:
      </p>
      <a href="${SITE.url}/sobre#roadmap" style="display:inline-block;background:#00B8D4;color:#021018;font-weight:600;padding:14px 24px;border-radius:999px;text-decoration:none;">Ver roadmap</a>
      <hr style="margin:48px 0 24px;border:0;border-top:1px solid #334155;" />
      <p style="font-size:12px;color:#64748B;line-height:1.5;margin:0;">Klimar™ é uma marca da IAVerde — gestão para serviços técnicos.</p>
    </div>
  </body>
</html>`;
}

export function waitlistInternalHtml(payload: {
  email: string;
  audience?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  user_agent?: string;
  ip?: string;
}): string {
  const rows = Object.entries(payload)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#94A3B8;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;">${k}</td><td style="padding:6px 12px;color:#F1F5F9;font-size:13px;">${escape(String(v))}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="font-family:system-ui;background:#0F172A;color:#F1F5F9;padding:24px;">
    <h2 style="margin:0 0 16px;font-size:18px;">Novo lead waitlist</h2>
    <table style="border-collapse:collapse;background:#1E293B;border:1px solid #334155;border-radius:8px;overflow:hidden;">${rows}</table>
  </body></html>`;
}

export function businessLeadInternalHtml(payload: {
  name: string;
  email: string;
  phone?: string;
  company: string;
  num_technicians?: number;
  message?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  ip?: string;
}): string {
  const rows = Object.entries(payload)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#94A3B8;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;vertical-align:top;">${k}</td><td style="padding:8px 12px;color:#F1F5F9;font-size:13px;">${escape(String(v))}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="font-family:system-ui;background:#0F172A;color:#F1F5F9;padding:24px;">
    <h2 style="margin:0 0 8px;font-size:20px;">Novo Business Lead</h2>
    <p style="margin:0 0 16px;color:#94A3B8;font-size:13px;">Resposta direta: <a href="mailto:${escape(
      payload.email,
    )}" style="color:#00B8D4;">${escape(payload.email)}</a></p>
    <table style="border-collapse:collapse;background:#1E293B;border:1px solid #334155;border-radius:8px;overflow:hidden;width:100%;">${rows}</table>
  </body></html>`;
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
