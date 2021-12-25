import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";

import globalCSS from './styles/global.css';
import interCSS from './styles/inter.css';
import aboutCss from "./styles/about.css";
import merchCss from "./styles/merch.css";
import benefitsCss from "./styles/benefits.css";
import shortCss from "./styles/short-term-staff.css";
import slideCss from "./styles/slide-show.css";
import newsletterCss from "./styles/newsletter.css";
import subscriptionCss from "./styles/subscription.css";
import boostCss from "./styles/boost-conversion.css";
import statisticsCss from "./styles/statistics.css";
import suitableCss from "./styles/suitable-block.css";
import combineCss from "./styles/combine-block.css";
import findCss from "./styles/find-layout.css";
import discoverCss from "./styles/discover-source.css";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" },

  { rel: 'stylesheet', href: globalCSS },
  { rel: 'stylesheet', href: interCSS },
  { rel: 'stylesheet', href: aboutCss },
  { rel: 'stylesheet', href: merchCss },
  { rel: 'stylesheet', href: benefitsCss },
  { rel: 'stylesheet', href: shortCss },
  { rel: 'stylesheet', href: slideCss },
  { rel: 'stylesheet', href: newsletterCss },
  { rel: 'stylesheet', href: subscriptionCss },
  { rel: 'stylesheet', href: boostCss },
  { rel: 'stylesheet', href: statisticsCss },
  { rel: 'stylesheet', href: suitableCss },
  { rel: 'stylesheet', href: combineCss },
  { rel: 'stylesheet', href: findCss },
  { rel: 'stylesheet', href: discoverCss },


  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'apple-touch-startup-image', href: '/apple-touch-icon.png' },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/site.webmanifest' },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
