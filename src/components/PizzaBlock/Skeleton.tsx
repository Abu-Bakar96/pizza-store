import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="532" y="233" rx="3" ry="3" width="178" height="6" />
    <circle cx="131" cy="131" r="131" />
    <rect x="0" y="269" rx="10" ry="10" width="280" height="44" />
    <rect x="0" y="325" rx="10" ry="10" width="280" height="66" />
    <rect x="137" y="295" rx="0" ry="0" width="0" height="16" />
    <rect x="4" y="405" rx="10" ry="10" width="95" height="30" />
    <rect x="123" y="398" rx="20" ry="20" width="152" height="45" />
    <rect x="215" y="443" rx="0" ry="0" width="5" height="1" />
    <rect x="210" y="420" rx="0" ry="0" width="5" height="23" />
  </ContentLoader>
)

export default Skeleton