import i18next from "../../i18next";


class THelper {
  static t(val = "", base = "common") {
    const t = i18next.t;
    return i18next.t(base + ':' + val);
  }
}

export default THelper
