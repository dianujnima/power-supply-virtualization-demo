import Head from 'next/head'
export const siteTitle = 'Power Supply Virtualization'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
          <meta name="viewport" content="width=device-width"></meta>
      </Head>
      <main>{children}</main>
    </div>
  )
}