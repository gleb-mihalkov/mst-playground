import { IStateTreeNode, IJsonPatch, applyPatch } from 'mobx-state-tree';
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
  const patches: IJsonPatch[] = [];

  for (let i = 0; i < length; i += 1) {
    const key = keys[i] as keyof typeof values;

    patches.push({
      value: values[key],
      path: `./${key}`,
      op: 'add',
    });
  }

  applyPatch(self, patches);
}

export default action(assign);
