export default {
  name: 'eventDetails',
  title: 'Event Details',
  type: 'object',
  fields: [
    {
      name: 'startDateTime',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'endDateTime',
      title: 'End Date & Time',
      type: 'datetime',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'location',
    },
    {
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      description: 'Maximum number of participants (0 for unlimited)',
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Prerequisites or requirements for participation',
    },
    {
      name: 'isOnline',
      title: 'Is Online Event',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'onlineDetails',
      title: 'Online Event Details',
      type: 'object',
      fields: [
        {
          name: 'platform',
          title: 'Platform',
          type: 'string',
          options: {
            list: [
              { title: 'Zoom', value: 'zoom' },
              { title: 'Google Meet', value: 'google-meet' },
              { title: 'Discord', value: 'discord' },
              { title: 'Other', value: 'other' },
            ],
          },
        },
        {
          name: 'link',
          title: 'Meeting Link',
          type: 'url',
        },
        {
          name: 'additionalInfo',
          title: 'Additional Information',
          type: 'text',
        },
      ],
      hidden: ({ parent }: any) => !parent?.isOnline,
    },
  ],
} 