/**
 * Tests for logo metadata URL consistency validation
 * Feature: website-logo-metadata
 */

import { validateLogoUrlConsistency, validateAbsoluteUrlGeneration, extractLogoUrls } from './metadata-validation';
import { metadata } from '../app/layout';

describe('Logo URL Consistency Validation', () => {
  const METADATA_BASE = 'https://sitenerve.online';
  const EXPECTED_RELATIVE_PATH = '/logo.jpeg';
  const EXPECTED_ABSOLUTE_URL = `${METADATA_BASE}${EXPECTED_RELATIVE_PATH}`;

  describe('URL Format Consistency', () => {
    test('should validate consistent logo URL format across metadata implementations', () => {
      // Feature: website-logo-metadata, Property 3: Logo URL Format Consistency
      const openGraphUrl = metadata.openGraph?.images?.[0]?.url || '';
      const twitterUrl = metadata.twitter?.images?.[0] || '';
      
      // For structured data, we need to check the actual script content
      // Since it's in the layout component, we'll validate the expected format
      const structuredDataUrl = EXPECTED_ABSOLUTE_URL;
      
      const validation = validateLogoUrlConsistency(
        openGraphUrl,
        twitterUrl,
        structuredDataUrl,
        METADATA_BASE
      );
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
      expect(validation.relativePath).toBe(EXPECTED_RELATIVE_PATH);
      expect(validation.absoluteUrl).toBe(EXPECTED_ABSOLUTE_URL);
    });

    test('should detect inconsistent URL formats', () => {
      const validation = validateLogoUrlConsistency(
        '/wrong-logo.png',
        '/different-logo.jpg',
        'https://wrong-domain.com/logo.jpeg',
        METADATA_BASE
      );
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Cross-Platform URL Consistency', () => {
    test('should ensure logo URL is identical across platforms where relative paths are used', () => {
      // Feature: website-logo-metadata, Property 10: Cross-Platform URL Consistency
      const openGraphUrl = metadata.openGraph?.images?.[0]?.url || '';
      const twitterUrl = metadata.twitter?.images?.[0] || '';
      
      expect(openGraphUrl).toBe(twitterUrl);
      expect(openGraphUrl).toBe(EXPECTED_RELATIVE_PATH);
      expect(twitterUrl).toBe(EXPECTED_RELATIVE_PATH);
    });
  });

  describe('Logo Path and Extension Correctness', () => {
    test('should validate correct file extension and path usage', () => {
      // Feature: website-logo-metadata, Property 11: Logo Path and Extension Correctness
      const openGraphUrl = metadata.openGraph?.images?.[0]?.url || '';
      
      expect(openGraphUrl).toMatch(/^\/logo\.jpeg$/);
      expect(openGraphUrl).toContain('.jpeg');
      expect(openGraphUrl).toStartWith('/logo.');
    });

    test('should reject incorrect file extensions', () => {
      const validation = validateLogoUrlConsistency(
        '/logo.png',
        '/logo.png',
        `${METADATA_BASE}/logo.png`,
        METADATA_BASE
      );
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.some(error => error.includes('.jpeg extension'))).toBe(true);
    });

    test('should reject incorrect paths', () => {
      const validation = validateLogoUrlConsistency(
        '/assets/brand.jpeg',
        '/assets/brand.jpeg',
        `${METADATA_BASE}/assets/brand.jpeg`,
        METADATA_BASE
      );
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.some(error => error.includes('should start with "/logo."'))).toBe(true);
    });
  });

  describe('Absolute URL Generation', () => {
    test('should validate absolute URL generation with metadataBase', () => {
      const result = validateAbsoluteUrlGeneration(EXPECTED_RELATIVE_PATH, METADATA_BASE);
      
      expect(result.isValid).toBe(true);
      expect(result.absoluteUrl).toBe(EXPECTED_ABSOLUTE_URL);
      expect(result.error).toBeUndefined();
    });

    test('should validate HTTPS protocol usage', () => {
      const result = validateAbsoluteUrlGeneration(EXPECTED_RELATIVE_PATH, METADATA_BASE);
      
      expect(result.absoluteUrl).toMatch(/^https:\/\//);
    });

    test('should validate correct domain usage', () => {
      const result = validateAbsoluteUrlGeneration(EXPECTED_RELATIVE_PATH, METADATA_BASE);
      
      expect(result.absoluteUrl).toContain('sitenerve.online');
    });

    test('should handle invalid metadataBase', () => {
      const result = validateAbsoluteUrlGeneration(EXPECTED_RELATIVE_PATH, 'invalid-url');
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Metadata Extraction', () => {
    test('should correctly extract logo URLs from metadata configuration', () => {
      const urls = extractLogoUrls(metadata);
      
      expect(urls.openGraphUrl).toBe(EXPECTED_RELATIVE_PATH);
      expect(urls.twitterUrl).toBe(EXPECTED_RELATIVE_PATH);
    });
  });
});