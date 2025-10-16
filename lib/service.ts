export function cn(
  ...classes: Array<string | null | undefined | false | Record<string, any>>
) {
  const out: string[] = []
  for (const item of classes) {
    if (!item) continue
    if (typeof item === "string") {
      if (item.trim()) out.push(item)
    } else if (typeof item === "object") {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key) && item[key]) {
          out.push(key)
        }
      }
    }
  }
  return out.join(" ")
}
