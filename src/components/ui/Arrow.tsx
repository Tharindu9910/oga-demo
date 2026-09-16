// The → after a call-to-action label. Nudges right while the nearest `group`
// ancestor (Button already is one) is hovered.
export default function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
    >
      →
    </span>
  )
}
