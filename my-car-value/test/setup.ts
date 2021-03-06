import { rm } from "fs/promises"
import { join } from "path"
import { getConnection } from "typeorm"

global.beforeEach(async () => {
  try{
    await rm(join(__dirname, '../data/', 'test.sqlite'))
  }
  catch(err) {}
})

global.afterEach(async () => {
  const conn = await getConnection()
  await conn.close()
})