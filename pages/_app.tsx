import "../styles/globals.css";
import Layout from "../layouts/layout";
import type { AppProps } from "next/app";
import { GlobalProvider } from "../components/Context";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
