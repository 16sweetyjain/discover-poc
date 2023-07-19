import { SSRProvider, Provider, defaultTheme,View } from '@/libs/spectrum';
import AppBar from '@/components/AppBar';
import { Metadata } from 'next';

import Footer from '../../components/Footer'; // TODO use alias

import SearchInput from './discover/SearchInput';

import '@/styles/reset.scss'
import '@/styles/colors-light.scss'
import '@/styles/colors-dark.scss'
import '@/styles/global.scss';
import '@/styles/utils.scss'
import { dir } from 'i18next';

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}

export const metadata: Metadata = {
  title: 'Photoshop Express Discover',
};

const RootLayout: React.FC<RootLayoutProps> = ({ children, params }) => {

  return (
    <html lang={params.lng} dir={dir(params.lng)} >
      <head>
        <link rel="shortcut icon" href="/psx.ico" />
      </head>
      <body>
        <SSRProvider>
          <Provider theme={defaultTheme}>
            <View position={"sticky"} top={0} zIndex={10}>
              <AppBar />
            </View>
            <div>{children}</div>
            
            {/* <View>
              <Footer/>
            </View> */}
          </Provider>
        </SSRProvider>
      </body>
    </html>
  );

}

export default RootLayout;