// @typescript-eslint/no-explicit-any
export const formatFullDate = (date: any) => {
  let dateObj: Date;

  if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date.toDate();
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
};

// @typescript-eslint/no-explicit-any
export const formatDate = (date: any) => {
  const dateObj = date.toDate ? date.toDate() : new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(dateObj);
};
