import { FeaturesSectionDemo } from '@/components/featured/why-varnion/components/feature-section'
import ProfileVideoPlayer from '@/components/featured/why-varnion/components/profile-video-player'
import React from 'react'

const page = () => {
  return (
    <main>
        <ProfileVideoPlayer/>
        <FeaturesSectionDemo/>
    </main>
  )
}

export default page