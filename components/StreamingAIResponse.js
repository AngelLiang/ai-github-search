"use client"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"

export default function StreamingAIResponse({ query, githubIssues }) {
  const [content, setContent] = useState("")

  useEffect(() => {
    // 当query变化或组件加载时，先将对话清空
    setContent("")

    const abortController = new AbortController()

    async function fetchStream() {
      try {
        const response = await fetch("/api/stream-ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // 将 AbortController 的 signal 传给 fetch 以便后续取消请求
          signal: abortController.signal,
          body: JSON.stringify({ query, githubIssues }),
        })

        if (!response.body) return

        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        // 循环读取流数据
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          console.log(chunk)
          setContent((prev) => prev + chunk)
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("流请求已取消")
        } else {
          console.error("流请求错误:", error)
        }
      }
    }

    fetchStream()

    // 当组件卸载时，取消流请求，并清空对话
    return () => {
      abortController.abort()
      setContent("")
    }
  }, [query, githubIssues])

  return (
    <ReactMarkdown className="text-gray-700">
      {content}
    </ReactMarkdown>
  )
}
