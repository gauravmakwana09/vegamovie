import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = 'CineVerse - Watch Movies Online';
    const defaultDescription = 'Watch the latest movies, trending films, and top-rated classics on CineVerse. Your premier destination for online entertainment.';
    const defaultKeywords = 'movies, watch movies online, streaming, cinema, full hd movies';
    const siteUrl = 'https://cineverse.vercel.app'; // Replace with actual domain if different
    const defaultImage = '/og-image.jpg'; // Make sure this exists or replace

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title ? `${title} | CineVerse` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={url || siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || siteUrl} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url || siteUrl} />
            <meta property="twitter:title" content={title || siteTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
};

export default SEO;
