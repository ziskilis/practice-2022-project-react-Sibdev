/**
 *
 * @param {string} message
 */
class StorageUsageError {
  constructor(message) {
    this.name = 'Ошибка работы с web-storage';
    this.message = message;
  }
}

const setTempItem = (name, item) => {
  if (localStorage.getItem(name))
    throw new StorageUsageError('A value with this key is already stored in localStorage');
  sessionStorage.setItem(name, item);
};

const setConstItem = (name, item) => {
  if (sessionStorage.getItem(name))
    throw new StorageUsageError('A value with this key is already stored in sessionStorage');
  localStorage.setItem(name, item);
};

export default {
  GET: (name) => {
    if (sessionStorage.getItem(name)) {
      const value = sessionStorage.getItem(name);
      if (value) return JSON.parse(value);
      return;
    }
    const value = localStorage.getItem(name);
    if (value) return JSON.parse(value);
    return;
  },
  /**
   *
   * @param {string} name
   * @param {*} item
   * @param {'const' | 'temp'} type
   *
   * const - сохраняет значение в localStorage
   *
   * temp - сохраняет значение в sessionStorage
   *
   * По-умолчанию сохраняет в localStorage
   */
  SET: (name, item, type = 'const') => {
    const stringifiedItem = JSON.stringify(item);
    if (type === 'const') setConstItem(name, stringifiedItem);
    if (type === 'temp') setTempItem(name, stringifiedItem);
  },
  DELETE: (name) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};
