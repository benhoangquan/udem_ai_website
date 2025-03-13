import {faker} from '@faker-js/faker'
import type {SanityDocumentLike} from 'sanity'
import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const COUNT = 1

const toolCategories = [
  { title: 'Machine Learning Framework', value: 'ml_framework' },
  { title: 'Deep Learning Library', value: 'dl_library' },
  { title: 'Data Processing', value: 'data_processing' },
  { title: 'Visualization', value: 'visualization' },
  { title: 'Model Deployment', value: 'deployment' },
  { title: 'Development Tool', value: 'dev_tool' },
  { title: 'Cloud Service', value: 'cloud' },
  { title: 'Other', value: 'other' },
]

const pricingTypes = [
  { title: 'Free', value: 'free' },
  { title: 'Freemium', value: 'freemium' },
  { title: 'Paid', value: 'paid' },
  { title: 'Enterprise', value: 'enterprise' },
  { title: 'Custom', value: 'custom' },
]

const resourceTypes = [
  { title: 'Tutorial', value: 'tutorial' },
  { title: 'Documentation', value: 'documentation' },
  { title: 'Video', value: 'video' },
  { title: 'Article', value: 'article' },
  { title: 'Course', value: 'course' },
  { title: 'Other', value: 'other' },
]

const difficultyLevels = [
  { title: 'Beginner', value: 'beginner' },
  { title: 'Intermediate', value: 'intermediate' },
  { title: 'Advanced', value: 'advanced' },
]

const programmingLanguages = [
  'Python',
  'JavaScript',
  'R',
  'Java',
  'C++',
  'Julia',
  'MATLAB',
  'Scala',
]

export default async function createToolData() {
  console.log(`Create new tool data with...`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)

  const transaction = client.transaction()

  for (let i = 0; i < COUNT; i++) {
    const name = faker.company.name()
    
    // Generate features
    const featureCount = faker.number.int({ min: 3, max: 5 })
    const features = Array.from({ length: featureCount }, () => ({
      _key: faker.string.uuid(),
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraph(),
    }))

    // Generate use cases
    const useCaseCount = faker.number.int({ min: 2, max: 4 })
    const useCases = Array.from({ length: useCaseCount }, () => ({
      _key: faker.string.uuid(),
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraph(),
      example: faker.helpers.multiple(() => faker.lorem.sentence(), { count: 3 }).join('\n'),
    }))

    // Generate learning resources
    const resourceCount = faker.number.int({ min: 2, max: 4 })
    const resources = Array.from({ length: resourceCount }, () => ({
      _key: faker.string.uuid(),
      title: faker.company.catchPhrase(),
      type: faker.helpers.arrayElement(resourceTypes).value,
      url: faker.internet.url(),
      difficulty: faker.helpers.arrayElement(difficultyLevels).value,
    }))

    // Generate installation instructions
    const instructionCount = faker.number.int({ min: 2, max: 4 })
    const instructions = Array.from({ length: instructionCount }, () => 
      faker.lorem.sentence()
    )

    transaction.create({
      _type: 'tool',
      _id: faker.string.uuid(),
      name,
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(name).toLowerCase(),
      },
      category: faker.helpers.arrayElement(toolCategories).value,
      description: [
        {
          _key: faker.string.uuid(),
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: faker.lorem.paragraphs(2),
            },
          ],
        },
        {
          _key: faker.string.uuid(),
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: faker.lorem.sentence(),
            },
          ],
        },
        {
          _key: faker.string.uuid(),
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: faker.lorem.paragraphs(2),
            },
          ],
        },
      ],
      // Temporarily removing logo reference until we have actual images
      website: faker.internet.url(),
      documentation: faker.internet.url(),
      features,
      useCases,
      requirements: {
        languages: faker.helpers.arrayElements(programmingLanguages, { min: 1, max: 3 }),
        dependencies: faker.helpers.multiple(() => faker.lorem.word(), { count: 3 }),
        systemRequirements: faker.lorem.paragraph(),
      },
      installation: {
        instructions,
        quickStart: faker.lorem.sentence(),
        additionalNotes: faker.lorem.paragraph(),
      },
      pricing: {
        type: faker.helpers.arrayElement(pricingTypes).value,
        details: faker.lorem.paragraph(),
        hasFreeVersion: faker.datatype.boolean(),
      },
      resources,
      community: {
        githubRepo: faker.internet.url(),
        forum: faker.internet.url(),
        discord: faker.internet.url(),
      },
    })
  }

  transaction
    .commit()
    .then((res) => {
      console.log(`Complete! Created ${COUNT} tools`, res)
    })
    .catch((err) => {
      console.error('Error creating tools:', err)
    })
}

createToolData() 