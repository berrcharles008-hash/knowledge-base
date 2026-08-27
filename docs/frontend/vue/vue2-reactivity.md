# Vue 响应式原理

## Vue 2 响应式核心

### Object.defineProperty

```javascript
let data = { count: 0 };
let proxy;

function observe(obj) {
  const keys = Object.keys(obj);
  
  for (const key of keys) {
    let val = obj[key];
    observe(val); // 递归处理嵌套对象
    
    Object.defineProperty(obj, key, {
      get() {
        // 依赖收集（订阅）
        Dep.target && Dep.target.addDep(this);
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal;
          observe(newVal); // 重新观察新值
          // 通知更新
          this.dep.notify();
        }
      }
    });
  }
}
```

### 局限性

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 新增属性不响应 | defineProperty 无法拦截 | `Vue.set(obj, key, val)` |
| 删除属性不响应 | 同上 | `Vue.delete(obj, key)` |
| 数组索引变化不响应 | 未覆盖索引 setter | 重写数组原型方法 |
| 性能开销大 | 递归遍历所有属性 | 按需懒观察 |

## Vue 3 响应式核心

### Proxy 优势

```javascript
const proxy = new Proxy(target, {
  get(target, prop, receiver) {
    track(target, prop); // 依赖收集
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    const result = Reflect.set(target, prop, value, receiver);
    trigger(target, prop); // 触发更新
    return result;
  }
});
```

### Proxy vs defineProperty

| 特性 | defineProperty | Proxy |
|------|---------------|-------|
| 拦截方式 | 属性级别 | 对象级别 |
| 新增属性 | ❌ 需手动 Vue.set | ✅ 自动响应 |
| 删除属性 | ❌ 需手动 Vue.delete | ✅ 自动响应 |
| 数组索引 | ❌ 需重写方法 | ✅ 自动响应 |
| 嵌套对象 | ❌ 需递归处理 | ✅ 懒代理（使用时才代理） |
| 性能 | 初始化慢 | 初始化快，访问时处理 |

## 依赖收集流程

```
Watcher（订阅者）
    ↓
get 访问属性
    ↓
Dep.target = 当前 Watcher
    ↓
defineProperty get / Proxy get
    ↓
dep.addSub(watcher)  // 收集依赖
    ↓
set 修改属性
    ↓
dep.notify() → watcher.update() → 重新渲染
```

## 面试要点

**Q: Vue 为什么不能检测对象属性的添加和删除？**
- A: `Object.defineProperty` 只能拦截已存在的属性，新增属性没有 setter/getter

**Q: Vue 3 的响应式是深响应式吗？**
- A: `reactive()` 是深层代理，`ref()` 只对 value 本身响应，嵌套对象需递归代理

**Q: nextTick 的原理是什么？**
- A: 将 DOM 更新任务放入微任务队列（Promise.then / MutationObserver），等当前同步代码执行完再批量更新
