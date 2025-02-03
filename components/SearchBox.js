"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function SearchBox() {
  // 获取 URL 中的查询参数
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  
  // 使用初始查询值初始化状态
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  // 当 URL 参数发生变化时，更新搜索框内容
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub issues..."
          className="w-full px-4 py-2 focus:outline-none"
        />
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 hover:bg-blue-600 transition-colors">
          Search
        </button>
      </div>
    </form>
  )
}
