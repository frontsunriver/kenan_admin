// import node module libraries
import Head from "next/head";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Analytics } from "@vercel/analytics/react";

// import theme style scss file
import "styles/theme.scss";

// import "../components/Icons/Icons.css";
// import "../components/Toast/Toast.css";
// import "../components/ToastList/ToastList.css";

// import default layouts
import DefaultDashboardLayout from "layouts/DefaultDashboardLayout";
import { AuthProvider } from "provider/AuthContext";
import { ToastProvider } from "provider/ToastContext";
import ToastList from "../components/ToastList/ToastList";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const title = "Kenan Admin";
  const description = "Kenan";
  const keywords = "Kenan";

  // Identify the layout, which will be applied conditionally
  const Layout =
    Component.Layout ||
    (router.pathname.includes("dashboard")
      ? router.pathname.includes("instructor") ||
        router.pathname.includes("student")
        ? DefaultDashboardLayout
        : DefaultDashboardLayout
      : DefaultDashboardLayout);

  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          description: description,
          site_name: process.env.siteName,
        }}
      />
      <AuthProvider>
        <ToastProvider>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
          <ToastList />
        </ToastProvider>
      </AuthProvider>
    </SSRProvider>
  );
}

export default MyApp;
