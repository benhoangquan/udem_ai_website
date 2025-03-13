import {getCliClient} from 'sanity/cli'

const client = getCliClient()

async function clearData() {
  console.log(`Clearing data from...`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)

  try {
    // First, get all documents
    const query = `*[_type in ["activity", "member"]]`
    const documents = await client.fetch(query)
    
    if (documents.length === 0) {
      console.log('No documents found to delete')
      return
    }

    console.log(`Found ${documents.length} documents to delete`)

    // Create a transaction to delete all documents
    const transaction = client.transaction()
    
    documents.forEach((doc: any) => {
      transaction.delete(doc._id)
    })

    // Commit the transaction
    const result = await transaction.commit()
    console.log('Successfully deleted all documents:', result)
  } catch (error) {
    console.error('Error clearing data:', error)
  }
}

clearData()
