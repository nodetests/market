const path = require('path')
const {
  override,
  addLessLoader,
  addWebpackAlias,
  overrideDevServer,
  fixBabelImports
} = require('customize-cra')
const { getThemeVariables } = require('antd/dist/theme');

const devServerConfig = () => config => {
  return {
    ...config,
  }
}

// 修改端口号
process.env.PORT = 3030

module.exports = {
  webpack: override(
    addWebpackAlias({
      // 路径别名，还需要配置tsconfig.json、tsconfig-base.json，在后面，可配置多个路径别名
        '@': path.resolve(__dirname, 'src/')
    }),
    // antd按需加载
    fixBabelImports('import', { 
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true // 支持less
    }),
    // 配置less
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true, // 启用支持内联javascript
        // modifyVars: { 

        //   // @primary-color: #1890ff; // 全局主色
        //   // @link-color: #1890ff; // 链接色
        //   // @success-color: #52c41a; // 成功色
        //   // @warning-color: #faad14; // 警告色
        //   // @error-color: #f5222d; // 错误色
        //   // @font-size-base: 14px; // 主字号
        //   // @heading-color: rgba(0, 0, 0, 0.85); // 标题色
        //   // @text-color: rgba(0, 0, 0, 0.65); // 主文本色
        //   // @text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
        //   // @disabled-color: rgba(0, 0, 0, 0.25); // 失效色
        //   // @border-radius-base: 2px; // 组件/浮层圆角
        //   // @border-color-base: #d9d9d9; // 边框色
        //   // @box-shadow-base: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
        //   //   0 9px 28px 8px rgba(0, 0, 0, 0.05); // 浮层阴影

        // },
        //  localIdentName: '[local]--[hash:base64:5]'
        modifyVars:{
          ...getThemeVariables({
            dark: true, // 开启暗黑模式
            compact: false, // 开启紧凑模式
          }),
          '@font-size-base': '14px',
          '@primary-color': '#85b6ff',
          '@text-color':'rgba(255, 255, 255, 1)',
        }
      }
    })
  ),
  devServer: overrideDevServer(devServerConfig()) 
}