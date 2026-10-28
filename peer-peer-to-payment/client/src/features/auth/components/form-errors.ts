import { ApiError } from "@/lib/api";

// Nest validation messages start with the field name ("email must be an email"),
// so they can be shown under the matching input.
export function fieldErrors(error: unknown, field: string) {
  if (!(error instanceof ApiError)) return [];
  return error.messages
    .filter((message) => message.startsWith(`${field} `))
    .map((message) => ({ message: capitalize(message) }));
}

// Anything that isn't tied to one of the form's fields (wrong password, network down...).
export function formError(error: unknown, fields: string[]) {
  if (!error) return null;
  if (!(error instanceof ApiError)) return "Could not reach the server. Is the API running?";
  const rest = error.messages.filter((m) => !fields.some((f) => m.startsWith(`${f} `)));
  return rest.length ? rest.join(". ") : null;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
