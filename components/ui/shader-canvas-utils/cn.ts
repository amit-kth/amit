type ClassValue = string | false | null | undefined;

/** Small class joiner for the component's fixed CSS classes and optional caller classes. */
export function cn(...values: ClassValue[]): string {
  return values.filter((value): value is string => typeof value === "string" && value.length > 0).join(" ");
}
