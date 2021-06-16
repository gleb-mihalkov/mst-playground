import { createContext } from 'react';
import { Instance } from 'mobx-state-tree';

import RootModel from 'models/RootModel';

/**
 * Тип контекста.
 */
type Value = Instance<typeof RootModel>;

/**
 * Контекст хранилища моделей системы.
 */
export default createContext<Value>(null as Value);
