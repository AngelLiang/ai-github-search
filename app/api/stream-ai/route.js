import OpenAI from "openai"; // 注意：v4 版本直接导入 OpenAI

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY, // 替换为你的 API 密钥
  baseURL: process.env.OPENAI_BASE_URL, // 替换为你的自定义 API 地址（如果有）
});

// generateAIResponse 方法
export async function* generateAIResponse(query, githubIssues) {
  const systemPrompt = `
    ## role

    ai github search

    ## 主要功能
    - 根据用户问题和相关的 GitHub issue，提供一个能解决用户问题并且结合 GitHub issue 中信息的答案。根据相关资料回答用户问题即可，不要输出其他信息
    - 问题使用什么语言提问，就使用什么语言回答，如果问题使用英文提问，就使用英文回答， 如果问题使用中文提问，就使用中文回答

    ## 相关资料

    ${githubIssues && githubIssues.map((issue) => `- ${issue.title}`).join("\n")}
  `;

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: query },
    ],
    max_tokens: 150,
    temperature: 0.7,
    stream: true,
  });

  // 逐步 yield 流式响应的每个 chunk
  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}

export async function POST(request) {
  const { query, githubIssues } = await request.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // 遍历生成的流式响应数据
        for await (const chunk of generateAIResponse(query, githubIssues)) {
          // 将字符串转换为 Uint8Array 并入队列发送
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (error) {
        console.error("Stream error:", error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
  });
}
