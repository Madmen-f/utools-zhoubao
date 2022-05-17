class TypeStatus {
  /**
   * 构造函数
   * @param flag 数据表前缀
   */
  constructor(flag: number) {
    this.flag = flag;
  }
  flag = 0;

  setFlag(flag: number) {
    return this.flag = flag;
  }

  getFlag(): Number {
    return this.flag;
  }
}
