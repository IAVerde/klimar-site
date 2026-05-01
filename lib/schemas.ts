import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().email("Informe um email válido"),
  audience: z.enum(["solo", "company"]).optional(),
  source: z.string().max(50).optional(),
  utm_source: z.string().max(80).optional(),
  utm_medium: z.string().max(80).optional(),
  utm_campaign: z.string().max(80).optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const businessLeadSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Informe um email válido"),
  phone: z.string().min(8, "Telefone inválido").max(30).optional().or(z.literal("")),
  company: z.string().min(2, "Nome da empresa obrigatório"),
  num_technicians: z.coerce.number().int().min(1).max(2000).optional(),
  message: z.string().max(2000).optional(),
  source: z.string().max(50).optional(),
  utm_source: z.string().max(80).optional(),
  utm_medium: z.string().max(80).optional(),
  utm_campaign: z.string().max(80).optional(),
});

export type BusinessLeadInput = z.infer<typeof businessLeadSchema>;

export const signupSchema = z.object({
  email: z.string().email("Informe um email válido"),
  password: z.string().min(8, "Senha precisa ter pelo menos 8 caracteres"),
  audience: z.enum(["solo", "company"]).optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
