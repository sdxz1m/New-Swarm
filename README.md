# Swarm Modern CN

现代中文版 Swarm Simulator 风格原型。当前版本先实现小内容量、结构可扩展的 MVP，用于验证资源、单位、升级、数字格式和本地存档。

当前 MVP 的初始资源、单位成本、生产值、升级成本和倍率来自 `../Old_Swarm/tables/src` 的旧版数据，不再使用临时自造数值。

中文术语参考 g1tyx 的《模拟虫群》汉化版：`https://g1tyx.github.io/swarmsim/`。

## 开发

```bash
pnpm install
pnpm dev
```

如果使用仓库内置的本地 Node 运行时：

```bash
./scripts/pnpm.sh install
./scripts/pnpm.sh dev
```

## 验证

```bash
pnpm build
pnpm test
```

使用仓库内置的本地 Node 运行时：

```bash
./scripts/pnpm.sh build
./scripts/pnpm.sh test
```

## 架构

- `src/data`：资源、单位、升级配置。
- `src/game`：tick、公式、购买、存档、数字格式。
- `src/components`：资源面板、单位列表、升级面板、设置弹窗。
- `src/styles`：全局布局和界面样式。

第一阶段保持内容量小，但数据结构按后续迁移旧版内容设计。
