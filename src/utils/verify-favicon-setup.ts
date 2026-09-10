/**
 * Favicon Setup Verification Script
 * Tests all favicon configurations for Google search results compatibility
 */

import { readFile } from 'fs/promises';
import { join } from 'path';

interface FaviconTest {
  name: string;
  test: () => Promise<{ passed: boolean; message: string }>;
}

class FaviconVerifier {
  private tests: FaviconTest[] = [];

  constructor() {
    this.setupTests();
  }

  private setupTests(): void {
    this.tests = [
      {
        name: 'Logo File Exists',
        test: async () => {
          try {
            const logoPath = join(process.cwd(), 'public', 'logo.jpeg');
            await readFile(logoPath);
            return { passed: true, message: 'Logo file exists and is accessible' };
          } catch {
            return { passed: false, message: 'Logo file not found at public/logo.jpeg' };
          }
        }
      },
      {
        name: 'Layout Favicon Configuration',
        test: async () => {
          try {
            const layoutPath = join(process.cwd(), 'src', 'app', 'layout.tsx');
            const layoutContent = await readFile(layoutPath, 'utf-8');
            
            const hasIconsConfig = layoutContent.includes('icons: {');
            const hasFaviconLink = layoutContent.includes('rel="icon"');
            const hasShortcutLink = layoutContent.includes('rel="shortcut icon"');
            
            if (hasIconsConfig && hasFaviconLink && hasShortcutLink) {
              return { passed: true, message: 'All favicon configurations present in layout.tsx' };
            } else {
              return { 
                passed: false, 
                message: `Missing configurations: ${!hasIconsConfig ? 'icons metadata ' : ''}${!hasFaviconLink ? 'favicon link ' : ''}${!hasShortcutLink ? 'shortcut link' : ''}`.trim()
              };
            }
          } catch {
            return { passed: false, message: 'Could not read layout.tsx file' };
          }
        }
      },
      {
        name: 'Favicon Route Handler',
        test: async () => {
          try {
            const routePath = join(process.cwd(), 'src', 'app', 'favicon.ico', 'route.ts');
            await readFile(routePath);
            return { passed: true, message: 'Favicon route handler exists' };
          } catch {
            return { passed: false, message: 'Favicon route handler not found' };
          }
        }
      },
      {
        name: 'Metadata Configuration',
        test: async () => {
          try {
            const layoutPath = join(process.cwd(), 'src', 'app', 'layout.tsx');
            const layoutContent = await readFile(layoutPath, 'utf-8');
            
            const hasOpenGraphImage = layoutContent.includes('openGraph:') && layoutContent.includes('images:');
            const hasTwitterImage = layoutContent.includes('twitter:') && layoutContent.includes('images:');
            const hasStructuredData = layoutContent.includes('logo:');
            
            if (hasOpenGraphImage && hasTwitterImage && hasStructuredData) {
              return { passed: true, message: 'All social media and structured data configurations present' };
            } else {
              return { 
                passed: false, 
                message: `Missing: ${!hasOpenGraphImage ? 'OpenGraph ' : ''}${!hasTwitterImage ? 'Twitter ' : ''}${!hasStructuredData ? 'Structured Data' : ''}`.trim()
              };
            }
          } catch {
            return { passed: false, message: 'Could not verify metadata configuration' };
          }
        }
      }
    ];
  }

  async runAllTests(): Promise<void> {
    console.log('🔍 Verifying Favicon Setup for Google Search Results...\n');
    
    const results = await Promise.all(
      this.tests.map(async (test) => {
        const result = await test.test();
        return { name: test.name, ...result };
      })
    );

    results.forEach((result, index) => {
      const icon = result.passed ? '✅' : '❌';
      console.log(`${icon} ${index + 1}. ${result.name}: ${result.message}`);
    });

    const passedTests = results.filter(r => r.passed).length;
    const totalTests = results.length;

    console.log('\n' + '='.repeat(60));
    console.log(`📊 Results: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
      console.log('🎉 Favicon setup is complete and ready for Google search results!');
      console.log('\n📋 Next Steps:');
      console.log('1. Deploy your website to production');
      console.log('2. Submit to Google Search Console');
      console.log('3. Request indexing of your homepage');
      console.log('4. Wait for Google to crawl and update search results');
    } else {
      console.log('⚠️  Some configurations are missing. Please review the failed tests above.');
    }
    console.log('='.repeat(60));
  }
}

// Run verification if this file is executed directly
if (require.main === module) {
  const verifier = new FaviconVerifier();
  verifier.runAllTests().catch(console.error);
}

export { FaviconVerifier };