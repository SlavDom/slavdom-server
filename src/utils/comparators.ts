import {INews} from "../db/data/news";

function newsComparator(n1: INews, n2: INews): number {
  if (n1.createdAt > n2.createdAt) {
    return 1;
  }
  if (n1.createdAt < n2.createdAt) {
    return -1;
  }
  return 0;
}

export {
  newsComparator,
};
