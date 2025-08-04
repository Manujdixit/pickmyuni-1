/**
 * Checks if the given HTML content needs a 'Read More' button by measuring its height.
 * Returns true if content exceeds 3 lines (approx. 72px at 24px line height).
 */
export function needsReadMore(content?: string): boolean {
  if (!content) return false;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content;
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.height = "auto";
  tempDiv.style.width = "100%";
  tempDiv.className = "prose max-w-none leading-relaxed text-gray-700";

  document.body.appendChild(tempDiv);
  const fullHeight = tempDiv.offsetHeight;
  document.body.removeChild(tempDiv);

  return fullHeight > 72;
}
