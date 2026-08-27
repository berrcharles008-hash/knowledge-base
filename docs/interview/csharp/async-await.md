# async/await 异步编程

## 底层原理

`async/await` 本质是编译器生成的状态机：

```csharp
public async Task<string> FetchDataAsync(int id)
{
    var result = await HttpClient.GetStringAsync(url); // 异步等待
    return result.ToUpper();
}
```

编译器将其转换为类似：
```csharp
// 状态机核心逻辑
int <>1__state;
TaskAwaiter<string> <>u__1;
// ...
```

## 关键概念

### Task vs ValueTask
| | Task | ValueTask |
|---|---|---|
| 分配 | 堆分配 | 可栈分配（struct） |
| 适用场景 | 通用异步 | 高性能、高频调用 |
| 使用建议 | 默认选择 | 热路径、内部实现 |

### CancellationToken
```csharp
public async Task<string> FetchDataAsync(
    string url, 
    CancellationToken ct = default)
{
    using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
    cts.CancelAfter(TimeSpan.FromSeconds(30));
    
    var response = await client.GetAsync(url, cts.Token);
    return await response.Content.ReadAsStringAsync(cts.Token);
}
```

### ConfigureAwait(false)
```csharp
// 库代码必用，避免捕获上下文造成死锁
var result = await SomeMethodAsync().ConfigureAwait(false);
```

**适用场景**：
- 类库代码 → `ConfigureAwait(false)`
- UI 层代码 → 不加（需要回到 UI 线程）

## 常见陷阱

### 1. Fire and Forget（危险！）
```csharp
// ❌ 错误：异常被吞掉，任务异常不可追踪
public void DoWork()
{
    Task.Run(async () => await LongRunningTask());
}

// ✅ 正确：返回 Task，让调用方 await
public Task DoWorkAsync()
{
    return LongRunningTask();
}
```

### 2. Deadlock（死锁）
```csharp
// ❌ 错误：在 UI 线程同步等待异步方法
string result = FetchDataAsync().Result;  // 死锁！

// ✅ 正确：全程异步
string result = await FetchDataAsync();
```

### 3. 多个 await 顺序
```csharp
// 串行（慢）
var r1 = await Task1();
var r2 = await Task2();

// 并行（快）
var t1 = Task1();
var t2 = Task2();
var r1 = await t1;
var r2 = await t2;

// 更简洁
var (r1, r2) = await Task.WhenAll(Task1(), Task2());
```

## 面试高频问题

**Q: `async void` 和 `async Task` 有什么区别？**
- `async void` 不能 await，异常无法捕获，只能用于事件处理器
- `async Task` 可被 await，异常传播给调用方

**Q: `await` 做了什么？**
1. 检查 Task 是否已完成
2. 如果未完成，注册 continuation 并返回
3. 恢复时回到之前的 SynchronizationContext

**Q: 如何处理并发请求限流？**
- `SemaphoreSlim` 控制并发数
- `Parallel.ForEachAsync` + 并发选项
