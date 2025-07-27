import type { SVGProps } from 'react'

export function Pentagon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2L22 8.5L18.5 20H5.5L2 8.5L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill={props.fill || 'none'}
      />
    </svg>
  )
}