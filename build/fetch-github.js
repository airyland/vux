'use strict'

const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')
const relesesPath = path.resolve(__dirname, '../docs/releases.json')

const get = async function () {
  const res =await fetch('https://api.github.com/repos/airyland/vux/releases')
  return await res.json()
}

get().then(res => {
  fs.writeFileSync(relesesPath, JSON.stringify(res, null, 2))
})