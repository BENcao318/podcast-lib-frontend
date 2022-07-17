import React from 'react'
import ContentLoader from 'react-content-loader'

const LoadingGridTopPodcast: React.FC = ({ ...rest }) => (
  <ContentLoader height="615" width="320" viewBox="0 0 320 615" {...rest}>
    <rect x="0" y="0" rx="4" ry="4" width="320" height="320" />
    <rect x="0" y="330" rx="2" ry="2" width="320" height="20" />
    <rect x="0" y="360" rx="2" ry="2" width="320" height="30" />
    <rect x="0" y="390" rx="2" ry="2" width="320" height="200" />
  </ContentLoader>
)

export default LoadingGridTopPodcast
