// ./scripts/createData.ts

import {faker} from '@faker-js/faker'
import type {SanityDocumentLike} from 'sanity'
import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const COUNT = 1

const activityTypes = ['workshop', 'hackathon', 'study_group', 'project_meeting', 'social', 'competition', 'other']
const locationTypes = ['in_person', 'online', 'hybrid']
const resourceTypes = ['slides', 'code', 'document', 'video', 'other']
const statusTypes = ['planned', 'open', 'full', 'in_progress', 'completed', 'cancelled']

async function createActivityData() {
  console.log(`Create new data with...`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)

  const transaction = client.transaction()

  for (let i = 0; i < COUNT; i++) {
    const title = faker.company.catchPhrase()
    const locationType = faker.helpers.arrayElement(locationTypes)
    const isRecurring = faker.datatype.boolean()
    
    transaction.create({
      _type: 'activity',
      _id: faker.string.uuid(),
      title,
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(title).toLowerCase(),
      },
      type: faker.helpers.arrayElement(activityTypes),
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
      ],
      schedule: {
        startDateTime: faker.date.future().toISOString(),
        endDateTime: faker.date.future().toISOString(),
        isRecurring,
        recurrencePattern: isRecurring ? faker.helpers.arrayElement(['weekly', 'biweekly', 'monthly']) : undefined,
      },
      location: {
        type: locationType,
        venue: locationType !== 'online' ? faker.company.name() : undefined,
        address: locationType !== 'online' ? faker.location.streetAddress() : undefined,
        meetingLink: locationType !== 'in_person' ? faker.internet.url() : undefined,
      },
      capacity: {
        maxParticipants: faker.number.int({ min: 10, max: 100 }),
        currentParticipants: faker.number.int({ min: 0, max: 50 }),
        waitlistEnabled: faker.datatype.boolean(),
      },
      requirements: faker.helpers.multiple(() => faker.lorem.sentence(), { count: 3 }),
      resources: faker.helpers.multiple(() => ({
        _key: faker.string.uuid(),
        title: faker.lorem.sentence(),
        type: faker.helpers.arrayElement(resourceTypes),
        url: faker.internet.url(),
      }), { count: 2 }),
      status: faker.helpers.arrayElement(statusTypes),
      tags: faker.helpers.multiple(() => faker.lorem.word(), { count: 5 }),
    })
  }

  transaction
    .commit()
    .then((res) => {
      console.log(`Complete! Created ${COUNT} activities`, res)
    })
    .catch((err) => {
      console.error('Error creating activities:', err)
    })
}

createActivityData()