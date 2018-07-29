


export const times = () => {
  const result = []
  for (let i = 0; i < 24; i++) {
    result.push(i);
  }
  return result;
}

export const hours = () => {
  const result = []
  for (let i = 2; i <= 24; i++) {
    result.push(i);
  }
  return result;
}