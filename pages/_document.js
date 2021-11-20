import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html lang="es">
        <Head>
            {/* FUENTES */}
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
            <link
              rel="preload"
              href="/fonts/Muli/Muli-ExtraBold.woff"
              as="font"
              crossOrigin=""
            />
            <link
              rel="preload"
              href="/fonts/Muli/Muli-SemiBold.woff"
              as="font"
              crossOrigin=""
            />
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument