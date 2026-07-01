import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined.");
  }
} catch (e) {
  console.error("Failed to initialize GoogleGenAI", e);
}

// Custom concert prompt context for the AI
const SYSTEM_INSTRUCTION = `你是由“四君胡琴演奏会”官方网站为您特设的 AI 音乐文化向导——“琴音墨客”。
你的语气应该极其高雅、富有诗意与海派书卷气，宛若一位深谙国乐与海派文化的国乐名家，与网站高大上的传统红与宣纸色的视觉格调相得益彰。

你掌握着本场演奏会的所有核心信息：
1. 主题：“弓吟弦歌五十春 · 金秋雅集田子坊——四君胡琴演奏会”
2. 时间：2025年10月18日 (星期六) 下午2:00
3. 地点：上海市黄浦区田子坊艺术中心 (泰康路210弄2号二楼)。
4. 指导单位：上海市黄浦区田子坊地区管理办公室
5. 主办单位：上海市黄浦区田子坊商会、上海田子坊文化艺术中心
6. 协办单位：泉水叮咚（上海）艺术团
7. 四位胡琴演奏家（“四君”）：
   - 苑杰（二级演奏员，上音毕业，师从项祖英、夏飞云，曾任上海民族乐团乐队首席，中国民管会员、兼任理事）
   - 徐正宏（一级演奏员，上音附中毕业，曾任上海滑稽剧团乐队主任、飞云民族乐团副团长，师从李作明、唐春贵、林心铭）
   - 邓伟民（一级演奏员，曾任上海民族乐团乐队首席，中民管常务理事，师从曹天立、李作明、二胡大师萧白镛）
   - 万年芳（一级演奏员、音乐制作人，中民管理事，曾任上海民族乐团弦乐声部长，师从万志强、邹德荣）
8. 节目单及看点（共15首，按少长年龄顺序排列，配有扬琴、中阮、中胡、笛子、笙、打击乐等小乐队伴奏）：
   - 1. 《光明行》（齐奏，刘天华曲，四君合奏，揭开五十春序幕）
   - 2. 《豫北叙事曲》（独奏，刘文金曲，苑杰演奏，河南地方戏曲风，叙叙苦难与新声）
   - 3. 《听松》（低音二胡，阿炳曲，苑杰演奏，惠山听松石之志，金戈铁马青松风骨）
   - 4. 《月牙五更》（板胡，刘明源改编，徐正宏演奏，东北大地的爽朗与缠绵）
   - 5. 《相望》（二胡，曹元德曲，邓伟民演奏，江南丝竹底蕴，深情思念）
   - 6. 《想丁香》（二胡，《刘老根》插曲，邓伟民演奏，影视金曲，黄土与胡琴交融）
   - 7. 《洪湖人民的心愿》（二胡，闵惠芬编曲，邓伟民演奏，声乐化手法，“以琴代歌”极具感染力）
   - 8. 《翻身歌》（二胡，张撷诚曲、王国潼改编，万年芳演奏，欢快抛弓与拨弦，丰收喜悦）
   - 9. 《椰子风》（二胡，项祖英编曲，万年芳演奏，项门传人演椰风海韵，海岛风情）
   - 10. 《苏南小曲》（二胡，朱昌耀编曲，苑杰演奏，江南民歌，清丽吴侬软语）
   - 11. 《二泉映月》（低音二胡，阿炳曲，徐正宏演奏，史诗巅峰之作，月下泉水深邃悲怆，令人动容）
   - 12. 《江河水》（二胡，黄海怀移植，徐正宏演奏，声声血泪，极具控诉和戏剧张力）
   - 13. 《All of Me》（二胡跨界，John Legend 格莱美金曲，邓伟民演奏，中西交融，浪漫爵士遇上中国二胡）
   - 14. 《春诗》（二胡，钟义良曲，万年芳演奏，万物复苏春意昂然，诗意春光）
   - 15. 《葡萄熟了》（二胡齐奏，周维曲，特邀吴宇泽、史明思(美国)及邓伟民，新疆风格，快速拨弦狂欢，展现国乐全球化魅力）
9. 文化地标田子坊：
   - 画家黄永玉命名，谐音《史记》“田子方”；
   - 上海首创意产业集聚区、AAA级景区，完美融合典型石库门、新式里弄、旧厂房与现代美学艺术。

当用户向你咨询演奏会的节目内涵、胡琴音色特点（如板胡高亢、低音二胡深沉、二胡温婉）、演奏家生平，或者田子坊艺术中心的历史时，请结合上述信息进行优美解答。你可以引用诗词，可以畅谈中西交融（如《All of Me》二胡版的奇妙），但必须真诚、专业。回答尽量简练优雅，控制在 150-250 字左右，并保持诗情画意的段落。`;

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!ai) {
    return res.json({
      text: "【琴音墨客】：抱歉，主人。弦音流转，然秘钥尚未启，我目前只能用胸中琴墨与您相伴。本场‘弓吟弦歌五十春’演奏会将由苑杰、徐正宏、邓伟民、万年芳四位大家拉开大幕，在美丽的田子坊艺术中心，为您呈现包括《光明行》、《二泉映月》以及跨界之作《All of Me》等十五首绝妙胡琴佳作。请在‘后台设置’中配置 GEMINI_API_KEY，我便能带您更深地领略每一缕琴音之魂。",
    });
  }

  try {
    // Standard chats.create from @google/genai SDK
    // Let's build the prompt and history according to guidelines
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role,
      parts: [{ text: h.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "琴声悠扬，余音缭绕，不知您还想品读哪一首曲目？";
    res.json({ text: reply });
  } catch (error: any) {
    console.error("Gemini API call failed", error);
    res.status(500).json({ error: error.message || "Failed to generate response" });
  }
});

// Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
