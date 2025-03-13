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
      type: 'string',
    },
    {
      name: 'directions',
      title: 'Directions',
      type: 'text',
      description: 'Additional directions or instructions to find the location',
    },
  ],
} 