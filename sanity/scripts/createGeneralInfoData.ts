import {faker} from '@faker-js/faker'
import type {SanityDocumentLike} from 'sanity'
import {getCliClient} from 'sanity/cli'

const client = getCliClient()

async function createGeneralInfoData() {
  console.log(`Create new general info data with...`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)

  const transaction = client.transaction()
  
  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  const officeHours = weekDays.map(day => ({
    _key: faker.string.uuid(),
    day,
    hours: '9:00 AM - 5:00 PM'
  }))

  transaction.create({
    _type: 'generalInfo',
    _id: faker.string.uuid(),
    title: faker.company.name(),
    mission: [
      {
        _key: faker.string.uuid(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: faker.lorem.paragraph(),
          },
        ],
      },
    ],
    vision: [
      {
        _key: faker.string.uuid(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: faker.lorem.paragraph(),
          },
        ],
      },
    ],
    meetingInfo: {
      regularSchedule: 'Every Tuesday at 6:00 PM',
      location: {
        name: faker.location.city(),
        building: faker.location.buildingNumber(),
        address: faker.location.streetAddress(),
        directions: faker.lorem.sentence(),
      },
    },
    contact: {
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      officeHours,
      contactFormEnabled: true,
      contactFormEmail: faker.internet.email(),
    },
    socialMedia: {
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
    seo: {
      metaTitle: faker.company.catchPhrase(),
      metaDescription: faker.lorem.paragraph(),
      keywords: faker.helpers.multiple(() => faker.lorem.word(), { count: 5 }),
    },
  })

  transaction
    .commit()
    .then((res) => {
      console.log(`Complete! Created general info data`, res)
    })
    .catch((err) => {
      console.error('Error creating general info data:', err)
    })
}

createGeneralInfoData() 