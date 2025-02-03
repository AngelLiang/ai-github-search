export async function searchGitHubIssues(query) {
  const response = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(query)}`)
  const data = await response.json()
  return data.items?.slice(0, 5) // Return top 5 results
}
