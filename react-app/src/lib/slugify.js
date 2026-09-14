/**
 * "AI Agents & Chatbots" -> "ai-agents-chatbots"
 *
 * Used to derive a service's URL slug straight from its display title,
 * rather than hand-maintaining a second slug string next to every title
 * in navMenus.js / homeV2.jsx that could quietly drift out of sync with it.
 */
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
