import {faker} from '@faker-js/faker'
import type {SanityDocumentLike} from 'sanity'
import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const COUNT = 1

const contentTypes = [
  { title: 'Document', value: 'document' },
  { title: 'Video', value: 'video' },
  { title: 'Code Repository', value: 'code' },
  { title: 'External Link', value: 'link' },
  { title: 'File Download', value: 'file' },
]

const difficultyLevels = [
  { title: 'Beginner', value: 'beginner' },
  { title: 'Intermediate', value: 'intermediate' },
  { title: 'Advanced', value: 'advanced' },
]

const resourceCategories = [
    { title: 'Learning Materials', value: 'learning_materials' },
    { title: 'Project Guides', value: 'project_guides' },
    { title: 'Workshop Materials', value: 'workshop_materials' },
    { title: 'AI Tools', value: 'ai_tools' },
    { title: 'Research Papers', value: 'research_papers' },
    { title: 'Code Examples', value: 'code_examples' },
    { title: 'External Resources', value: 'external_resources' },
    { title: 'Documentation', value: 'documentation' },
    { title: 'Tutorials', value: 'tutorials' },
    { title: 'Best Practices', value: 'best_practices' },
]

export default async function createResourceData() {
  console.log(`Create new resource data with...`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)

  const transaction = client.transaction()

  for (let i = 0; i < COUNT; i++) {
    const title = faker.company.catchPhrase()
    const publishedAt = faker.date.past()
    const updatedAt = new Date(publishedAt)
    updatedAt.setDate(updatedAt.getDate() + faker.number.int({ min: 1, max: 30 }))

    // Generate content array with multiple items
    const contentCount = faker.number.int({ min: 1, max: 3 })
    const content = Array.from({ length: contentCount }, (_, index) => {
      const contentType = faker.helpers.arrayElement(contentTypes)
      return {
        _key: faker.string.uuid(),
        type: contentType.value,
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        url: contentType.value !== 'file' ? faker.internet.url() : undefined,
        // Note: File field is omitted as it requires actual file upload
      }
    })

    transaction.create({
      _type: 'resource',
      _id: faker.string.uuid(),
      title,
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(title).toLowerCase(),
      },
      category: faker.helpers.arrayElement(resourceCategories).value,
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
      content,
      difficulty: faker.helpers.arrayElement(difficultyLevels).value,
      tags: faker.helpers.multiple(() => faker.lorem.word(), { count: 5 }),
      // Temporarily removing contributors references until we have actual members
      // Temporarily removing relatedResources references until we have actual resources
      publishedAt: publishedAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      featured: faker.datatype.boolean(),
    })
  }

  transaction
    .commit()
    .then((res) => {
      console.log(`Complete! Created ${COUNT} resources`, res)
    })
    .catch((err) => {
      console.error('Error creating resources:', err)
    })
}

createResourceData() 