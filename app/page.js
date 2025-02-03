"use client"
import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import SearchBox from "../components/SearchBox"
import Logo from "../components/Logo"
import { Label } from "@radix-ui/react-label"


export default function Home() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  // 点击搜索示例时更新搜索查询并自动跳转到搜索页面
  const handleExampleClick = (example) => {
    setQuery(example)
    // 自动将搜索内容提交到搜索页面，触发 AI 搜索
    router.push(`/search?q=${encodeURIComponent(example)}`)
  }

  // 搜索示例列表
  const searchExamples = [
    "How to fix React rendering issues?",
    "Best practices for Node.js error handling",
    "Webpack configuration for large projects",
    "Understanding JavaScript event loop",
    "Optimizing performance in React applications",
    "Implementing secure authentication with Passport.js",
    "Effective state management with Redux"
  ]

  return (
    <div className="flex flex-col items-center mt-20 min-h-full px-4">
      <Logo className="w-32 h-32 mb-4" />
      {/* 将 SearchBox 组件包裹在 Suspense 边界内 */}
      <Suspense fallback={<div>加载中...</div>}>
        <SearchBox value={query} onChange={setQuery} />
      </Suspense>
      <div className="mt-10 text-center m-20">
        <div className="flex flex-wrap gap-2">
          {searchExamples.map((example, idx) => (
            <Label
              key={idx}
              onClick={() => handleExampleClick(example)}
              className="cursor-pointer px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              {example}
            </Label>
          ))}
        </div>
      </div>
    </div>
  )
}
