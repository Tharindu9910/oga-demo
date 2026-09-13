export default function ArrowRightIcon({
  className = 'size-3',
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 12 5"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 2.89H9.66C9.31 3.31 8.75 4.4 8.75 4.67C8.75 4.8 8.87 4.9 9.01 4.9C9.13 4.9 9.17 4.86 9.39 4.61C9.97 3.92 10.6 3.43 11.67 2.83C11.96 2.67 12.06 2.58 12.06 2.48C12.06 2.36 12 2.29 11.89 2.22C10.42 1.36 10.03 1.04 9.29 0.16C9.17 0.03 9.12 0 9.01 0C8.87 0 8.75 0.1 8.75 0.23C8.75 0.32 8.93 0.8 9.04 1.04C9.2 1.37 9.38 1.63 9.66 2.01H0V2.89V2.89Z" />
    </svg>
  )
}
