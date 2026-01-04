import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export default function SEO({ 
  title = "CinePulse | AI-Powered Movie Recommendations", 
  description = "Discover movies based on deep emotional resonance and cinematic mapping. The next generation of movie discovery.",
  image = "/og-image.jpg", // Default placeholder
  url = window.location.href
}: SEOProps) {
  const siteName = "CinePulse"
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  )
}
