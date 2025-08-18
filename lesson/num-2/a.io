# 在 VSCode 中绘制流程图

以下是几种常见方式：

1. Mermaid
   - 安装扩展：`vscode-markdown-enhanced` 或使用 VSCode 内置 Mermaid 支持（Insiders 版）。
   - 在 Markdown 中插入代码块：
     ```mermaid
     graph TD
       A[开始] --> B{条件判断}
       B -- 是 --> C[执行操作]
       B -- 否 --> D[结束]
     ```
   - 在 Markdown 预览中查看渲染效果。

2. Draw.io Integration
   - 安装扩展：`hediet.vscode-drawio`。
   - 新建或打开 `.drawio.svg/.drawio.png` 文件，使用可视化界面绘制并保存。

3. PlantUML
   - 安装扩展：`jebbs.plantuml`。
   - 在文件中新建 `.puml` 文件，编写 UML/流程图：
     ```plantuml
     @startuml
     start
     :初始化;
     if (条件?) then (是)
       :执行操作;
     else (否)
       stop
     endif
     @enduml
     ```
   - 右键选择“Preview Current Diagram”查看效果。

4. Graphviz (可选)
   - 安装 Graphviz 二进制和 `EFanZh.vscode-graphviz-preview` 扩展。
   - 使用 `.dot` 文件绘制并预览。

根据需求选择合适方案，即可在 VSCode 中轻松创建流程图。