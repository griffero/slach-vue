const cleanAmount = (possibleAmount) => {
  if (!possibleAmount) {
    return '';
  }

  return possibleAmount.replace(/[^0-9]/g, '');
}

export { cleanAmount };
