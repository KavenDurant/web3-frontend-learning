# Web3 DApp 学习项目

## 项目概述

这是一个用于学习Web3和区块链开发的DApp项目，基于Next.js构建现代化的去中心化应用程序。项目目标是通过实践学习Solidity智能合约开发、前端web3集成、以及区块链交互的最佳实践。

## 技术栈

- **前端框架**: Next.js 15.4.5 (App Router)
- **UI库**: React 19.1.0
- **样式**: TailwindCSS 4.0
- **语言**: TypeScript 5.x
- **代码规范**: ESLint 9.x
- **开发工具**: Turbopack (内置热重载)

## 开发环境

### 系统要求
- Node.js 20.x 或更高版本
- npm/yarn/pnpm 包管理器
- Git 版本控制

### Web3工具链（推荐安装）
- MetaMask 浏览器扩展
- Hardhat 开发框架
- Ganache 本地区块链
- Remix IDE（在线Solidity编辑器）

## 常用命令

### 基础开发命令
```bash
npm run dev          # 启动开发服务器 (http://localhost:3000)
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 运行ESLint代码检查
```

### Web3相关命令（需要后续集成）
```bash
# 智能合约相关
npx hardhat compile  # 编译智能合约
npx hardhat test     # 运行合约测试
npx hardhat node     # 启动本地区块链节点
npx hardhat deploy   # 部署合约到指定网络
```

## 项目结构

```
my-test-dapp/
├── app/                    # Next.js App Router页面
│   ├── layout.tsx         # 根布局组件
│   ├── page.tsx           # 首页组件
│   └── globals.css        # 全局样式文件
├── lesson/                # 学习资料和笔记
│   ├── num-1/            # Solidity基础学习
│   └── num-2/            # 进阶主题
├── public/               # 静态资源文件
├── contracts/            # 智能合约代码（待创建）
├── lib/                  # 工具库和配置（待创建）
└── components/           # 可复用组件（待创建）
```

## Web3开发指导

### 智能合约集成
- 使用Hardhat作为开发框架
- 合约代码存放在`contracts/`目录
- 部署脚本和配置存放在`scripts/`目录
- ABI文件自动生成到`artifacts/`目录

### 前端Web3集成
- 使用ethers.js或web3.js进行区块链交互
- 钱包连接组件应支持MetaMask、WalletConnect等
- 实现网络切换功能（主网、测试网、本地）
- 处理交易状态和错误情况

### 测试网络配置
- **Sepolia**: 主要以太坊测试网
- **Goerli**: 备用测试网（即将弃用）  
- **Polygon Mumbai**: Polygon测试网
- **本地网络**: Hardhat/Ganache节点

### 安全最佳实践
- 永远不要在客户端存储私钥
- 验证所有用户输入和交易参数
- 实现适当的错误处理和用户反馈
- 使用成熟的库而非自实现加密功能
- 定期更新依赖包以修复安全漏洞

## 学习资源

### 在线资源
- [Remix IDE](https://remix.ethereum.org/) - Solidity在线开发环境
- [Hardhat文档](https://hardhat.org/docs) - 开发框架指南
- [OpenZeppelin](https://openzeppelin.com/) - 安全合约库
- [Etherscan](https://etherscan.io/) - 区块链浏览器

### 本地学习笔记
- `lesson/num-1/`: Solidity基础语法和概念
- `lesson/num-2/`: 高级主题和项目实践

## AI助手使用指南

### 开发协助
- 请在询问智能合约相关问题时提供具体的业务需求
- 代码审查时重点关注安全性和Gas优化
- 测试用例编写应覆盖边界条件和异常情况

### 安全提醒
- AI助手会优先考虑代码安全性
- 任何涉及资金处理的功能都需要额外审核
- 部署前务必在测试网络充分测试

### 调试支持
- 提供完整的错误信息和交易哈希
- 说明使用的网络环境和工具版本
- 包含相关的合约地址和ABI信息

## 环境配置

### 开发环境变量（.env.local）
```bash
NEXT_PUBLIC_INFURA_PROJECT_ID=your_infura_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
```

### 生产环境注意事项
- 确保所有API密钥都通过环境变量配置
- 启用HTTPS和适当的安全头
- 实施速率限制和输入验证
- 监控Gas价格和交易状态

---

*此项目用于学习目的，请在实际部署时进行充分的安全审计。*