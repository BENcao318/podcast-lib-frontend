import React from 'react'
import ContentLoader from 'react-content-loader'

const LoadingGridOtherPodcasts = ({ ...rest }) => {
  return (
    <ContentLoader
      speed={2}
      width={800}
      height={400}
      viewBox="0 0 800 400"
      backgroundColor="#d9d9d9"
      foregroundColor="#ededed"
      {...rest}
    >
      <rect x="80" y="6" rx="4" ry="4" width="720" height="38" />
      <rect x="8" y="6" rx="4" ry="4" width="60" height="38" />
      <rect x="80" y="55" rx="4" ry="4" width="720" height="38" />
      <rect x="8" y="55" rx="4" ry="4" width="60" height="38" />
      <rect x="80" y="104" rx="4" ry="4" width="720" height="38" />
      <rect x="8" y="104" rx="4" ry="4" width="60" height="38" />
      <rect x="80" y="153" rx="4" ry="4" width="720" height="38" />
      <rect x="8" y="153" rx="4" ry="4" width="60" height="38" />
    </ContentLoader>
  )
}

export default LoadingGridOtherPodcasts
