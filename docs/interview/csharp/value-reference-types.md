# C# 值类型与引用类型

## 核心区别

| 特性 | 值类型 | 引用类型 |
|------|--------|---------|
| 存储位置 | 栈（Stack） | 堆（Heap） |
| 赋值行为 | 值拷贝 | 引用拷贝 |
| 默认值 | 0 / false / null | null |
| 常见类型 | int, float, bool, struct, enum | class, interface, array, string, delegate |

## 装箱与拆箱

```csharp
// 装箱：值类型 → 引用类型（堆分配）
object obj = 42;           // int → object

// 拆箱：引用类型 → 值类型
int num = (int)obj;         // object → int
```

**性能影响**：频繁装箱会产生 GC 压力，在泛型集合中避免 `IList<object>`。

## struct 注意事项

```csharp
public struct Point
{
    public int X { get; set; }
    public int Y { get; set; }
}

// struct 赋值是值拷贝，修改不影响原对象
Point p1 = new Point { X = 1, Y = 2 };
Point p2 = p1;
p2.X = 10;
// p1.X 仍是 1
```

## 字符串的特殊性

```csharp
string s1 = "hello";
string s2 = "hello";
// s1 == s2 为 true（字符串驻留池）

s1 = s1 + " world";
// 此时 s1 指向新对象，s2 不受影响（字符串不可变性）
```

## 面试要点

- **问**：什么时候用 struct，什么时候用 class？
  - 答：数据结构小、不可变、值语义时用 struct；需要继承、多态、状态变化时用 class
- **问**：ref struct 是什么？
  - 答：`.NET 7+`，分配在栈上，不能装箱，不能传递给 async 方法，如 `Span<T>`
