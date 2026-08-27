# C# 深度

## 值类型与引用类型

### 基本概念

**值类型**：
- 存储在栈上
- 包括：int, float, bool, struct, enum
- 赋值时复制值本身

**引用类型**：
- 存储在堆上
- 包括：class, interface, delegate, string, array
- 赋值时复制引用（指针）

### 面试要点

1. **装箱与拆箱**：值类型转引用类型（装箱），引用类型转值类型（拆箱）
2. **struct vs class**：结构体是值类型，类是引用类型
3. **string 的特殊性**：不可变对象，驻留池优化

## 异步编程 async/await

### 核心概念

- `async`：标记方法是异步的
- `await`：等待异步操作完成，不阻塞线程
- `Task`：代表一个异步操作
- `Task<T>`：代表有返回值的异步操作

### 面试要点

1. **异步的好处**：非阻塞、提高吞吐量
2. **ConfigureAwait(false)**：避免死锁，适用于库代码
3. **异常处理**：try-catch 包裹 await
4. **并发控制**：SemaphoreSlim、Parallel.ForEachAsync
