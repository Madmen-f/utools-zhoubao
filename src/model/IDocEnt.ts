export interface IDocEnt {
  /**
   * 文档id
   */
  id: string;

  /**
   * 分类id
   */
  typeId: string;

  /**
   * 文档内容
   */
  data: string;

  /**
   * 提醒时间
   */
  notifyTime: string;

  /**
   * 创建时间
   */
  createTime: Number;

  /**
   * 更新时间
   */
  updateTime: Number;
}
