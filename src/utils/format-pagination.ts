export const FormatPagination = (count: number, limit: number) => {
  const total = Math.ceil(count);
  const pages = Math.ceil(total / limit);

  return {
    total,
    pages,
  };
};
