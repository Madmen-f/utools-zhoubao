import { CommonDBHelper, DocDBHelper } from './DocDBHelper';
import { TypeDBHelper } from '@/Helper/DocDBHelper';
import { CallbackListItem } from '@/types/utools';

export class Tool {
  static formatTimestamp(time) {
    const nowdate = new Date(time);
    let year = nowdate.getFullYear(),
    month = nowdate.getMonth() + 1,
    date = nowdate.getDate(),
    day = nowdate.getDay(),
    week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    h = nowdate.getHours(),
    m = nowdate.getMinutes(),
    s = nowdate.getSeconds();
    return year + "-" + month + "-" + date + ' ' + h +":" + m + ":" + s + " (" + week[day] + ")";
  }

  /**
   * 获取今天的日期
   * @returns 
   */
  static getTodayDate() {
    const nowdate = new Date();
    let year = nowdate.getFullYear(),
    month = nowdate.getMonth() + 1,
    date = nowdate.getDate(),
    day = nowdate.getDay(),
    week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return year + "-" + month + "-" + date + " (" + week[day] + ")";
  }
  /**
   * 分类名称特殊处理
   */
  static getTypeName(type_name = '') {
    if (type_name == 'zb' || type_name == '周报') {
      return "周报" + this.getWeekDay();
    } if (type_name == 'rb' || type_name == '日报') {
      return "日报" + this.getTodayDate();
    } else {
      return type_name
    }
  }

  /**
   * 获取一周的开始时间跟结束时间
   * @param day -1 上周 0这周 1下周
   */
  static getWeekDay(day = 0) {
    return "（" + this.getDay('s', day) + "~" + this.getDay('e', day) + "）";
  }
  /**
   * 获取一周的开始跟结束时间
   * getDay("s",1)  //得到下周一的yyyy-mm-dd格式日期
   * getDay("e",1)  //得到下周日的yyyy-mm-dd格式日期
   * @param type 
   * @param dates 
   * @returns 
   */
  static getDay(type = 's', dates = 0) {
    let now = new Date();
    let nowTime = now.getTime();
    let days = now.getDay() == 0 ? 7 :  now.getDay();
    let longTime = 24 * 60 * 60 * 1000;
    let n = longTime * 7 * (dates || 0);
    if (type == "s") {
      var dd = nowTime - (days - 1) * longTime + n;
    } else {
      var dd = nowTime + (7 - days) * longTime + n;
    }
    let ddd = new Date(dd);
    let y = ddd.getFullYear();
    let m = ddd.getMonth() + 1;
    let d = ddd.getDate();
    let mStr = m < 10 ? "0" + m: m;
    let dStr = d < 10 ? "0" + d: d;
    return y + "年" + mStr + "月" + dStr + '日';
  };

  // 获取当前时间戳
  static getTimestamp() {
    return Date.now();
  }
  
  // 获取所有的分类列表
  static getMyTypeList(searchWord = ''){
    const dbList = TypeDBHelper.getAll();
    let cbList = dbList.map(db => {
      const cb: CallbackListItem = {
        title: db.data.name,
        description: '创建时间：' + this.formatTimestamp(db.data.createTime),
        icon: 'assets/img/up.png',
        updateTime: db.data.updateTime,
        typeId: db.data.id
      };
      //TypeDBHelper.del(db.data.id)
      return cb;
    });

    cbList.sort(this.sortBy('updateTime'))
    console.log(cbList);
    return cbList;
  };

  static getMyDocList(typeId) {
    const dbList = DocDBHelper.getAll();
    let cbList = [];
    for (let index = 0; index < dbList.length; index++) {
      const element = dbList[index];
       if (element.data.typeId == typeId) {
        const cb: CallbackListItem = {
          title: element.data.data,
          description: '创建时间：' + this.formatTimestamp(element.data.createTime) + "    " + "分类：" + element.data.typeId ,
          icon: 'assets/img/up.png',
          updateTime: element.data.updateTime,
          element: element
        };
        cbList.push(cb);
      }
      // DocDBHelper.del(element.data.id)
    }

    cbList.sort(this.sortBy('updateTime'))
    console.log(cbList);
    return cbList;
  };

  //获取当前设置的全局分类
  static getGlobalType() {
    const a = CommonDBHelper.get("now_type");
    return a.data.data;
  };
       
  //获取当前设置的全局分类
  static getGlobalDoc() {
    const a = CommonDBHelper.get("now_doc");
    return a.data.data;
  };

  static sortBy (field, type = 0) {
    if (type == 0) {
      //根据传过来的字段进行排序
      return (x, y) => {
        return  y[field] - x[field]
      }
    } else {
      return (x, y) => {
        return  x[field] - y[field] 
      }
    }
  }
}
