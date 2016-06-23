export function go (url, $router) {
  if (/^javas/.test(url) || !url) return
  const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
  if (useRouter) {
    $router.go(url)
  } else {
    window.location.href = url
  }
}

export function getUrl (url, $router) {
  // Make sure the href is right in hash mode
  if ($router && !$router._history && typeof url === 'string' && !/http/.test(url)) {
    return `#!${url}`
  }
  return url && typeof url !== 'object' ? url : 'javascript:void(0);'
}
