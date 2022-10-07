/**
 * Позволяет подписываться, отписываться и инициировать определённые события
 * @class
 */
class Observer {
  constructor() {
    /** @private */
    this._subscribers = [];
    /** @private */
    this._subscriberId = 1;
  }

  /**
   * @callback SubCallback
   */

  /**
   * Выполняет подписку на событие. Принимает callback, который сработает на событие
   * @param {SubCallback} callback
   * @returns {number} возвращает идентификатор подписки
   */
  subscribe(callback) {
    const id = this._subscriberId;
    this._subscribers.push({
      id,
      callback,
    });
    this._subscriberId += 1;
    return id;
  }

  /**
   * Позволяет выполнить отписку от события
   * @param {number} id
   */
  unsubscribe(id) {
    const index = this._subscribers.findIndex((sub) => sub.id === id);
    this._subscribers.splice(index, 1);
  }

  /**
   * Уведомляет о том, что событие произошло
   */
  notify() {
    this._subscribers.forEach((sub) => sub.callback());
  }
}

const logoutObserver = new Observer();

export { logoutObserver };
