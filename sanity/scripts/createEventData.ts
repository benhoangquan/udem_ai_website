import {faker} from '@faker-js/faker'
import type {SanityDocumentLike} from 'sanity'
import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const COUNT = 1

const eventTypes = ['workshop', 'talk', 'hackathon', 'social', 'other']
const statusTypes = ['upcoming', 'ongoing', 'past', 'cancelled']

async function createEventData() {
  console.log(`Create new event data with...`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)

  const transaction = client.transaction()

  for (let i = 0; i < COUNT; i++) {
    const title = faker.company.catchPhrase()
    const startDate = faker.date.future()
    const endDate = new Date(startDate)
    endDate.setHours(endDate.getHours() + faker.number.int({ min: 1, max: 8 }))
    
    transaction.create({
      _type: 'event',
      _id: faker.string.uuid(),
      title,
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(title).toLowerCase(),
      },
      details: {
        startDateTime: startDate.toISOString(),
        endDateTime: endDate.toISOString(),
        location: {
          name: faker.location.city(),
          building: faker.location.buildingNumber(),
          address: faker.location.streetAddress(),
          directions: faker.lorem.sentence(),
        },
        capacity: faker.number.int({ min: 10, max: 100 })
      },
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
      type: faker.helpers.arrayElement(eventTypes),
      status: faker.helpers.arrayElement(statusTypes),
      registrationLink: faker.internet.url(),
      // Temporarily removing speakers reference until we have actual members
      resources: {
        slides: {
          _type: 'file',
          asset: {
            _type: 'reference',
            // _ref: faker.string.uuid(),
          },
        },
        recording: faker.internet.url(),
        additionalMaterials: faker.helpers.multiple(() => ({
          _type: 'file',
          _key: faker.string.uuid(),
          asset: {
            _type: 'reference',
            // _ref: faker.string.uuid(),
          },
        }), { count: 2 }),
      },
      // Temporarily removing mainImage reference until we have actual images
      gallery: faker.helpers.multiple(() => ({
        _type: 'image',
        _key: faker.string.uuid(),
        asset: {
          _type: 'reference',
        //   _ref: faker.string.uuid(),
        },
      }), { count: 3 }),
    })
  }

  transaction
    .commit()
    .then((res) => {
      console.log(`Complete! Created ${COUNT} events`, res)
    })
    .catch((err) => {
      console.error('Error creating events:', err)
    })
}

createEventData() 