"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newsComparator(n1, n2) {
    if (n1.createdAt > n2.createdAt) {
        return 1;
    }
    if (n1.createdAt < n2.createdAt) {
        return -1;
    }
    return 0;
}
exports.newsComparator = newsComparator;
