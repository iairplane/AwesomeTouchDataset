# 从 N0 看触觉基础模型

图谱已跑完指定递归，含 923 个节点、2,947 条引用。有 20 篇的参考文献由出版方限制，API 未提供。另有 1 篇的参考文献字段为 null，API 未说明原因。证据表收录已关联到图谱的 45 篇触觉核心论文，共 327 条全文记录。

## 对采集决策的影响

现有证据支持先做**有触觉和无触觉的同片段对照**，并把机器人验证集中在接触决定成败的任务。FACT 在同一批真人示教中开关力监督，LingBot‑Touch 在同一个下游策略上扩大触觉预训练量，Spark‑0 则保持 RGB 和预训练计算量相同。它们的指标、数据来源和任务覆盖各异，现有结果支持继续验证千小时级收益，百万小时的边际收益仍待测量。[FACT 图 7](https://arxiv.org/html/2610.19155#S5.SS3) · [LingBot‑Touch §5.4，图 13](https://arxiv.org/pdf/2611.12806) · [Spark‑0 §6.3，表 4](https://arxiv.org/pdf/2610.22342)

- **多大规模。** 建议把 **100、1,000、5,000 小时**作为实验预算点，先从同一语料分层抽样，固定视觉样本、下游机器人示教和评测协议。分别跑固定计算与固定训练轮数，记录去重后时长、触觉有效率及每类任务的示教量。三个点用于尽早区分有无触觉、同域加量与跨源多样性带来的变化。[Spark‑0 表 4](https://arxiv.org/pdf/2610.22342) · [LingBot‑Touch 图 13](https://arxiv.org/pdf/2611.12806) · [AnyTouch 表 1](https://arxiv.org/html/2502.12191#S5.SS2)
- **采什么。** 优先做插拔与窄容差装配、拧盖与开抽屉、薄片与柔软物体、力敏操作与材料分辨。每类都留不同物体、操作者、地点及恢复动作，另设普通拾放作为对照。T‑Rex 的等时长实验支持用多种原语与物体的组合训练，再到完整任务验证。[T‑Rex §5.3，图 6](https://arxiv.org/html/2606.17055v2#S5.F6) · [LingBot‑Touch §5.2，表 2](https://arxiv.org/pdf/2611.12806) · [VTAM §5.2，表 2](https://arxiv.org/html/2603.23481v2#S5.T2)
- **怎么采。** 真人主库用头戴相机、两腕近景和可标定触觉手套，先保留高质量手姿与硬件时间戳。为同一接触任务补一组手持夹爪和一组目标机器人示教。上游保存逐流时间戳、传感器布局、单位、标定和缺测标记，下游再按任务配对。同一接触定义可以共享，夹爪开合、人体手姿、机器人关节分别有自己的动作接口。[TouchScale §3、§7](https://arxiv.org/html/2610.10288#S3) · [Spark‑0 §3.2](https://arxiv.org/pdf/2610.22342) · [Tacinf §3.3、§4.8](https://arxiv.org/html/2611.29240#S4.SS8)
- **用什么模型。** 先做等预算视觉 VLA、同骨干加入当前触觉的 VTLA、同一 VTLA 加预测未来触觉或力的中训练。若部署需要预测接触或快速纠偏，再在世界–动作模型和分频控制上比较。分开记录训练时使用的触觉、推理时可用的触觉、控制器是否执行力目标。[N0 表 3](https://arxiv.org/html/2608.29601#S6.T3) · [N0‑TWAM](https://arxiv.org/html/2607.23783) · [T‑Rex §4.2](https://arxiv.org/html/2606.17055v2#S4.SS2) · [Tacinf §4.3](https://arxiv.org/html/2611.29240#S4.SS3)

## 领域继承关系

以下是作者论文和项目中可追溯的技术或数据继承。引用方向可在[交互图谱](viz.html)中查看。

### ≤2017｜把指尖接触变成可读的信号

- **Johansson 与 Flanagan（2009）**梳理手指如何用触觉事件调整抓取与操作，为接触开始、滑移和用力控制提供问题定义。[原文](https://www.cns.nyu.edu/~david/courses/sm12/Readings/Johansson_Flanagan%20nrn2009.pdf)
- **Johnson 与 Adelson（2009）**以 retrographic sensing 把软材料接触形变转成光学图像。**Li 等（2014）**将 GelSight 用于抓持零件定位和插装。**Yuan 等（2017）**进一步系统化表面几何、法向力与剪切观测。后来的 GelSlim 和 DIGIT 延续内置相机和凝胶这一感测路径。[MIT GelSight 原始发表列表](https://people.csail.mit.edu/kimo/gelsight/) · [插装论文](https://www.ccs.neu.edu/home/atp/publications/gelsightinsertion_iros2014.pdf) · [GelSight 2017](https://doi.org/10.3390/s17122762)

### 2018–21｜紧凑传感器、闭环抓取和仿真

- **GelSlim（2018）**沿 GelSight 路线做紧凑稳健夹指。**More Than a Feeling（2018）**用双 GelSight 和视觉在抓取后预测重抓动作，使触觉进入闭环执行。[GelSlim](https://arxiv.org/abs/1803.00628) · [More Than a Feeling](https://arxiv.org/html/1805.11085)
- **DIGIT（2020）**把相机式触觉推进到机器人手内操作。**TACTO（2020，后刊发）**将这一类观测做成仿真接口。**GelSlim 3.0（2021）**在同传感结构中整合形状、力和滑移估计。[DIGIT](https://arxiv.org/html/2005.14679) · [TACTO](https://arxiv.org/abs/2012.08456) · [GelSlim 3.0](https://arxiv.org/abs/2103.12269)

### 2022–24｜人类视触觉、可移植示教和预训练编码器

- **Touch and Go（2022）**把 GelSight 探触和人类近第一视角带到户内外物体。它的原始数据随后进入 **UniTouch（2024）**的跨模态对齐和 **Sparsh（2024）**的自监督预训练。UniTouch 将触觉连到已有视觉语言空间，Sparsh 提出的 TacBench 覆盖感知与规划。[Touch and Go §3](https://arxiv.org/html/2211.12498#S3) · [UniTouch 表 1](https://arxiv.org/html/2401.18084#S4) · [Sparsh §3–4](https://arxiv.org/html/2410.24090#S3)
- **T3（2024）**把不同触觉传感器的输入接到共享 Transformer，后续 FTP‑1 复用 T3 图像触觉骨干。**UMI（2024）**提供可直接迁移的手持视觉与动作接口，后来 exUMI 和其他视触觉手持装置继承这种形式。[T3 §4](https://arxiv.org/html/2406.13640#S4) · [FTP‑1 方法](https://arxiv.org/html/2606.13102) · [UMI §III](https://arxiv.org/html/2402.10329#S3)

### 2025｜扩大感测来源，补全手部动作和预测监督

- **AnyTouch**使用触觉图像、视频和跨传感配对，延续 Touch and Go 的真实探触语料。**Sparsh‑X**将 Sparsh 路线扩展到 Digit 360 的图像、音频、惯性和压力。两种研究都显示，表征提升和端到端策略收益需要分别测量。[AnyTouch §3–5](https://arxiv.org/html/2502.12191#S3) · [Sparsh‑X §3–4](https://arxiv.org/html/2506.14754#S4)
- **exUMI**通过手持夹爪采集未来触觉预测所需的动作与接触三元组，N0 论文把它列作手持采集先例。**ViTaMIn‑B**扩展到双手夹爪和传感器替换。**OpenTouch**转向真人头戴与全手触觉，另采同步手姿。[exUMI](https://arxiv.org/html/2509.14688) · [N0 §2.1](https://arxiv.org/html/2608.29601#S2.SS1) · [ViTaMIn‑B](https://arxiv.org/html/2511.05858) · [OpenTouch](https://arxiv.org/html/2512.16842)

### 2026｜数据扩大之后，策略接口、世界模型和迁移成为瓶颈

- **N0 系列**将视触觉夹爪和机器人示教汇入 NeoData。Foundation 提出力场及 NeoForce，VTLA 将当前和未来触觉表示用于动作，TWAM 联合建模观察、动作及未来接触。[Foundation](https://arxiv.org/html/2608.29601) · [VTLA](https://arxiv.org/html/2607.23782) · [TWAM](https://arxiv.org/html/2607.23783)
- **FTP‑1**沿共享编码器路线，用统一触觉接口接入不同本体的策略。**TouchScale**加大真人全手压力与人戴视角的规模，并把这类数据用于 N0‑VTLA 的中训练。[FTP‑1](https://arxiv.org/html/2606.13102v4) · [TouchScale §4.3](https://arxiv.org/html/2610.10288#S4.SS3)
- **FACT / EgoForce**以定量人手指尖力和 T‑Rex 机器人触觉协同训练，直接比较人类力监督的作用。**LingBot‑Touch**则把真人手套和机器人指尖设成共享的接触预训练语料，验证冻结表示在多种策略和两种机器人手上的效果。[FACT §IV–V](https://arxiv.org/html/2610.19155#S5) · [LingBot‑Touch §3、§5](https://arxiv.org/pdf/2611.12806)

## 数据量、设备、任务和方法

论文训练语料和可下载数据分别标注。图像、接触样本、轨迹、实际录制小时和训练采样权重使用各自的口径。

| 工作 | 数据口径 | 采集设备或视角 | 代表任务 | 方法 |
| --- | --- | --- | --- | --- |
| N0-Foundation / VTLA / TWAM | NeoData 论文 >30,000 h、450+ 任务、6 本体，手持占 57% 轨迹。OpenNeoData 申请版 5,000+ h / 20 万+ 段 | 夹爪双光学触觉、腕端鱼眼，固定臂版另有第三视角 | 插装、开合、盖瓶、擦拭、折叠 | 力场表示，VTLA 动作专家或世界–动作模型。[全量组成](https://arxiv.org/html/2608.29601#S4.F4) · [发布数据卡](https://huggingface.co/datasets/NeoteAIEmbodied/OpenNeoData) |
| EgoScale | 20,854 h 人第一视角 RGB 主语料，另有人机对齐中训练 | 头戴与补充腕视角，人手运动主要估计，中训练加跟踪 | 五类桌面灵巧任务及目标平台迁移 | 视觉与动作规模对照，独立于触觉归因。[数据与训练](https://arxiv.org/html/2602.16710#S2) |
| TouchScale | 论文 500 h，约 87,000 段。申请版 100 h、15,324 段 | 头戴 RGB-D＋双腕，Tachin 每手 880 触点 | 取放、开合、插接、软硬分拣、转移试管、擦板 | 视觉触觉预测、真人视触觉中训练、机器人后训练。[采集](https://arxiv.org/html/2610.10288#S3) · [发布](https://huggingface.co/datasets/2077AIDataFoundation/TouchScale) |
| Spark‑0 / HumanTouch | 参训 1,000 h 真人触觉。公开归档版本另计 | 头戴＋双腕，柔性压力与电磁手姿，同手套也用于机器人 | 精密插接、折叠及双手灵巧操作 | 几何监督与触觉条件化 VLA。[论文 §3.2、表 4](https://arxiv.org/pdf/2610.22342) |
| FACT / EgoForce | 约 2,000 h 真人与 100 h T‑Rex 为论文预训练配方。此前实核 EgoForce 可下载配对约 735.61 h | 头戴双目＋双腕、压阻手套、标定指尖法向力，目标为双臂 Wave | 移液、开试管帽、调旋钮、细物操作 | 预训练轨迹与力，部署联合修正力和动作。[数据与训练](https://arxiv.org/html/2610.19155#S3) · [公开数据卡](https://huggingface.co/datasets/zhicao/EgoForce) |
| FTP‑1 | 约 3,000 h、26 个来源、21 种传感器 | 真人手套、灵巧手和夹爪机器人，图像／阵列／状态三类 | UniVTAC、插环、插 USB、擦板 | 形态感知触觉接口＋共享专家，目标端适配。[数据与实验](https://arxiv.org/html/2606.13102v4#S4) |
| T‑Rex | 22,889 h 人类视频预训练、100 h 真机触觉中训练。可下载机器人部分 50.68 h | Dexmate Vega‑1、双 Sharpa Wave、机器人头与腕视角 | 翻页、分杯、抽卡、开锁、工具与精细操作 | 低频视觉规划＋高频触觉反馈。[论文](https://arxiv.org/html/2606.17055v2) · [数据卡](https://huggingface.co/datasets/zekaiwang/trex_dataset) |
| exUMI | 约 5 h 探触组合用于论文 TPP。可下载任务包此前实核 1,660 段、约 3.32 h | 双 9DTact 类视触觉、夹爪腕 GoPro、Quest 位姿 | 配重抽屉、插块、瓶盖、软物 | 动作条件触觉预测，冻结后接入策略。[§4.2、表 3](https://arxiv.org/html/2509.14688) · [下载](https://huggingface.co/datasets/silicx/exUMI) |
| UVTA | 论文 5,000 人示教＋750 机器人示教，五任务 | 真人腕镜＋外骨骼压阻；机器人 Sharpa North＋Wave | 翻页、拧灯泡、拨开关、压球、移液 | 人机统一动作和触觉，辅助预测未来触觉。[论文与图 5](https://arxiv.org/html/2609.34182v2) |
| LingBot‑Touch | 4,983 h、464,431 段、24 类，约 2/3 真人手套 | Juqiao、Xspark、TACHIN 压阻，PaXini 磁；机器人 Wave 光学 | 精细操作、触觉分辨、易碎品、双手协调 | 传感器局部坐标＋Tactile‑JEPA，冻结 token 接入策略。[§3、§5、表 4](https://arxiv.org/pdf/2611.12806) |
| VTAM | 以公开视频模型起步，真实薯片、黄瓜、擦板每项分别用 100、61、105 段任务示教 | xArm6／GelSight Mini，另测 Flexiv／Xense Photon | 薯片、削皮、擦板、环件插装 | 任务视触觉预测和动作流匹配，光流形变代理。[v2 §4–5](https://arxiv.org/html/2603.23481v2) |
| OpenViTac | 每种配置 1,300 仿真段、2,400 真机示教 | 主相机＋腕视角，GelSight、Xense、Neote，Franka Hand 或 Robotiq | 辨粗糙度、抓薯片、插 USB、齿轮装配 | π0.5 拼接 AnyTouch2 token，按任务配齐本体、坐标和控制频率后混训。[§3、附录 B.3 表 S2](https://arxiv.org/html/2610.10384v1#A2.T2) |
| TacMind | 约 42 小时、300 万帧异构语料；基准 28 标准任务，另有 100 扩展任务 | 仿真 GelSight Mini／DM-Tac，RealMan-ISF＋DM-Tac W 真机验证 | 精密插入、遮挡辨物、移动目标装配 | 动作条件预测未来触觉潜变量、复用流式表征，各来源保留自己的动作语义。[§4、附录 B](https://arxiv.org/html/2611.00455v1#A2) |
| TaF‑Foundation | 一亿以上触觉–力矩样本、24 传感器、4 大类，台架时长未核实 | 台架参考力矩计及多种触觉机构 | 接触力、跨传感检索、插装与操作 | 六维力矩共同监督与共享触觉编码，接策略。[§3–5](https://arxiv.org/html/2611.20718#S3) |

## H1｜真人第一视角加触觉，以及 scaling

**支持。** FACT 图 7 在人手数据从 100 到 2,000 小时的各档保持机器人来源，加入真人指尖力后验证 MSE 相对低 10%–14%。100 小时从 0.047 降到 0.042，2,000 小时从 0.036 降到 0.031。表 II 的试管帽和移液在去掉真人力后分别由 80% 降到 0%、40% 降到 20%，多物抓取维持 40%。Spark‑0 表 4 固定 RGB 和计算，真人触觉为 0／100／1,000 小时时，SparkArena‑Real 为 44%／40%／52%，Ego Humanoid 为 52.45%／59.42%／71.72%。DTWM 同架构用真人压力预测未来视频，域外 LPIPS 0.4882→0.4774，回答的是生成误差。[FACT 图 7、表 II](https://arxiv.org/html/2610.19155#S5.SS3) · [Spark‑0 表 4](https://arxiv.org/pdf/2610.22342) · [DTWM 表 1](https://arxiv.org/html/2609.34286#S4.SS2)

**反方与边界。** EgoScale 纯视觉和动作从 1,000 到 20,000 小时，任务完成度从 0.30 到 0.71，单独的第一视角也会随规模有效。Spark‑0 的 100 小时在两条 SparkArena 线上弱于纯视觉，在 Ego Humanoid 线上已经提升。N0 的固定 π0.5 NeoReal 对照是 26.5% 无触觉、27.5% 图像拼接、30.0% 触觉进动作专家、32.5% NeoForce 进动作专家，接入方式会改变收益。[EgoScale §3.3](https://arxiv.org/html/2602.16710#S3) · [Spark‑0 表 4](https://arxiv.org/pdf/2610.22342) · [N0 表 3](https://arxiv.org/html/2608.29601#S6.T3)

**千小时级的另一条曲线。** LingBot‑Touch 在同一套 LingBot‑VLA 和后训练预算下，纯视觉为 55.9%，触觉预训练量从一千到五千小时的五档分别为 69.8%、74.3%、77.4%、81.4%、82.2%。评测是五项 Sharpa Wave 真机任务，每项用 200 段后训练、20 次评测。预训练混有真人手套和机器人触觉，各来源的独立斜率仍需单测。[LingBot‑Touch §5.4，图 13](https://arxiv.org/pdf/2611.12806)

**空白。** TouchScale 将真人视触觉中训练加入固定机器人后训练，四任务从 22.5% 到 57.5%，缺少等量真人 RGB 中训练对照。N0‑TWAM UniVTAC 的 84.5%→65.4% 是把预训练数据从全量降到 20%，没有单独识别触觉斜率。需要在同数据分布、同计算、同测试平台上为有无触觉各跑一条曲线，并分别检验接触任务与纯视觉任务。[TouchScale 表 4、图 6](https://arxiv.org/html/2610.10288#S4.SS3) · [N0‑TWAM 表 7](https://arxiv.org/html/2607.23783)

## H2｜跨传感器和跨本体

**支持。** FTP‑1 未见传感器三任务平均 46.6%，纯视觉 π0.5 与未触觉预训练的同架构基线均 15.0%。新目标传感器学了编码器，目标任务用了 100／100／50 条示教，每任务 20 次真机实验。其独立 Dexmate 迁移让机器人本体未见、Sharpa Wave 已见，在翻书和擦碟上为 85%／60%，相对 π0.5 为 65%／30%，同样使用目标示教。LingBot‑Touch 在预训练未见的磁传感 XHand1，LingBot‑VLA 六任务均值 57.21%→75.04%，触觉编码器冻结，策略仍按目标任务训练。Spark‑0 的人形评测在固定配方下由 52.45% 提至 71.72%，对应训练有触觉、部署可只用视觉的另一条迁移路径。[FTP‑1 §4.1–4.2，表 3](https://arxiv.org/html/2606.13102v4#S4) · [LingBot‑Touch §5，表 2](https://arxiv.org/pdf/2611.12806) · [Spark‑0 表 4](https://arxiv.org/pdf/2610.22342)

**反方与边界。** T3 零样本转新传感器时，物体分类仍接近随机，姿态估计有收益，给少量目标标签后结果改善。统一 Diffusion Policy 对照中，四项真机任务的触觉 ResNet 54.2%，Sparsh DINOv2 67.4%，AnyTouch 47.9%，T3 48.6%。UVTA 只用人手训练在目标平台得零分，加入机器人可执行示教后明显提升。每个模型都有适用的传感信号、任务和适配方式。[T3 §5.2](https://arxiv.org/html/2406.13640#S5.SS2) · [统一对照 §IV-B，表 I](https://arxiv.org/html/2611.00957#S4) · [UVTA 表 I](https://arxiv.org/html/2609.34182v2#S5)

**空白。** 分开留出传感器、机器人本体、物体和任务，采用同一个冻结编码器和相同目标示教预算，分别检验零样本、少样本和正常后训练。像 Spark‑0 使用同一硬件族的人机触觉、FTP‑1 扩展感测接口、LingBot 统一局部坐标，它们验证的是不同级别的迁移。跨设备的绝对力监督可另做独立参考力矩台架。[Spark‑0 §3](https://arxiv.org/pdf/2610.22342) · [FTP‑1 附录](https://arxiv.org/html/2606.13102v4) · [TaF‑Foundation §3–4](https://arxiv.org/html/2611.20718#S3)

**对齐方式本身有对照。** 3D‑ViTac 在同一套双臂设备、三机位和训练条件下，把触点和 RGB-D 点云放进同一三维坐标。相较于把触觉图像作为独立分支，蒸蛋、抓葡萄和夹六角匙分别从 70% 到 85%、65% 到 80%、50% 到 90%，每任务每组 20 次。DexUMI 用相同腕相机位姿和触觉配置对齐外骨骼与目标手，取盐有无触觉为 75% 对 15%，开蛋盒为 85% 对 90%。这两项结果分别支持空间对齐和任务分层评估。[3D‑ViTac 表 1](https://arxiv.org/html/2410.24091v2#S5.T1) · [DexUMI 表 1](https://arxiv.org/html/2505.21864v3#S5.T1)

## H3｜减少昂贵配对数据和目标端示教

**支持。** VTAM 从视频模型起步，用 100 条薯片任务示教训练，真实抓放 90%（18/20），纯视觉 π0.5 10%（2/20）。它在任务训练阶段仍使用触觉，两者的架构也不同。exUMI 用约 5 小时探触数据学动作条件的未来触觉，随机配重抽屉的纯视觉、常规触觉和预测触觉分别是 40%、50%、95%。T‑Rex 同为 100 小时的中训练比较表明，覆盖较多原语和物体组合有助于新技能。Tacinf 以同一夹爪和动作接口混合三个来源，位置和物体都随机的真机均值从仅遥操 20% 到混合 60%，数据量与覆盖同时变化。[VTAM v2 表 2](https://arxiv.org/html/2603.23481v2#S5.T2) · [exUMI 表 3](https://arxiv.org/html/2509.14688) · [T‑Rex 图 6](https://arxiv.org/html/2606.17055v2#S5) · [Tacinf §4.8](https://arxiv.org/html/2611.29240#S4.SS8)

**反方与边界。** 大预训练并不排斥更有效的任务中训练。FTP‑1 同架构取消触觉预训练后，UniVTAC 六任务 66.7%→50.0%；VTAM 移除任务内的触觉世界建模，八任务 83.4%→65.8%，其中插孔反而变好。端到端统一对照中，任务触觉中训练由 51.2% 到 54.8%，有任务下降。AnyTouch 混多传感来源提高一些域外结果，已见 Touch and Go 材料识别下降。[FTP‑1 §4.3](https://arxiv.org/html/2606.13102v4#S4) · [VTAM 表 6](https://arxiv.org/html/2603.23481v2) · [统一对照图 5](https://arxiv.org/html/2611.00957#S4) · [AnyTouch 表 1](https://arxiv.org/html/2502.12191#S5.SS2)

**同一批探索数据可以有不同用途。** ForceWAM 固定任务示教与训练步数，从每任务 0 段增至 200 段非任务探索后，滑动成功率 40%→85%，每条件 20 次。把同一批探索直接并入两个端到端基线，两者下降。该实验使用末端六轴力／力矩，提示我们可用廉价探触数据学接触响应，再用任务示教学习行事目标。[ForceWAM §4.3](https://arxiv.org/html/2610.18852v1#S4.SS3)

**降低真机采集负担的三条路线。** OpenViTac 每项固定 100 条真机示教和优化预算，加入 500 条仿真后，OpenVTLA 插 USB 从 4/20 提至 8/20，齿轮装配从 10/20 提至 12/20。SimpleTouch 用 20 条示教，放瓶和插孔分别为 38% 和 57%，FTP-π0.5 用 50 条分别为 19% 和 47%，两者均使用触觉和 T3 编码器。TacPAC 固定数据和骨干，真机五任务均值从纯视觉 22%，到只做触觉预测 37%，到实时修正可以读取预测缓存的 64%，每任务每组 20 次。[OpenViTac 表 5](https://arxiv.org/html/2610.10384v1#S4.T5) · [SimpleTouch 图 6](https://arxiv.org/html/2610.02784v1#S4.SS4.fig1) · [TacPAC 表 1](https://arxiv.org/html/2609.05266v1#S4.T1)

**空白。** 用同一个下游模型分别比较任务示范、无任务探触、仿真和动作原语轨迹。各配方同时记录采集人时、传感器维护／标定、样本通过率及达到目标成功率需要的机器人示教数。保留简单的直接输入和窄任务微调基线，才能判断预测模块值不值得其训练与推理开销。[VTAM §5.6](https://arxiv.org/html/2603.23481v2#S5) · [Tacinf §4.8](https://arxiv.org/html/2611.29240#S4.SS8)

## 2026 年 8 月以后出现的工作

按 arXiv 首发日期登记。完整图形成后按 arXiv ID 或论文标题匹配，余下条目为图谱之外的近期候选。

| 日期 | 工作 | 与当前图的关系 | 为何跟进 |
| --- | --- | --- | --- |
| 2026-11-23 | [Innata-0: A Native Embodied World System with Model-Agent Co-Design](https://arxiv.org/abs/2611.30254) | 不在完整图中 | 用人手解剖覆盖与可测性掩码统一多种触觉。本体对齐方案可比较。 |
| 2026-11-09 | [Learning Heterogeneous Tactile Representation for General Dexterous Manipulation](https://arxiv.org/abs/2611.12806) | 不在完整图中 | 即 LingBot-Touch。报告真人手套＋机器人光学触觉的规模曲线与未见 XHand1 实验。 |
| 2026-10-31 | [Evaluating Tactile Foundation Models for End-to-End Imitation Learning in Contact-Rich Manipulation](https://arxiv.org/abs/2611.00957) | 不在完整图中 | 统一真机对照。多个触觉预训练编码器未超过从零训练的触觉 ResNet。 |
| 2026-10-19 | [Ropedia W0: Scaling Loco-Manipulation World Models across Embodiments with Human Experience](https://arxiv.org/abs/2610.26855) | 不在完整图中 | 人手纯视觉与机器人运动世界模型的对照支线，不能把训练语料全计为触觉。 |

## 图谱口径

- 从七篇种子向后遍历三层参考文献，向前遍历两层施引文献。每次扩展通过主题词筛选，并按年均引用率保留最多 15 条。2026 年论文没有最低引用门槛。
- 20 篇论文的参考文献因出版方限制缺失，另有 1 篇的参考文献字段为空。
- [在线交互引用图谱](viz.html)可按年份、主题与论文查看引用关系。[全文证据 CSV](evidence.csv)保留实验口径、原文链接与章节位置。
- 引用元数据由 [Semantic Scholar](https://www.semanticscholar.org/?utm_source=api) 提供。参见 [The Semantic Scholar Open Data Platform](https://arxiv.org/abs/2301.10140)。
