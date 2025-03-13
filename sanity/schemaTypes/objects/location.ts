export default {
  name: 'location',
  title: 'Location',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Location Name',
      type: 'string',
      description: 'e.g., "Room 101", "Main Auditorium"',
    },
    {
      name: 'building',
      title: 'Building',
      type: 'string',
      description: 'e.g., "Computer Science Building"',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Street Address',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'state',
          title: 'State/Province',
          type: 'string',
        },
        {
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
        },
      ],
    },
    {
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
    },
    {
      name: 'directions',
      title: 'Directions',
      type: 'text',
      description: 'Additional directions or instructions to find the location',
    },
  ],
} 