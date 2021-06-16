import { pathToRegexp, Key } from 'path-to-regexp';

/**
 * Сведения о маршруте.
 */
interface Info {
  /**
   * Регулярное выражение для проверки соответствия `pathname` и маршрута.
   */
  regexp: RegExp;

  /**
   * Строковая запись маршрута.
   */
  route: string;

  /**
   * Указывает, что для сравнения используется точное соответствие с путём.
   */
  exact: boolean;

  /**
   * Коллекция названий именованных параметров, используемых в маршруте.
   */
  keys: Key[];
}

/**
 * Содержит методы для работы с маршрутами приложения.
 */
export default class RouterHelper {
  /**
   * Кэш сведений о маршрутах.
   */
  private static infos = new Map<string, Info>();

  /**
   * Получает коллекцию сведений о маршруте.
   * @param route Маршрут.
   */
  private static getInfo(route: string, exact: boolean) {
    const key = `${exact}|${route}`;

    if (this.infos.has(key)) {
      return this.infos.get(key);
    }

    const keys: Key[] = [];
    const regexp = pathToRegexp(route, keys, { end: exact });

    const info: Info = {
      regexp,
      exact,
      route,
      keys,
    };

    this.infos.set(key, info);
    return info;
  }

  /**
   * Возвращает `true`, если указанный путь соответствует переданному маршруту.
   * @param route Маршрут.
   * @param pathname Путь.
   * @param exact Указывает, что соответствие должно быть точным.
   */
  public static testPathname(
    route: string,
    pathname: string,
    exact: boolean = false
  ) {
    const info = this.getInfo(route, exact);
    return info.regexp.test(pathname);
  }

  /**
   * Возвращает коллекцию значений именованных параметров из указанного
   * маршрута, содержащихся в переданном пути. Если путь не совпадает
   * с маршрутом, метод возвращает `undefined`.
   * @param route Маршрут.
   * @param pathname Путь.
   * @param exact Указывает, что соответстве с маршрутом должно быть точным.
   */
  public static parsePathname(
    route: string,
    pathname: string,
    exact: boolean = false
  ) {
    const info = this.getInfo(route, exact);
    const match = info.regexp.exec(pathname);

    if (!match) {
      return undefined;
    }

    const params: Record<string | number, string> = {};
    const [, ...values] = match;
    const { length } = values;

    for (let i = 0; i < length; i += 1) {
      const { name } = info.keys[i];
      const value = values[i];
      params[name] = value;
    }

    return params;
  }
}
