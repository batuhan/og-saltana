const title = "Saltana";
const description =
  "Learn how to build and deploy a modern Jamstack application using the most popular open-source software.";

const SEO = {
  title,
  description,
  canonical: "https://www.saltana.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.saltana.com",
    title,
    description,
    images: [
      {
        url: "https://react2025.com/og.png",
        alt: title,
        width: 1200,
        height: 700,
      },
    ],
  },
  twitter: {
    handle: "@withSaltana",
    site: "@withSaltana",
    cardType: "summary_large_image",
  },
};

export default SEO;
