/**
 * Utility functions for validating logo metadata URL consistency
 */

export interface LogoUrlValidation {
  isValid: boolean;
  errors: string[];
  absoluteUrl: string;
  relativePath: string;
}

/**
 * Validates logo URL consistency across metadata implementations
 */
export function validateLogoUrlConsistency(
  openGraphUrl: string,
  twitterUrl: string,
  structuredDataUrl: string,
  metadataBase: string
): LogoUrlValidation {
  const errors: string[] = [];
  
  // Expected values
  const expectedRelativePath = '/logo.jpeg';
  const expectedAbsoluteUrl = `${metadataBase}${expectedRelativePath}`;
  
  // Validate Open Graph URL format
  if (openGraphUrl !== expectedRelativePath) {
    errors.push(`Open Graph URL should be "${expectedRelativePath}", got "${openGraphUrl}"`);
  }
  
  // Validate Twitter URL format
  if (twitterUrl !== expectedRelativePath) {
    errors.push(`Twitter URL should be "${expectedRelativePath}", got "${twitterUrl}"`);
  }
  
  // Validate structured data URL format
  if (structuredDataUrl !== expectedAbsoluteUrl) {
    errors.push(`Structured data URL should be "${expectedAbsoluteUrl}", got "${structuredDataUrl}"`);
  }
  
  // Validate file extension
  if (!openGraphUrl.endsWith('.jpeg')) {
    errors.push(`Logo URL should have .jpeg extension, got "${openGraphUrl}"`);
  }
  
  // Validate path format
  if (!openGraphUrl.startsWith('/logo.')) {
    errors.push(`Logo URL should start with "/logo.", got "${openGraphUrl}"`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    absoluteUrl: expectedAbsoluteUrl,
    relativePath: expectedRelativePath
  };
}

/**
 * Extracts logo URLs from metadata configuration
 */
export function extractLogoUrls(metadata: Record<string, unknown>): {
  openGraphUrl: string | null;
  twitterUrl: string | null;
  structuredDataUrl: string | null;
} {
  const openGraphUrl = (metadata as { openGraph?: { images?: Array<{ url?: string }> } }).openGraph?.images?.[0]?.url || null;
  const twitterUrl = (metadata as { twitter?: { images?: string[] } }).twitter?.images?.[0] || null;
  
  // For structured data, we need to parse it from the script content
  // This would typically be done by examining the actual rendered script
  const structuredDataUrl = null; // Will be set by tests that have access to the script
  
  return {
    openGraphUrl,
    twitterUrl,
    structuredDataUrl
  };
}

/**
 * Validates absolute URL generation with metadataBase
 */
export function validateAbsoluteUrlGeneration(
  relativePath: string,
  metadataBase: string
): { isValid: boolean; absoluteUrl: string; error?: string } {
  try {
    const baseUrl = new URL(metadataBase);
    const absoluteUrl = new URL(relativePath, baseUrl).toString();
    
    // Validate the generated URL format
    if (!absoluteUrl.startsWith('https://')) {
      return {
        isValid: false,
        absoluteUrl,
        error: 'Absolute URL should use HTTPS protocol'
      };
    }
    
    if (!absoluteUrl.includes('sitenerve.online')) {
      return {
        isValid: false,
        absoluteUrl,
        error: 'Absolute URL should contain the correct domain'
      };
    }
    
    if (!absoluteUrl.endsWith('.jpeg')) {
      return {
        isValid: false,
        absoluteUrl,
        error: 'Absolute URL should end with .jpeg extension'
      };
    }
    
    return {
      isValid: true,
      absoluteUrl
    };
  } catch (error) {
    return {
      isValid: false,
      absoluteUrl: '',
      error: `Invalid URL construction: ${error}`
    };
  }
}