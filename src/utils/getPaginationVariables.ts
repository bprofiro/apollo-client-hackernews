import { LINKS_PER_PAGE } from "../common/constants/pages";

export const getPaginationVariables = (page: number) => {
  const skip = (page - 1) * LINKS_PER_PAGE;
  const take = LINKS_PER_PAGE;
  const orderBy = { createdAt: 'desc' };

  return { take, skip, orderBy };
};