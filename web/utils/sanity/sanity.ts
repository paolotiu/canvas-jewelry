import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import {
  createCurrentUserHook,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from 'next-sanity';
import { config } from './config';

export const urlFor = (source: SanityImageSource) => createImageUrlBuilder(config).image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);
