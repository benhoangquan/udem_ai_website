export default {
  name: 'activity',
  title: 'Activities',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Activity Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'type',
      title: 'Activity Type',
      type: 'string',
      options: {
        list: [
          { title: 'Workshop', value: 'workshop' },
          { title: 'Hackathon', value: 'hackathon' },
          { title: 'Study Group', value: 'study_group' },
          { title: 'Project Meeting', value: 'project_meeting' },
          { title: 'Social Event', value: 'social' },
          { title: 'Competition', value: 'competition' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'schedule',
      title: 'Schedule',
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
          name: 'isRecurring',
          title: 'Is Recurring',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'recurrencePattern',
          title: 'Recurrence Pattern',
          type: 'string',
          options: {
            list: [
              { title: 'Weekly', value: 'weekly' },
              { title: 'Bi-weekly', value: 'biweekly' },
              { title: 'Monthly', value: 'monthly' },
            ],
          },
          hidden: ({ parent }: any) => !parent?.isRecurring,
        },
      ],
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Location Type',
          type: 'string',
          options: {
            list: [
              { title: 'In-Person', value: 'in_person' },
              { title: 'Online', value: 'online' },
              { title: 'Hybrid', value: 'hybrid' },
            ],
          },
        },
        {
          name: 'venue',
          title: 'Venue',
          type: 'string',
          hidden: ({ parent }: any) => parent?.type === 'online',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'string',
          hidden: ({ parent }: any) => parent?.type === 'online',
        },
        {
          name: 'meetingLink',
          title: 'Meeting Link',
          type: 'url',
          hidden: ({ parent }: any) => parent?.type === 'in_person',
        },
      ],
    },
    {
      name: 'organizers',
      title: 'Organizers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'member' }],
        },
      ],
    },
    {
      name: 'capacity',
      title: 'Capacity',
      type: 'object',
      fields: [
        {
          name: 'maxParticipants',
          title: 'Maximum Participants',
          type: 'number',
        },
        {
          name: 'currentParticipants',
          title: 'Current Participants',
          type: 'number',
          initialValue: 0,
        },
        {
          name: 'waitlistEnabled',
          title: 'Enable Waitlist',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Resource Title',
              type: 'string',
            },
            {
              name: 'type',
              title: 'Resource Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Slides', value: 'slides' },
                  { title: 'Code', value: 'code' },
                  { title: 'Document', value: 'document' },
                  { title: 'Video', value: 'video' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      title: 'Activity Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planned', value: 'planned' },
          { title: 'Open for Registration', value: 'open' },
          { title: 'Full', value: 'full' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'planned',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      startDate: 'schedule.startDateTime',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const { title, type, startDate, media } = selection;
      return {
        title,
        subtitle: `${type.charAt(0).toUpperCase() + type.slice(1)} - ${new Date(startDate).toLocaleDateString()}`,
        media,
      };
    },
  },
} 