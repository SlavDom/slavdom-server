import {News} from "../types/News";

function newsComparator(n1: News, n2: News): number {
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
