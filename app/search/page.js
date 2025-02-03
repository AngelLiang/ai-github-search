import { searchGitHubIssues } from "../../utils/github"
import SearchBox from "../../components/SearchBox"
import Logo from "../../components/Logo"
import StreamingAIResponse from "../../components/StreamingAIResponse"

export default async function SearchResults({ searchParams }) {
  const query = searchParams.q
  const githubIssues = await searchGitHubIssues(query)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Logo className="w-16 h-16 mr-4" />
        <SearchBox />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">AI Response:</h2>
        <StreamingAIResponse query={query} githubIssues={githubIssues} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Related GitHub Issues:</h2>
        <ul className="space-y-4">
          {githubIssues && githubIssues.map((issue) => (
            <li key={issue.id} className="border-b pb-4">
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {issue.title}
              </a>
              <p className="text-sm text-gray-600 mt-1">
                {issue.repository_url.split("/").slice(-2).join("/")} -{" "}
                {new Date(issue.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
