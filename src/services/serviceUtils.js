export const handleError = (error, fallbackMessage) => {
  if (!error.response || error.response.status === 500) {
    return { error: 'Unable to connect to server.' }
  }
  return { error: fallbackMessage }
}
