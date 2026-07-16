import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  image, 
  type = 'website', 
  author = 'Aniket Kumar',
  publishedTime,
  modifiedTime,
  schema 
}) => {
  const { pathname } = useLocation();
  const baseUrl = import.meta.env.VITE_URL || 'https://aniket-kumar.vercel.app';
  const url = `${baseUrl}${pathname}`;

  // Default image if none provided
  const ogImage = image || `${baseUrl}/ProfileNoBG.png`;

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Aniket Kumar Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article specific tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
