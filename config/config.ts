import { defineConfig, utils } from 'umi';

import { webpackPlugin } from './plugin.config';
// import { pageRoutes } from './router.config';

const { winPath } = utils;

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  title: false,
  // mock: false,
  nodeModulesTransform: {
    type: 'none',
  },
  antd:false,
  hash: true,
  // ssr: {},
  // exportStatic: { htmlSuffix: true },
  history: { type: 'browser' },
  dva: {
    hmr: true,
  },
  // routes: pageRoutes,
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  // dynamicImport: {
  //   loading: '@/components/PageLoading/index',
  // },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const antdProPath = match[1].replace('index.less', '').replace('.less', '');
          const arr = winPath(antdProPath)
            .replace(/^\//g, '')
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `${arr.join('-')}-${localName}`.replace(/--|-component-/g, '-').replace(/components-/g, 'cs-').replace('pages-', '');
        }

        return localName;
      },
    },
  },
  publicPath: '/', // 打包文件路径
  manifest: {
    basePath: '/',
  },
  chainWebpack: isProduction ? webpackPlugin : undefined,
});
