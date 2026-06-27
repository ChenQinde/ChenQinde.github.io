/* ============================================================
   Lightweight bilingual (EN / 中文) toggle.
   - English lives in the HTML (single source of truth).
   - Chinese translations live in the `zh` dictionary below,
     keyed by each element's data-i18n attribute.
   - Choice is remembered via localStorage ("siteLang").
   To edit a Chinese string, find its key below and change the value.
   ============================================================ */
(function () {
    "use strict";

    var zh = {
        /* ---- shared: nav + brand + footer ---- */
        "brand": "陈<span>钦德</span>",
        "nav.home": "首页",
        "nav.research": "研究",
        "nav.news": "动态",
        "nav.scholar": "学术",
        "footer.copyright": "© 2026 陈钦德 · 中山大学",
        "footer.home": "← 返回首页",

        /* ---- index: hero ---- */
        "idx.role": "博士研究生",
        "idx.affil": '<a href="http://xintelligence.pro/" target="_blank" rel="noopener">黄华威实验室（HuangLab）</a><br />' +
            '<a href="https://sse.sysu.edu.cn/" target="_blank" rel="noopener">软件工程学院</a><br />' +
            '<a href="https://www.sysu.edu.cn/" target="_blank" rel="noopener">中山大学</a>',
        "idx.email": "<b>邮箱：</b> chenqd6@mail2.sysu.edu.cn",
        "idx.btn.email": "✉ 邮件",
        "idx.btn.scholar": "🎓 谷歌学术",
        "idx.btn.research": "📄 研究",

        /* ---- index: sections ---- */
        "idx.h.bio": "个人简介",
        "idx.bio": '陈钦德目前在<a href="https://sse.sysu.edu.cn/">中山大学软件工程学院（软件工程）</a>攻读博士学位，' +
            '导师为<a href="https://sse.sysu.edu.cn/teacher/161"><b>黄华威 教授</b></a>。' +
            '他于 2021 年获得中山大学计算机学院的学士学位，同年进入中山大学软件工程专业攻读硕士，' +
            '师从<a href="https://sse.sysu.edu.cn/teacher/187"><b>张能 教授</b></a>，研究方向为软件工程。' +
            '随后他通过硕博连读项目，于 2023 年开始博士阶段的研究。目前的研究兴趣主要包括' +
            '<b>分片区块链技术</b>与 <b>DeFi 机制设计</b>。',
        "idx.h.interests": "研究兴趣",
        "idx.int.1": "分片区块链",
        "idx.int.2": "DeFi 与机制设计",
        "idx.int.3": "博弈论",
        "idx.int.4": "软件工程",
        "idx.h.edu": "教育经历",
        "idx.edu.phd": '<span class="deg">博士</span> —— 中山大学 &nbsp;<span class="meta">2023.09 – 至今</span><br />导师：黄华威 教授',
        "idx.edu.msc": '<span class="deg">硕士</span>（硕博连读项目）—— 中山大学 &nbsp;<span class="meta">2021.09 – 2023.08</span><br />导师：张能 教授',
        "idx.edu.be": '<span class="deg">学士</span> —— 中山大学 &nbsp;<span class="meta">2017.09 – 2021.06</span>',
        "idx.h.pubs": "学术论文",
        "idx.legend": '<span class="me">下划线</span> = 本人；* = 通讯作者。每篇工作的通俗解读见<a href="./research.html">研究</a>页面。',

        /* ---- research page ---- */
        "res.h1": "研究",
        "res.intro": '我的研究处于<b>分片区块链系统</b>与 <b>DeFi 机制设计</b>的交叉地带：既关注如何通过分片来扩展区块链，' +
            '也关注如何设计经济规则，让维持系统运转的参与者获得公平的回报。以下是每篇论文的通俗解读 —— ' +
            '它解决什么问题、我们做了什么，以及我在其中的角色。',
        "res.h.lead": "第一作者工作",
        "res.h.collab": "合作工作",

        "res.tldr.liquiditypool": '在依赖排名（ranking-dependent）的 DeFi 协议中，参与者的收益取决于其资金余额在所有人中的' +
            '<i>排名</i>，因此大资金方往往持续碾压小资金方，许多小额参与者实际上被挡在门外。我们提出 ' +
            '<b>LiquidityPool</b>，一种资金聚合协议，让参与者把资金汇集起来共同参与，并用博弈论分析由此产生的竞争。',
        "res.role.liquiditypool": "<b>我的角色：</b> 第一作者 —— 问题建模、协议设计与博弈论分析。",

        "res.tldr.broker2earn": '分片把区块链拆成多个并行分片，但跨分片交易很慢，因为它们要在两个分片中分别达成共识。' +
            'Broker（中介）账户可以把跨分片交易转化为快速的分片内交易 —— 前提是有足够多的用户愿意充当 broker。' +
            'Broker2Earn 是一种类 DeFi 的激励机制，通过抵押代币来奖励充当 broker 的用户。',
        "res.role.broker2earn": "<b>我的角色：</b> 第一作者 —— 方案设计、优化建模与实验。",

        "res.tldr.iastmapper": '为了理解源代码在两个版本之间的变化，工具会匹配程序抽象语法树（AST）的节点。' +
            'iASTMapper 基于相似度迭代地计算这些映射，得到比已有方法更准确、更稳定的匹配结果。',
        "res.role.iastmapper": "<b>我的角色：</b> 通讯作者 —— 算法设计与评估。",

        "res.tldr.brokerchain": 'BrokerChain 是我们许多 broker 相关工作的协议基础。它面向基于账户的状态分片，' +
            '采用细粒度的状态划分与账户分段，并通过 broker 账户处理跨分片交易 —— 在各分片间平衡交易负载、' +
            '减少跨分片交易数量（避免出现“热点分片”）。',
        "res.role.brokerchain": "<b>我的角色：</b> 合作作者 —— 参与 broker 账户机制与分析。",

        "res.tldr.blockemulator": '在真实网络上测试分片协议既困难又昂贵。BlockEmulator 是一个开源实验平台，' +
            '让研究者能够在可控、可复现的环境中原型化、运行并测量分片协议（包括跨分片机制）。',
        "res.role.blockemulator": "<b>我的角色：</b> 合作作者 —— 参与设计与实验评估。",

        "res.tldr.shellfusion": 'ShellFusion 是一个网页工具，通过融合多源知识 —— 来自问答帖、Ubuntu 手册页（Manual Pages）' +
            '和 TLDR 教程 —— 为 Shell 编程问题生成相关的命令、脚本和解释。',
        "res.role.shellfusion": "<b>我的角色：</b> 合作作者。",

        "res.tldr.brokerfi": 'BrokerFi 展示了基于 broker 的区块链如何支撑真实的去中心化金融应用，' +
            '把跨分片流动性的思路落地为一个可运行的 DeFi dApp。',
        "res.role.brokerfi": "<b>我的角色：</b> 合作作者。",

        "res.tldr.commag": '一篇综述性文章，概览区块链分片的现状 —— 主要方法、开放挑战，以及该领域的发展方向。',
        "res.role.commag": "<b>我的角色：</b> 合作作者。",

        "res.tldr.blocksys": '一篇综述，围绕影响落地最关键的两个问题 —— 性能与可扩展性 —— 来梳理分片区块链的研究。',
        "res.role.blocksys": "<b>我的角色：</b> 合作作者。",

        /* ---- news page ---- */
        "news.h1": "动态与更新",
        "news.intro": "持续更新的记录 —— 论文、报告与里程碑，最新在前。",
        "news.e.www": '我们的论文 <b>“LiquidityPool: Game-Theoretic Analysis of Stakeholder Revenue in ' +
            'Ranking-Dependent DeFi”</b> 被 <b>The Web Conference（WWW \'26）</b> 录用 🎉。' +
            '摘要见<a href="./research.html">研究</a>页面。',
        "news.e.journals": '<b>BrokerChain</b>（IEEE Transactions on Networking）与 <b>BlockEmulator</b>' +
            '（IEEE Transactions on Services Computing）正式发表 —— 均为 CCF-A 期刊。',
        "news.e.infocom": '我们的论文 <b>“Broker2Earn: Towards Maximizing Broker Revenue and System Liquidity ' +
            'for Sharded Blockchains”</b> 被 <b>IEEE INFOCOM \'24</b> 录用 🎉。' +
            '摘要见<a href="./research.html">研究</a>页面。',
        "news.e.phd": '<b>iASTMapper</b>（ASE \'23）被录用；通过硕博连读项目，开始跟随黄华威教授攻读博士。',
        "news.e.be": '获得中山大学计算机学院学士学位，并开始软件工程方向的研究生学习。'
    };

    var enCache = new Map();
    var inited = false;

    function init() {
        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            enCache.set(el, el.innerHTML);
        });
        inited = true;
    }

    function apply(lang) {
        if (!inited) init();
        document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var key = el.getAttribute("data-i18n");
            if (lang === "zh" && zh[key] != null) {
                el.innerHTML = zh[key];
            } else {
                el.innerHTML = enCache.get(el);
            }
        });
        document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
            btn.textContent = lang === "zh" ? "EN" : "中文";
            btn.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换为中文");
        });
        try { localStorage.setItem("siteLang", lang); } catch (e) { }
    }

    function current() {
        try { return localStorage.getItem("siteLang") || "en"; } catch (e) { return "en"; }
    }

    function ready(fn) {
        if (document.readyState !== "loading") { fn(); }
        else { document.addEventListener("DOMContentLoaded", fn); }
    }

    ready(function () {
        apply(current());
        document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                apply(current() === "zh" ? "en" : "zh");
            });
        });
    });
})();
