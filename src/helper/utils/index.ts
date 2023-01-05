export const padNumber = (num = 0, len?: number) => {
  if (`${num}`.length >= len) return num.toString();
  return (new Array(len).fill("0").join("") + num).slice(-len);
};

export const getTimeString = (time: string) => {
  if (!time) return "";
  let [hour, min] = time.split(":");
  let h = Number(hour);
  return `${h > 12 ? h - 12 : h}:${min} ${h >= 12 ? "PM" : "AM"}`;
};

export const getMinutesFromTimeString = (time: string) => {
  if (!time) return 0;
  const [h, m] = time.split(":");
  return Number(h) * 60 + Number(m);
};
