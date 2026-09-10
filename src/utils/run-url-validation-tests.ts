/**
 * Test runner for URL consistency validation
 * Feature: website-logo-metadata
 */

import { validateLogoUrlConsistency, validateAbsoluteUrlGeneration } from './metadata-validation';
import * as fs from 'fs';
import * as path from 'path';

// Mock metadata based on current implementation
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

interface TestResult {
  name: string;
  property: string;
  requirements: string;
  passed: boolean;
  message: string;
}

/**
 * Test suite for URL consistency validation
 */
class URLConsistencyTestSuite {
  private results: TestResult[] = [];
  private readonly METADATA_BASE = 'https://sitenerve.online';
  private readonly EXPECTED_RELATIVE_PATH = '/logo.jpeg';
  private readonly EXPECTED_ABSOLUTE_URL = `${this.METADATA_BASE}${this.EXPECTED_RELATIVE_PATH}`;

  /**
   * Property 3: Logo URL Format Consistency
   * Validates: Requirements 1.3, 3.2
   */
  testUrlFormatConsistency(): void {
    const openGraphUrl = metadata.openGraph?.images?.[0]?.url || '';
    const twitterUrl = metadata.twitter?.images?.[0] || '';
    
    const validation = validateLogoUrlConsistency(
      openGraphUrl,
      twitterUrl,
      this.EXPECTED_ABSOLUTE_URL,
      this.METADATA_BASE
    );
    
    this.results.push({
      name: 'URL Format Consistency',
      property: 'Property 3: Logo URL Format Consistency',
      requirements: 'Requirements 1.3, 3.2',
      passed: validation.isValid,
      message: validation.isValid 
        ? 'All logo URLs are consistent across metadata implementations'
        : `Inconsistencies found: ${validation.errors.join(', ')}`
    });
  }

  /**
   * Property 10: Cross-Platform URL Consistency
   * Validates: Requirements 4.3
   */
  testCrossPlatformUrlConsistency(): void {
    const openGraphUrl = metadata.openGraph?.images?.[0]?.url || '';
    const twitterUrl = metadata.twitter?.images?.[0] || '';
    
    const consistent = openGraphUrl === twitterUrl && openGraphUrl === this.EXPECTED_RELATIVE_PATH;
    
    this.results.push({
      name: 'Cross-Platform URL Consistency',
      property: 'Property 10: Cross-Platform URL Consistency',
      requirements: 'Requirements 4.3',
      passed: consistent,
      message: consistent
        ? 'Logo URLs are identical across Open Graph and Twitter metadata'
        : `URLs differ: OpenGraph="${openGraphUrl}", Twitter="${twitterUrl}"`
    });
  }

  /**
   * Property 11: Logo Path and Extension Correctness
   * Validates: Requirements 4.4
   */
  testLogoPathCorrectness(): void {
    const openGraphUrl = metadata.openGraph?.images?.[0]?.url || '';
    
    const correctPath = openGraphUrl === this.EXPECTED_RELATIVE_PATH;
    const correctExtension = openGraphUrl.endsWith('.jpeg');
    const startsCorrectly = openGraphUrl.startsWith('/logo.');
    
    const allCorrect = correctPath && correctExtension && startsCorrectly;
    
    this.results.push({
      name: 'Logo Path and Extension Correctness',
      property: 'Property 11: Logo Path and Extension Correctness',
      requirements: 'Requirements 4.4',
      passed: allCorrect,
      message: allCorrect
        ? 'Logo path and extension are correct'
        : `Path issues: path="${openGraphUrl}", expected="${this.EXPECTED_RELATIVE_PATH}"`
    });
  }

  /**
   * Test absolute URL generation with metadataBase
   */
  testAbsoluteUrlGeneration(): void {
    const result = validateAbsoluteUrlGeneration(this.EXPECTED_RELATIVE_PATH, this.METADATA_BASE);
    
    this.results.push({
      name: 'Absolute URL Generation',
      property: 'URL Generation Validation',
      requirements: 'Requirements 1.3, 3.2',
      passed: result.isValid,
      message: result.isValid
        ? `Absolute URL generated correctly: ${result.absoluteUrl}`
        : `Generation failed: ${result.error}`
    });
  }

  /**
   * Test logo file accessibility
   */
  testLogoFileAccessibility(): void {
    const logoPath = path.join(process.cwd(), 'public', 'logo.jpeg');
    const exists = fs.existsSync(logoPath);
    
    let fileSize = 0;
    if (exists) {
      try {
        const stats = fs.statSync(logoPath);
        fileSize = stats.size;
      } catch {
        // File exists but can't read stats
      }
    }
    
    this.results.push({
      name: 'Logo File Accessibility',
      property: 'File System Validation',
      requirements: 'Requirements 1.4, 4.1',
      passed: exists && fileSize > 0,
      message: exists 
        ? `Logo file exists and is accessible (${fileSize} bytes)`
        : 'Logo file not found at public/logo.jpeg'
    });
  }

  /**
   * Run all tests
   */
  runAllTests(): TestResult[] {
    console.log('🧪 Running URL Consistency Validation Tests...\n');
    
    this.testUrlFormatConsistency();
    this.testCrossPlatformUrlConsistency();
    this.testLogoPathCorrectness();
    this.testAbsoluteUrlGeneration();
    this.testLogoFileAccessibility();
    
    return this.results;
  }

  /**
   * Print test results
   */
  printResults(): void {
    const passedTests = this.results.filter(r => r.passed).length;
    const totalTests = this.results.length;
    
    console.log('📊 Test Results:\n');
    
    this.results.forEach((result, index) => {
      const icon = result.passed ? '✅' : '❌';
      console.log(`${icon} Test ${index + 1}: ${result.name}`);
      console.log(`   ${result.property}`);
      console.log(`   Validates: ${result.requirements}`);
      console.log(`   Result: ${result.message}\n`);
    });
    
    console.log('='.repeat(60));
    console.log(`📈 Summary: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
      console.log('🎉 All URL consistency validations passed!');
    } else {
      console.log('⚠️  Some validations failed. Please review the issues above.');
    }
    console.log('='.repeat(60));
  }
}

/**
 * Main execution function
 */
function main(): void {
  const testSuite = new URLConsistencyTestSuite();
  const results = testSuite.runAllTests();
  testSuite.printResults();
  
  // Exit with error code if any tests failed
  const allPassed = results.every(r => r.passed);
  process.exit(allPassed ? 0 : 1);
}

// Run tests if this file is executed directly
if (require.main === module) {
  main();
}

export { URLConsistencyTestSuite };