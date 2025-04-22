// src/hooks/useGsapScrollAnimation.jsx

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Custom hook to apply GSAP ScrollTrigger animations.
 *
 * @param {Object} refs - Refs to the elements to animate.
 * @param {Function} animationCallback - Function defining the GSAP timeline.
 * @param {Object} scrollTriggerOptions - Additional ScrollTrigger options.
 */
const useGsapScrollAnimation = (refs, animationCallback, scrollTriggerOptions = {}) => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Ensure the trigger element exists
    if (!refs.trigger.current) return;

    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: refs.trigger.current,
        start: scrollTriggerOptions.start || 'top 100%',
        end: scrollTriggerOptions.end || 'bottom top',
        toggleActions: scrollTriggerOptions.toggleActions || 'play reverse play reverse',
        // You can pass additional ScrollTrigger options if needed
        ...scrollTriggerOptions.additionalOptions,
      },
    });

    // Execute the animation callback to define the timeline
    animationCallback(tl);

    // Cleanup function to kill the timeline and ScrollTrigger instance
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [refs, animationCallback, scrollTriggerOptions]);
};

export default useGsapScrollAnimation;
