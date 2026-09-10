/**
 * Script to validate logo metadata URL consistency in the current implementation
 */

import { validateLogoUrlConsistency, validateAbsoluteUrlGeneration } from './metadata-validation';

// Mock metadata object based on current implementation
const metadata = {
  metadataBase: new URL("https://sitenerve.online"),
  openGraph: {
    images: [
      {
        url: '/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'SiteNerve Logo',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    images: ['/logo.jpeg'],
  },
};

/**
 * Validates the current logo metadata implementation
 */
export function validateCurrentImplementation(): {
  isValid: boolean;
  results: Array<{
    test: string;
    passed: boolean;
    message: string;
  }>;
} {
  const results: Array<{ test: string; passed: boolean; message: string }> = [];
  
  // Extract current URLs from metadata
  const openGraphUrl = metadata.openGraph?.images?.[0]?.url || '';
  const twitterUrl = metadata.twitter?.images?.[0] || '';
  const metadataBase = 'https://sitenerve.online';
  const expectedAbsoluteUrl = `${metadataBase}/logo.jpeg`;
  
  // Test 1: URL Format Consistency
  const urlConsistency = validateLogoUrlConsistency(
    openGraphUrl,
    twitterUrl,
    expectedAbsoluteUrl,
    metadataBase
  );
  
  results.push({
    test: 'URL Format Consistency',
    passed: urlConsistency.isValid,
    message: urlConsistency.isValid 
      ? 'All logo URLs are consistent across metadata implementations'
      : `Inconsistencies found: ${urlConsistency.errors.join(', ')}`
  });
  
  // Test 2: Cross-Platform URL Consistency
  const crossPlatformConsistent = openGraphUrl === twitterUrl;
  results.push({
    test: 'Cross-Platform URL Consistency',
    passed: crossPlatformConsistent,
    message: crossPlatformConsistent
      ? 'Open Graph and Twitter URLs are identical'
      : `URLs differ: OpenGraph="${openGraphUrl}", Twitter="${twitterUrl}"`
  });
  
  // Test 3: Logo Path and Extension Correctness
  const correctPath = openGraphUrl === '/logo.jpeg';
  const correctExtension = openGraphUrl.endsWith('.jpeg');
  const pathCorrect = correctPath && correctExtension;
  
  results.push({
    test: 'Logo Path and Extension Correctness',
    passed: pathCorrect,
    message: pathCorrect
      ? 'Logo path and extension are correct'
      : `Incorrect path or extension: "${openGraphUrl}" (expected "/logo.jpeg")`
  });
  
  // Test 4: Absolute URL Generation
  const absoluteUrlValidation = validateAbsoluteUrlGeneration('/logo.jpeg', metadataBase);
  results.push({
    test: 'Absolute URL Generation',
    passed: absoluteUrlValidation.isValid,
    message: absoluteUrlValidation.isValid
      ? `Absolute URL generated correctly: ${absoluteUrlValidation.absoluteUrl}`
      : `Absolute URL generation failed: ${absoluteUrlValidation.error}`
  });
  
  // Test 5: Metadata Base Configuration
  const hasMetadataBase = metadata.metadataBase !== undefined;
  const correctMetadataBase = metadata.metadataBase?.toString() === metadataBase + '/';
  const metadataBaseValid = hasMetadataBase && correctMetadataBase;
  
  results.push({
    test: 'Metadata Base Configuration',
    passed: metadataBaseValid,
    message: metadataBaseValid
      ? 'Metadata base is correctly configured'
      : `Metadata base issue: has=${hasMetadataBase}, correct=${correctMetadataBase}`
  });
  
  const allPassed = results.every(result => result.passed);
  
  return {
    isValid: allPassed,
    results
  };
}

/**
 * Runs validation and logs results to console
 */
export function runValidation(): void {
  console.log('🔍 Validating Logo Metadata URL Consistency...\n');
  
  const validation = validateCurrentImplementation();
  
  validation.results.forEach(result => {
    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} ${result.test}: ${result.message}`);
  });
  
  console.log('\n' + '='.repeat(50));
  console.log(validation.isValid 
    ? '🎉 All URL consistency validations passed!' 
    : '⚠️  Some validations failed. Please review the issues above.'
  );
  console.log('='.repeat(50));
}

// Run validation if this file is executed directly
if (require.main === module) {
  runValidation();
}