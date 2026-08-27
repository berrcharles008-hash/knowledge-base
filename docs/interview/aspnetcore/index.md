# ASP.NET Core

## 中间件

### 工作原理

中间件是按顺序执行的管道组件，每个中间件可以：
- 处理请求
- 调用下一个中间件
- 返回响应或短路管道

### 常用中间件

1. **Authentication**：认证
2. **Authorization**：授权
3. **Routing**：路由
4. **StaticFiles**：静态文件
5. **Endpoints**：端点处理

### 面试要点

1. **自定义中间件**：实现 Invoke 方法或使用中间件类
2. **中间件顺序**：执行顺序很重要
3. **短路与继续**：使用 `await next()` 继续管道

## 依赖注入

### 服务生命周期

- **Transient**：每次请求创建新实例
- **Scoped**：每次请求创建一个新的作用域实例
- **Singleton**：整个应用生命周期只有一个实例

### 面试要点

1. **DI 容器**：IServiceProvider
2. **服务注册**：AddTransient, AddScoped, AddSingleton
3. **循环依赖**：避免，使用工厂或服务定位器
