// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document';


export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <style>{`
            body {
              position: absolute;
              top: 0;
            }
          `}</style>
        </Head>
        <body>
          <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js"></script>

          <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-analytics.js"></script>

          <script>
  // Your web app's Firebase configuration
            var firebaseConfig = {
              apiKey: "AIzaSyDjl80n7jhBGTjElcxB4pbq3L5X2CCNDbc",
    authDomain: "bowdawn-jade.firebaseapp.com",
    databaseURL: "https://bowdawn-jade.firebaseio.com",
    projectId: "bowdawn-jade",
    storageBucket: "bowdawn-jade.appspot.com",
    messagingSenderId: "224887390799",
    appId: "1:224887390799:web:ed893c1fa375196a46e03a",
    measurementId: "G-CFK77J8VVQ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>

          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}