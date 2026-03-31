import { defineEventHandler } from 'h3'
import { readFileSync, existsSync } from 'node:fs'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  const filePath = config.changelogFilePath
  console.log('Reading changelog from:', filePath)

  if (!existsSync(filePath)) {
    console.error('Changelog file not found:', filePath)
    return
  }

  const fileContent = readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent)
})
