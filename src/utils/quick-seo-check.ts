// Quick SEO audit script to check current score
export function runQuickSEOAudit() {
  const results = {
    score: 0,
    tests: [] as Array<{ name: string; passed: boolean; details?: string }>
  };

  // Test 1: Meta description length (150-160 chars optimal)
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const descriptionTest = {
    name: 'Meta Description Length',
    passed: metaDescription.length >= 120 && metaDescription.length <= 160,
    details: `Current length: ${metaDescription.length} characters`
  };
  results.tests.push(descriptionTest);

  // Test 2: Title tag exists and is proper length
  const title = document.title || '';
  const titleTest = {
    name: 'Title Tag',
    passed: title.length >= 30 && title.length <= 60,
    details: `Current length: ${title.length} characters`
  };
  results.tests.push(titleTest);

  // Test 3: H1 tag exists
  const h1 = document.querySelector('h1');
  const h1Test = {
    name: 'H1 Tag Present',
    passed: !!h1,
    details: h1 ? `Found: "${h1.textContent?.slice(0, 50)}..."` : 'No H1 tag found'
  };
  results.tests.push(h1Test);

  // Test 4: Meta keywords exist
  const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
  const keywordsTest = {
    name: 'Meta Keywords',
    passed: keywords.length > 0,
    details: `Keywords count: ${keywords.split(',').length}`
  };
  results.tests.push(keywordsTest);

  // Test 5: Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const ogTest = {
    name: 'Open Graph Tags',
    passed: !!(ogTitle && ogDescription && ogImage),
    details: `Title: ${!!ogTitle}, Description: ${!!ogDescription}, Image: ${!!ogImage}`
  };
  results.tests.push(ogTest);

  // Test 6: Twitter Card tags
  const twitterCard = document.querySelector('meta[name="twitter:card"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterTest = {
    name: 'Twitter Card Tags',
    passed: !!(twitterCard && twitterTitle),
    details: `Card: ${!!twitterCard}, Title: ${!!twitterTitle}`
  };
  results.tests.push(twitterTest);

  // Test 7: Canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  const canonicalTest = {
    name: 'Canonical URL',
    passed: !!canonical,
    details: canonical ? `Found: ${canonical.getAttribute('href')}` : 'No canonical URL'
  };
  results.tests.push(canonicalTest);

  // Test 8: Structured Data
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  const structuredDataTest = {
    name: 'Structured Data',
    passed: !!structuredData,
    details: structuredData ? 'JSON-LD found' : 'No structured data'
  };
  results.tests.push(structuredDataTest);

  // Test 9: Favicon
  const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
  const faviconTest = {
    name: 'Favicon',
    passed: !!favicon,
    details: favicon ? `Found: ${favicon.getAttribute('href')}` : 'No favicon'
  };
  results.tests.push(faviconTest);

  // Test 10: Language attribute
  const htmlLang = document.documentElement.getAttribute('lang');
  const langTest = {
    name: 'HTML Language Attribute',
    passed: !!htmlLang,
    details: htmlLang ? `Language: ${htmlLang}` : 'No language attribute'
  };
  results.tests.push(langTest);

  // Calculate score
  const passedTests = results.tests.filter(test => test.passed).length;
  results.score = Math.round((passedTests / results.tests.length) * 100);

  return results;
}

// Console logging function for browser
export function logSEOAudit() {
  const results = runQuickSEOAudit();
  
  console.log(`🔍 SEO AUDIT RESULTS - Score: ${results.score}/100`);
  console.log('='.repeat(50));
  
  results.tests.forEach((test, index) => {
    const status = test.passed ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${test.name}`);
    if (test.details) {
      console.log(`   ${test.details}`);
    }
  });
  
  console.log('='.repeat(50));
  console.log(`Overall Score: ${results.score}/100`);
  
  if (results.score >= 95) {
    console.log('🎉 Excellent! SEO score is above 95!');
  } else if (results.score >= 85) {
    console.log('👍 Good SEO score, but room for improvement');
  } else {
    console.log('⚠️ SEO needs improvement');
  }
  
  return results;
}