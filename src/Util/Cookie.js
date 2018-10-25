export default class Cookie {
  /**
   * 设置Cookie
   * @author zhoul
   * @param {string} name 设置的Cookie属性
   * @param {string} val  设置的Cookie值
   * @param {string} path 设置的Cookie的路径
   * @param {number} date 设置的Cookie的过期时间(天数)
   */
  static set(name, val, path, date) {
    const oDate = new Date();
    const domain = process.env.domain;
    oDate.setDate(oDate.getDate() + (date || 30));
    const sDate = `;expires=${oDate}`;
    const Path = `;path=${path || '/'}`;
    document.cookie = `${name}=${val}${sDate}${Path};domain=${domain}`;
  }

  /**
   * 获取Cookie
   * @author zhoul
   * @param   {string} name 需要获取的Cookie属性
   * @return {string} 获取到的Cookie值
   */
  static get(name) {
    const sCookies = document.cookie;
    const arr = sCookies.split('; ');
    for (let i = 0; i < arr.length; i += 1) {
      const arr2 = arr[i].split('=');
      if (arr2[0] === name) {
        return arr2[1];
      }
    }
    return null;
  }

  /**
   * 删除Cookie
   * @author zhoul
   * @param {string} name 需要删除的Cookie
   */
  static remove(name) {
    this.set(name, '', '', -1);
  }
}
