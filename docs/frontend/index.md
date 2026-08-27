# 前端技术

## Vue 2 vs Vue 3

### 响应式原理

**Vue 2**：
- 使用 `Object.defineProperty`
- 无法检测对象属性的添加删除
- 无法检测数组下标变化

**Vue 3**：
- 使用 `Proxy`
- 可以监听对象和数组的所有变化
- 性能更好

### 组合式 API

Vue 3 引入的组合式 API（Composition API）：
- `setup()` 函数
- `ref()`, `reactive()`
- `computed()`, `watch()`
- 更好的代码复用和逻辑组织

### 面试要点

1. **Vue 2 响应式限制**：需要提前声明属性
2. **Vue 3 性能优化**：编译时优化、静态提升
3. **生命周期钩子变化**：`beforeDestroy` → `beforeUnmount`

## TypeScript

### 基础类型

```typescript
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];
```

### 接口与类型

```typescript
interface User {
  name: string;
  age: number;
}

type Status = 'pending' | 'success' | 'failed';
```

### 面试要点

1. **interface vs type**：接口可合并，类型不能
2. **泛型**：`<T>` 类型参数
3. **装饰器**：类的元编程
