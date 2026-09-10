/**
 * Verification script for Google Drive image URLs in work library
 */

import { workLibraryProjects } from '../data/work-library';

interface ImageTest {
  id: string;
  title: string;
  url: string;
  status: 'pending' | 'success' | 'error';
  message: string;
}

class DriveImageVerifier {
  private tests: ImageTest[] = [];

  constructor() {
    this.setupTests();
  }

  private setupTests(): void {
    this.tests = workLibraryProjects.map(project => ({
      id: project.id,
      title: project.title,
      url: project.heroImage,
      status: 'pending' as const,
      message: ''
    }));
  }

  async verifyImageUrl(url: string): Promise<{ success: boolean; message: string }> {
    try {
      // Check if it's a Google Drive URL with correct format
      if (url.includes('drive.google.com/uc?export=view&id=')) {
        return { success: true, message: 'Correct Google Drive format' };
      } else if (url.includes('drive.google.com/file/d/') && url.includes('/view?usp=sharing')) {
        return { success: false, message: 'Incorrect format - needs conversion to uc?export=view&id=' };
      } else if (url.includes('drive.google.com')) {
        return { success: false, message: 'Google Drive URL but unknown format' };
      } else {
        return { success: true, message: 'Non-Google Drive URL (assumed working)' };
      }
    } catch (error) {
      return { success: false, message: `Error checking URL: ${error}` };
    }
  }

  async runAllTests(): Promise<void> {
    console.log('🔍 Verifying Google Drive Image URLs in Work Library...\n');
    
    for (const test of this.tests) {
      const result = await this.verifyImageUrl(test.url);
      test.status = result.success ? 'success' : 'error';
      test.message = result.message;
    }

    this.printResults();
  }

  private printResults(): void {
    console.log('📊 Image URL Verification Results:\n');
    
    this.tests.forEach((test, index) => {
      const icon = test.status === 'success' ? '✅' : '❌';
      console.log(`${icon} ${index + 1}. ${test.title}`);
      console.log(`   ID: ${test.id}`);
      console.log(`   Status: ${test.message}`);
      console.log(`   URL: ${test.url}\n`);
    });

    const successCount = this.tests.filter(t => t.status === 'success').length;
    const totalCount = this.tests.length;

    console.log('='.repeat(60));
    console.log(`📈 Summary: ${successCount}/${totalCount} images have correct URLs`);
    
    if (successCount === totalCount) {
      console.log('🎉 All image URLs are properly formatted!');
    } else {
      console.log('⚠️  Some images need URL format fixes.');
      console.log('\n🔧 To fix Google Drive URLs:');
      console.log('1. Change from: https://drive.google.com/file/d/FILE_ID/view?usp=sharing');
      console.log('2. Change to: https://drive.google.com/uc?export=view&id=FILE_ID');
    }
    console.log('='.repeat(60));
  }

  getFailedTests(): ImageTest[] {
    return this.tests.filter(t => t.status === 'error');
  }
}

// Run verification if this file is executed directly
if (require.main === module) {
  const verifier = new DriveImageVerifier();
  verifier.runAllTests().catch(console.error);
}

export { DriveImageVerifier };