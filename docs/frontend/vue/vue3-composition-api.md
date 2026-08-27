# Composition API 详解

## setup 函数

```typescript
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 响应式状态
const count = ref(0)
const message = ref<string>('Hello')

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
const increment = () => {
  count.value++
}

// 生命周期
onMounted(() => {
  console.log('组件已挂载')
})
</script>
```

## ref vs reactive

```typescript
import { ref, reactive, readonly, shallowRef } from 'vue'

// ref：包装原始值，需 .value
const count = ref(0)
console.log(count.value) // 0
count.value++

// reactive：包装对象，自动解包
const state = reactive({ count: 0 })
console.log(state.count) // 0
state.count++

// readonly：只读代理
const original = reactive({ count: 0 })
const copy = readonly(original)
copy.count++ // 报错

// shallowRef：浅响应，不深度代理
const shallow = shallowRef({ count: 0 })
shallow.value.count = 1 // 不触发更新！
shallow.value = { count: 2 } // 触发更新
```

## watch vs watchEffect

```typescript
import { watch, watchEffect, ref } from 'vue'

const source = ref(0)
const extra = ref(10)

// watch：监听特定源，惰性执行
watch(source, (newVal, oldVal) => {
  console.log(`source: ${oldVal} → ${newVal}`)
}, { immediate: true }) // 立即执行

// watchEffect：自动追踪依赖，立即执行
watchEffect(() => {
  console.log(`count = ${source.value}, extra = ${extra.value}`)
  // 自动追踪 source 和 extra
})
```

## provide / inject

```typescript
// 父组件
provide('theme', 'dark')
provide('user', computed(() => ({ name: 'Alice' })))

// 子组件（任意层级）
const theme = inject('theme')
const user = inject<ReturnType<typeof computed>>('user')
```

## 组合式函数（Composable）

```typescript
// useFetch.ts
export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    try {
      const res = await fetch(url)
      data.value = await res.json() as T
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  onMounted(fetch)
  return { data, loading, error, refresh: fetch }
}

// 使用
const { data, loading, error } = useFetch('/api/users')
```

## 面试要点

**Q: setup 何时执行？**
- A: 组件实例创建之前，此时无法访问 `this`

**Q: ref 和 reactive 如何选择？**
- A: 基本类型用 `ref`，对象类型且不需要浅响应用 `reactive`

**Q: Composable 和普通函数有什么区别？**
- A: Composable 封装响应式状态和逻辑，遵循 `useXxx` 命名规范，可被多个组件复用
