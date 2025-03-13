import { getCliClient } from "sanity/cli"
import createActivityData from "./createActivityData"
import createEventData from "./createEventData"
import createGeneralInfoData from "./createGeneralInfoData"
import createMemberData from "./createMemberData"
import createProjectData from "./createProjectData"
import createResourceData from "./createResourceData"
import createToolData from "./createToolData"
import createPostData from "./createPostData"

const COUNT = 1
const client = getCliClient()

async function createData() {
  console.log(`Create new data with...`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)


  for (let i = 0; i < COUNT; i++) {
    await createActivityData()
    await createEventData()
    await createGeneralInfoData()
    await createMemberData()
    await createProjectData()
    await createResourceData()
    await createToolData()
    await createPostData()
  }
}

createData()