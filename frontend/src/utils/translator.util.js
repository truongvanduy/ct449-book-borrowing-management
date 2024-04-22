export const translateBorrowingStatus = (status) => {
  const statusTranslations = {
    registered: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Đã từ chối',
    taken: 'Đã nhận sách',
    returned: 'Đã trả sách'
  }
  return statusTranslations[status] ?? status
}
