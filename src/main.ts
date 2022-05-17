import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { CommonDBHelper } from './Helper/DocDBHelper';
import { TypeDBHelper,DocDBHelper } from '@/Helper/DocDBHelper';
import { Tool } from '@/Helper/Tool';
import { TplFeature, CallbackListItem, onSubInputChange } from './types/utools.d';
import { TemplatePlugin } from '@/types/utools';

const DEFAULT_CB_LIST: CallbackListItem[] = [
  {
    title: `新建文档`,
    description: `新建文档`,
    icon: 'assets/img/logo.png',
  },
  {
    title: `我的分类列表`,
    description: `我的分类列表`,
    icon: 'assets/img/logo.png',
  }
];

// 进入我的文档的级数
let flag = 0;
function setflag(f: number) {
  flag = f
}
window.utoolsFunc = function () {
  console.log(`utoolsFunc : `);
  // utools.outPlugin();
};

// 监听回车时间
// 文档添加页面回车时间
let doc_content_input = ''
let type_content_input = ''
window.onload = function() {
  document.onkeydown=function(ev) {
    var event = ev || event
    if (event.keyCode === 13) {
      //utools.showNotification(word_content);
      if (doc_content_input) {
        let doc_content = doc_content_input;
        let wordList = doc_content_input.split('-')
        console.log("分类拆分" + wordList)
        let addType = Tool.getGlobalType();
        console.log('分类' + addType)
        if (!addType || wordList.length > 1) {
          //设置出分类
          const type_content = wordList.pop();
          //剩下的在设置成文档
          if (wordList.length) {
            doc_content = wordList.join("-")
          }
          //如果当前是日报，在添加一遍周报
          if (type_content == 'rb' || type_content == '日报') {
            type_content_input = Tool.getTypeName('zb')
            addTypeFunc(type_content_input)
            DocDBHelper.set({
              id: doc_content+'_zb',
              data: doc_content,
              typeId: type_content_input,
              notifyTime: '',
              createTime: Tool.getTimestamp(),
              updateTime: Tool.getTimestamp(),
            });
          }
          type_content_input = Tool.getTypeName(type_content)
        } else {
          type_content_input = Tool.getTypeName(addType)
        }
        addContentFunc(doc_content, type_content_input)
      }
      if (type_content_input) {
        addTypeFunc(type_content_input)
      }
    }
  }
}

function addTypeFunc(type_content_str = '') {
  //添加分类
  TypeDBHelper.set({
    id: type_content_str,
    name: type_content_str,
    level: 1,
    createTime: Tool.getTimestamp(),
    updateTime: Tool.getTimestamp(),
  });
  //设置当前分类是这个分类
  CommonDBHelper.set({
    id:"now_type",
    data: type_content_str
  })
  flag = 1
  utools.showNotification('添加分类成功');
  //把子输入框设置为空
  utools.setSubInputValue('')
  type_content_str = ''
}

function addContentFunc(doc_content_str = '', type_content_input_str = '') {
  //添加文档
  DocDBHelper.set({
    id: doc_content_str,
    data: doc_content_str,
    typeId: type_content_input_str,
    notifyTime: '',
    createTime: Tool.getTimestamp(),
    updateTime: Tool.getTimestamp(),
  });
  utools.showNotification('添加内容成功');
  //把子输入框设置为空
  utools.setSubInputValue('')
  doc_content_str = ''
  doc_content_input = ''
} 

//分类列表
const TypeMy: TplFeature = {
  mode: 'list',
  args: {
    placeholder: '请输入分类',
    enter: async (action, callbackSetList) => {
      console.log(action)
      callbackSetList(Tool.getMyTypeList());
    },
    search: async (action, searchWord, callbackSetList) => {
      // word_content = searchWord
    }, // 用户选择列表中某个条目时被调用
    select: (action, itemData, callbackSetList) => {
      console.log(action)
      console.log(itemData)
      // 设置当前选择的分类
      CommonDBHelper.set({
        id:"now_type",
        data: itemData.typeId
      })
      // typeStatus.setFlag(1)
      flag = 1
      utools.showNotification("当前选择分类为：" + itemData.typeId)
      utools.redirect('我的文档', '');
    },
  },
};

//添加分类
const TypeAdd: TplFeature = {
  mode: 'list',
  args: {
    placeholder: '请输入分类',
    enter: async (action, callbackSetList) => {
      callbackSetList(DEFAULT_CB_LIST);
    },
    search: async (action, searchWord, callbackSetList) => {
      type_content_input = searchWord
    }, // 用户选择列表中某个条目时被调用
    select: (action, itemData, callbackSetList) => {
      if (itemData.title !== '') {
        //设置到数据库里面当前选择的分类
        if (!Tool.getGlobalType()) {
          utools.showNotification("请先添加分类")
        } else {
          if (itemData.title == '新建文档') {
            utools.redirect('添加文档', '');
          } else {
            utools.redirect('我的分类列表', '');
          }
        }
      }
    },
  },
};

//添加文档 我的文档
const DocAdd: TplFeature = {
  mode: 'list',
  args: {
    placeholder: '请输入文档内容，xxx-rb|xxx-zb',
    enter: async (action, callbackSetList) => {
      // 获取当前分类下面的文档内容
      callbackSetList(Tool.getMyDocList(Tool.getGlobalType()));
    },
    search: async (action, searchWord, callbackSetList) => {
      doc_content_input = searchWord
      // utools.showNotification("flag is " + typeStatus.getFlag)
      // if (flag) {
        callbackSetList(Tool.getMyDocList(Tool.getGlobalType()));
      // }
    }, // 用户选择列表中某个条目时被调用
    select: (action, itemData, callbackSetList) => {
    },
  },
};

//导出分类
const DocExport: TplFeature = {
  mode: 'list',
  args: {
    placeholder: '请选择分类',
    enter: async (action, callbackSetList) => {
      console.log(action)
      callbackSetList(Tool.getMyTypeList());
    },
    search: async (action, searchWord, callbackSetList) => {
      // word_content = searchWord
    }, // 用户选择列表中某个条目时被调用
    select: (action, itemData, callbackSetList) => {
      let list = Tool.getMyDocList(Tool.getGlobalType())
      const savePath = resolve(utools.getPath('desktop'), itemData.title + ".txt");
      list.sort(Tool.sortBy('updateTime', 1))
      let data = ''
      for (let index = 0; index < list.length; index++) {
        const tmpDoc = list[index];
        data += (index + 1).toString() + '.' + tmpDoc.title + "\n"
      }
      writeFileSync(savePath, data, { encoding: 'utf-8' });
      utools.showNotification("导出" + itemData.title + "成功");
    },
  },
};

const preload: TemplatePlugin = { 
  utools_doc_add: DocAdd,
  utools_type_add: TypeAdd,
  utools_type_my: TypeMy,
  utools_doc_export: DocExport,
};

window.exports = preload;


