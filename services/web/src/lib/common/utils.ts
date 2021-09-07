export function generateOrderLink({ orderId, email }) {
  let emailPart = ''
  if (email) {
    emailPart = `&email=${encodeURIComponent(email)}`
  }

  return `/orders/${orderId}${emailPart}`
}
