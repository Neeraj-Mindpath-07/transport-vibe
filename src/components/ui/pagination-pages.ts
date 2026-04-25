/** Page indices or a gap marker for ellipsis controls. */
export type PaginationEntry = number | "ellipsis";

export function buildPaginationEntries(currentPage: number, totalPages: number): PaginationEntry[] {
  if (totalPages <= 1) {
    return [];
  }

  if (totalPages <= 9) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const boundary = new Set([1, 2, 3, totalPages, totalPages - 1, totalPages - 2, currentPage]);
  if (currentPage > 1) {
    boundary.add(currentPage - 1);
  }
  if (currentPage < totalPages) {
    boundary.add(currentPage + 1);
  }

  const sorted = [...boundary].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);

  const entries: PaginationEntry[] = [];
  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index];
    if (index > 0) {
      const previous = sorted[index - 1];
      if (page - previous > 1) {
        entries.push("ellipsis");
      }
    }
    entries.push(page);
  }

  return entries;
}
