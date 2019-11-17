export default function pctformat(value) {
  if (!value) return "";
  let r = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumSignificantDigits: 4,
    maximumSignificantDigits: 4
  }).format(value * 100);
  r = r + "%";
  return r;
}
