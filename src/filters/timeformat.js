export default function timeformat(value) {
  if (!value) return "";
  let r = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }).format(new Date(value));
  return r;
}