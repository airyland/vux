import { createServer } from 'node:http'
import { resolve } from 'node:path'
import sirv from 'sirv'

const directory = resolve(process.env.SITE_DIR || '/site')
const serve = sirv(directory, {
  etag: true,
  extensions: [],
  setHeaders(response, pathname) {
    if (pathname === '/favicon.ico') response.setHeader('Content-Type', 'image/x-icon')
  }
})

const server = createServer((request, response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff')

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end()
    return
  }

  const rawTarget = request.url || '/'
  const queryIndex = rawTarget.indexOf('?')
  const pathname = queryIndex === -1 ? rawTarget : rawTarget.slice(0, queryIndex)
  const query = queryIndex === -1 ? '' : rawTarget.slice(queryIndex)

  if (request.headers.host === 'docs.vux.li' && pathname.startsWith('/')) {
    response.writeHead(301, { Location: 'https://doc.vux.li' + pathname + query }).end()
    return
  }

  if (pathname === '/healthz') {
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }).end('ok\n')
    return
  }

  if (pathname === '/' || /^\/(zh-CN|en)(\/faq)?$/.test(pathname)) {
    const target = pathname === '/' ? '/zh-CN/' : pathname + '/'
    response.writeHead(302, { Location: target + query }).end()
    return
  }

  if (/^\/(zh-CN|en)(\/faq)?\/$/.test(pathname)) {
    request.url = pathname + 'index.html' + query
  }

  serve(request, response)
})

server.listen(Number(process.env.PORT || 8080), '0.0.0.0')
