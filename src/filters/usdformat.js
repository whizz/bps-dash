export default function usdformat(value) {
  if (!value) return "";
  let r = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
  return r;
}
