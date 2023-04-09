export const formulaPaginationOffsetLimit = (page: any = 1, limit: any = 5) => {
  const limitData: number = limit as number,
    offset: number = (page - 1) * limitData;

  return { limitData, offset };
};
