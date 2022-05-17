/**
 * @type { import ('./src/types/utools').PluginConfig }
 */
const pluginConfig = {
  // pluginId: 'ae839ccb',
  pluginName: '快速文档',
  // version: 'v0.0.0',
  description: '文档',
  author: '少吃饭',
  homepage: '无',
  // main: 'index.html',
  preload: 'preload.js',
  logo: 'assets/img/logo.png',
  // platform: ['win32'],
  // development: {
  //   main: '',
  //   preload: '',
  //   logo: '',
  //   buildPath: '',
  // },
  // pluginSetting: {
  //   single: true,
  //   height: 0,
  // },
  features: [
    {
      code: 'utools_doc_add',
      explain: '添加文档',
      icon: 'assets/img/add.png',
      cmds: ['添加文档', 'zb', 'rb', '日报', '周报', '新建文档', '继续添加文档', '加文档', '文档', '我的文档','doc'],
    },
    {
      code: 'utools_type_my',
      explain: '我的分类',
      icon: 'assets/img/add.png',
      cmds: ['我的分类', '分类列表', '列表', 'list'],
    },
    {
      code: 'utools_type_add',
      explain: '添加分类',
      icon: 'assets/imag/add.png',
      cmds: ['添加分类', '添加分类', '分类', 'type'],
    },
    {
      code: 'utools_doc_export',
      explain: '导出分类',
      icon: 'assets/img/add.png',
      cmds: ['导出','导出zb', 'dczb', '导出分类'],
    },
    /* {
      code: 'utools_type_my',
      explain: '我的分类',
      icon: 'assets/img/add.png',
      cmds: [{
        // 类型标记（必须）
        type: "regex",
        // 关键字名称（必须）
        label: "我的分类",
        // 正则表达式字符串 
        // 注意: 正则表达式存如果在斜杠 "\" 需要多加一个，"\\" 
        // 注意：“任意匹配的正则” 会被 uTools 忽视，如果要任意匹配请使用 "任意文本 - 关键字"。例如：/. 、/(.)+/、/[\s\S]
        match: "/^我的分类/i",
        // 最少字符数 (可选)
        minLength: 1,
        // 最多字符数 (可选)
        maxLength: 20
      }],
    }, */
  ],
};
export default pluginConfig;
