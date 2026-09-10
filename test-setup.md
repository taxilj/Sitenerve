# TestSprite Setup for Emtrix Project

## Project Overview
- **Name**: Emtrix
- **Type**: Next.js React Application
- **Purpose**: IT Services & Digital Solutions website
- **Framework**: Next.js 15.3.4 with React 19

## Key Components to Test

### 1. Navigation Component (`src/components/Navbar.tsx`)
- Navigation menu functionality
- Responsive design
- Mobile menu toggle

### 2. Hero Section (`src/page/Hero.tsx`)
- Hero content display
- Animation effects
- Call-to-action buttons

### 3. Marquee Component (`src/components/Marquee.tsx`)
- Scrolling text animation
- Performance optimization

### 4. About Section (`src/page/About.tsx`)
- Content display
- Layout responsiveness

### 5. Showcase Section (`src/page/Showcase.tsx`)
- Portfolio display
- Image loading
- Interactive elements

### 6. Our Work Section (`src/page/Ourwork.tsx`)
- Project showcase
- Filtering functionality

### 7. Client Reviews (`src/page/Clientsreviews.tsx`)
- Testimonial display
- Carousel functionality

### 8. Model Pricing (`src/page/Modelprice.tsx`)
- Pricing table display
- Plan comparison

### 9. Connect Section (`src/page/Connect.tsx`)
- Contact form
- Form validation
- Submission handling

### 10. Footer (`src/page/Footer.tsx`)
- Footer links
- Social media links
- Copyright information

## TestSprite Configuration

The project has been configured with TestSprite MCP server for automated testing:

```json
{
  "scripts": {
    "test": "npx @testsprite/testsprite-mcp generateCodeAndExecute",
    "test:testsprite": "npx @testsprite/testsprite-mcp generateCodeAndExecute"
  }
}
```

## How to Use TestSprite

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Run TestSprite Tests**:
   ```bash
   npm run test:testsprite
   ```

## Expected Test Coverage

TestSprite will automatically generate and execute tests for:

- **Functional Testing**: All component interactions and user workflows
- **UI/UX Testing**: Visual elements and user experience flows
- **Performance Testing**: Loading times and animation performance
- **Responsive Testing**: Mobile and desktop layouts
- **Error Handling**: Form validation and error states
- **Accessibility Testing**: Screen reader compatibility and keyboard navigation

## TestSprite Features

- **Automated Test Generation**: AI-powered test case creation
- **Cloud Execution**: Tests run in secure cloud environments
- **Self-Repair**: Automatic bug detection and fix suggestions
- **Comprehensive Coverage**: Frontend, backend, and integration testing
- **Real-time Results**: Detailed test reports and analytics

## Next Steps

1. Ensure TestSprite API key is configured (if required)
2. Start the development server
3. Run TestSprite tests
4. Review generated test reports
5. Implement any suggested fixes

## Dependencies

- `@testsprite/testsprite-mcp`: TestSprite MCP server for automated testing
- Next.js development server for local testing
- All existing project dependencies for full functionality testing
