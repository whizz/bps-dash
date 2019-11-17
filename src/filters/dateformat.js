export default function dateformat(value) {
  if (!value) return "";
  const r = new Intl.DateTimeFormat("default").format(new Date(value));
  return r;
}
