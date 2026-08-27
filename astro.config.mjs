import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://siddhivinayakdesigners.in',
  integrations: [sitemap()],
  redirects: {
    '/interior-designer-vashi': '/cities/interior-designers-navi-mumbai/vashi',
    '/vashi': '/cities/interior-designers-navi-mumbai/vashi',
    '/interior-designer-airoli': '/cities/interior-designers-navi-mumbai/airoli',
    '/interior-designer-belapur': '/cities/interior-designers-navi-mumbai/belapur',
    '/interior-designer-ghansoli': '/cities/interior-designers-navi-mumbai/ghansoli',
    '/interior-designer-kamothe': '/cities/interior-designers-navi-mumbai/kamothe',
    '/interior-designer-kharghar': '/cities/interior-designers-navi-mumbai/kharghar',
    '/interior-designer-kopar-khairane': '/cities/interior-designers-navi-mumbai/kopar-khairane',
    '/interior-designer-koparkhairane': '/cities/interior-designers-navi-mumbai/kopar-khairane',
    '/interior-designer-koparkhairne': '/cities/interior-designers-navi-mumbai/kopar-khairane',
    '/interior-designer-navi-mumbai': '/cities/interior-designers-navi-mumbai',
    '/interior-designer-nerul': '/cities/interior-designers-navi-mumbai/nerul',
    '/interior-designer-panvel': '/cities/interior-designers-navi-mumbai/panvel',
    '/interior-designer-rabale': '/cities/interior-designers-navi-mumbai/rabale',
    '/interior-designer-sanpada': '/cities/interior-designers-navi-mumbai/sanpada',
    '/interior-designer-seawoods': '/cities/interior-designers-navi-mumbai/seawoods',
    '/interior-designer-turbhe': '/cities/interior-designers-navi-mumbai/turbhe',
    '/interior-designer-ulwe': '/cities/interior-designers-navi-mumbai/ulwe',
    '/cities/interior-designers-navi-mumbai/koparkhairane': '/cities/interior-designers-navi-mumbai/kopar-khairane',
    '/cities/interior-designers-navi-mumbai/koparkhairne': '/cities/interior-designers-navi-mumbai/kopar-khairane',
  }
});
