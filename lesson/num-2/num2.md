### 1

## Solidity 的数据类型大致可分为「值类型」和「引用类型」，再加上一些用户自定义和合约类型

# 值类型（Value Types）

 -- 布尔：bool
 -- 整数：uint8…uint256（步长 8），int8…int256
 -- 地址：address，可转账地址 address payable
 -- 定长字节数组：bytes1…bytes32
 -- 函数类型：function(...) internal returns(...) / function(...) external returns(...)
 -- 枚举（Enum）：enum Status { Pending, Shipped, ... }
 -- （实验性）定点数：fixedMxN / ufixedMxN

# 引用类型（Reference Types）

 -- 动态数组：T[]
 -- 定长数组：T[k]
 -- 字符串：string（本质上是 bytes 的封装）
 -- 动态字节数组：bytes
 -- 映射：mapping(KeyType => ValueType)
 -- 结构体：struct MyStruct { … }

# 用户自定义类型

 -- 结构体（struct）
 -- 枚举（enum）

# 合约 & 接口类型

 -- 合约本身也是一个类型：MyContract
 -- 接口类型：interface IMy { … }