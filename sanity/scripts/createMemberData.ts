import {faker} from '@faker-js/faker'
import type {SanityDocumentLike} from 'sanity'
import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const COUNT = 1

const roles = ['member', 'executive', 'admin', 'alumni']
const executivePositions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Event Coordinator']
const statusTypes = ['active', 'inactive', 'suspended']
const contributionTypes = ['project', 'event', 'workshop', 'content', 'other']

export default async function createMemberData() {
  console.log(`Create new member data with...`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)

  const transaction = client.transaction()

  for (let i = 0; i < COUNT; i++) {
    const name = faker.person.fullName()
    const role = faker.helpers.arrayElement(roles)
    const isExecutive = role === 'executive'
    
    transaction.create({
      _type: 'member',
      _id: faker.string.uuid(),
      name,
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(name).toLowerCase(),
      },
      email: faker.internet.email(),
      role,
      executivePosition: isExecutive ? faker.helpers.arrayElement(executivePositions) : undefined,
      // Temporarily removing avatar reference until we have actual images
      bio: [
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
      skills: faker.helpers.multiple(() => faker.person.jobType(), { count: 3 }),
      socialLinks: {
        facebook: faker.internet.url(),
        twitter: faker.internet.url(),
        instagram: faker.internet.url(),
        linkedin: faker.internet.url(),
        github: faker.internet.url(),
        youtube: faker.internet.url(),
        discord: faker.internet.url(),
        telegram: faker.internet.url(),
        customLinks: faker.helpers.multiple(() => ({
          _key: faker.string.uuid(),
          platform: faker.company.name(),
          url: faker.internet.url(),
          icon: faker.helpers.arrayElement(['icon1', 'icon2', 'icon3']),
        }), { count: 2 }),
      },
      // Temporarily removing achievements reference until we have actual achievements
      badges: faker.helpers.multiple(() => ({
        _key: faker.string.uuid(),
        name: faker.company.catchPhrase(),
        description: faker.lorem.sentence(),
        icon: faker.helpers.arrayElement(['badge1', 'badge2', 'badge3']),
      }), { count: 2 }),
      points: faker.number.int({ min: 0, max: 1000 }),
      joinDate: faker.date.past().toISOString().split('T')[0],
      status: faker.helpers.arrayElement(statusTypes),
      // Temporarily removing projects reference until we have actual projects
      contributions: faker.helpers.multiple(() => ({
        _key: faker.string.uuid(),
        type: faker.helpers.arrayElement(contributionTypes),
        description: faker.lorem.sentence(),
        date: faker.date.past().toISOString().split('T')[0],
        pointsEarned: faker.number.int({ min: 10, max: 100 }),
      }), { count: 3 }),
    })
  }

  transaction
    .commit()
    .then((res) => {
      console.log(`Complete! Created ${COUNT} members`, res)
    })
    .catch((err) => {
      console.error('Error creating members:', err)
    })
}

createMemberData() 