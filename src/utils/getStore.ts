import { getRoot, IStateTreeNode } from 'mobx-state-tree';

import RootModel from 'models/RootModel';

/**
 * Возвращает корневой узел дерева моделей, в котором расположен указанный узел.
 * @param self Узел модели в глобальном дереве моделей.
 */
export default function getStore(self: IStateTreeNode) {
  return getRoot<typeof RootModel>(self);
}
