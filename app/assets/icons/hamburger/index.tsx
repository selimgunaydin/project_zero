import * as React from "react";
import { SVGProps } from "react";

const HambuergerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 17h7M5 12h14M5 7h14"
    />
  </svg>
);
export default HambuergerIcon;
