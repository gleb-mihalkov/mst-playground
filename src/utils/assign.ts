import { IStateTreeNode } from 'mobx-state-tree';
import { action } from 'mobx';

/**
 * Задаёт свойствам модели новые значения.
 * @param self Модель.
 * @param values Коллекция значений.
 */
function assign<TNode extends IStateTreeNode>(
  self: TNode,
  values: Partial<TNode>
) {
  const keys = Object.keys(values);
  const { length } = keys;

  for (let i = 0; i < length; i += 1) {
    const key = keys[i] as keyof TNode;

    if (Object.prototype.hasOwnProperty.call(values, key)) {
      self[key] = values[key];
    }
  }
}

export default action(assign);
