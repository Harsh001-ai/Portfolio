import React from 'react';
import HeroStory from './src/HeroStory';

/**
 * ScrollSequence Component
 * Re-exports the updated HeroStory component for backwards compatibility.
 */
export default function ScrollSequence(props) {
  return <HeroStory {...props} />;
}
