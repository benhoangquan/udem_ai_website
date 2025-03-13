import {faker} from '@faker-js/faker'
import type {SanityDocumentLike} from 'sanity'
import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const COUNT = 1

const categories = [
  { title: 'AI/ML', value: 'ai-ml' },
  { title: 'Programming', value: 'programming' },
  { title: 'Club News', value: 'club-news' },
  { title: 'Events', value: 'events' },
  { title: 'Tutorials', value: 'tutorials' },
  { title: 'Research', value: 'research' },
]

export default async function createPostData() {
  console.log(`Create new post data with...`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)

  const transaction = client.transaction()

  for (let i = 0; i < COUNT; i++) {
    const title = faker.lorem.sentence()
    const publishedAt = faker.date.past()
    
    transaction.create({
      _type: 'post',
      _id: faker.string.uuid(),
      title,
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(title).toLowerCase(),
      },
      // Temporarily removing author reference until we have actual members
      // Temporarily removing mainImage reference until we have actual images
      categories: faker.helpers.multiple(() => 
        faker.helpers.arrayElement(categories).value, 
        { count: faker.number.int({ min: 1, max: 3 }) }
      ),
      excerpt: faker.lorem.paragraph(),
      body: [
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
        {
          _key: faker.string.uuid(),
          _type: 'block',
          style: 'blockquote',
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
      // Temporarily removing relatedPosts reference until we have actual posts
      publishedAt: publishedAt.toISOString(),
      featured: faker.datatype.boolean(),
      seo: {
        metaTitle: faker.lorem.sentence(),
        metaDescription: faker.lorem.paragraph(),
        keywords: faker.helpers.multiple(() => faker.lorem.word(), { count: 5 }),
      },
    })
  }

  transaction
    .commit()
    .then((res) => {
      console.log(`Complete! Created ${COUNT} posts`, res)
    })
    .catch((err) => {
      console.error('Error creating posts:', err)
    })
}

createPostData() 