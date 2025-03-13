import {faker} from '@faker-js/faker'
import type {SanityDocumentLike} from 'sanity'
import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const COUNT = 1

const statusTypes = [
  { title: 'In Planning', value: 'planning' },
  { title: 'In Progress', value: 'progress' },
  { title: 'Completed', value: 'completed' },
  { title: 'On Hold', value: 'hold' },
  { title: 'Archived', value: 'archived' },
]

const categories = [
  { title: 'Machine Learning', value: 'ml' },
  { title: 'Deep Learning', value: 'dl' },
  { title: 'Computer Vision', value: 'cv' },
  { title: 'Natural Language Processing', value: 'nlp' },
  { title: 'Reinforcement Learning', value: 'rl' },
  { title: 'Data Science', value: 'ds' },
  { title: 'Other', value: 'other' },
]

const difficultyLevels = [
  { title: 'Beginner', value: 'beginner' },
  { title: 'Intermediate', value: 'intermediate' },
  { title: 'Advanced', value: 'advanced' },
]

const teamRoles = [
  'Project Lead',
  'Developer',
  'Researcher',
  'Designer',
  'Data Scientist',
  'Documentation',
]

export default async function createProjectData() {
  console.log(`Create new project data with...`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)

  const transaction = client.transaction()

  for (let i = 0; i < COUNT; i++) {
    const title = faker.company.catchPhrase()
    const startDate = faker.date.past()
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + faker.number.int({ min: 1, max: 12 }))
    
    // Generate milestones
    const milestoneCount = faker.number.int({ min: 3, max: 5 })
    const milestones = Array.from({ length: milestoneCount }, (_, index) => {
      const milestoneDate = new Date(startDate)
      milestoneDate.setMonth(milestoneDate.getMonth() + (index + 1) * 2)
      return {
        _key: faker.string.uuid(),
        title: faker.company.catchPhrase(),
        date: milestoneDate.toISOString().split('T')[0],
        completed: index === milestoneCount - 1 ? false : faker.datatype.boolean(),
      }
    })

    transaction.create({
      _type: 'project',
      _id: faker.string.uuid(),
      title,
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(title).toLowerCase(),
      },
      status: faker.helpers.arrayElement(statusTypes).value,
      summary: faker.lorem.paragraph(),
      description: [
        {
          _key: faker.string.uuid(),
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: faker.lorem.paragraphs(3),
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
      // Temporarily removing mainImage reference until we have actual images
      category: faker.helpers.arrayElement(categories).value,
      difficulty: faker.helpers.arrayElement(difficultyLevels).value,
      // Temporarily removing team references until we have actual members
      timeline: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        milestones,
      },
      resources: {
        repository: faker.internet.url(),
        documentation: faker.internet.url(),
        demo: faker.internet.url(),
        additionalLinks: faker.helpers.multiple(() => ({
          _key: faker.string.uuid(),
          title: faker.company.catchPhrase(),
          url: faker.internet.url(),
        }), { count: 2 }),
      },
      tags: faker.helpers.multiple(() => faker.lorem.word(), { count: 5 }),
    })
  }

  transaction
    .commit()
    .then((res) => {
      console.log(`Complete! Created ${COUNT} projects`, res)
    })
    .catch((err) => {
      console.error('Error creating projects:', err)
    })
}

createProjectData() 