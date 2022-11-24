export const padNumber = (num = 0, len?: number) => {
  if (`${num}`.length >= len) return num.toString();
  return (new Array(len).fill("0").join("") + num).slice(-len);
};
