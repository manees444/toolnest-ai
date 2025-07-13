// SEO utilities for dynamic page titles and meta descriptions
export function updatePageSEO(title: string, description: string) {
  // Update page title
  document.title = title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  // Update Open Graph title and description
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }
  
  // Update Twitter meta tags
  const twitterTitle = document.querySelector('meta[property="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', title);
  }
  
  const twitterDescription = document.querySelector('meta[property="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute('content', description);
  }
}

export const SEO_CONFIG = {
  homepage: {
    title: "ToolNest AI - Professional AI Tools for Therapists, Educators & Creators",
    description: "Privacy-first AI tools for professionals. Free therapist documentation app, mental health session summariser, and therapy note generator. No signup required, HIPAA-compliant design."
  },
  therapistTool: {
    title: "Therapist AI Session Summariser - Free Mental Health Documentation Tool | ToolNest AI",
    description: "Transform therapy session notes into professional summaries and care plans instantly. HIPAA-compliant AI therapist tools for mental health professionals. Free therapy note generator with no data storage."
  }
};