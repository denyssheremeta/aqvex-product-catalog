export const paginate = <T>(items: T[], currentPage: number, perPage: number): T[] => {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return items.slice(start, end);
};
