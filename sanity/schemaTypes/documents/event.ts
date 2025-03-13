export default {
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'details',
      title: 'Event Details',
      type: 'eventDetails',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'type',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Workshop', value: 'workshop' },
          { title: 'Talk', value: 'talk' },
          { title: 'Hackathon', value: 'hackathon' },
          { title: 'Social', value: 'social' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Past', value: 'past' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    },
    {
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'member' }] }],
    },
    {
      name: 'resources',
      title: 'Event Resources',
      type: 'object',
      fields: [
        {
          name: 'slides',
          title: 'Presentation Slides',
          type: 'file',
        },
        {
          name: 'recording',
          title: 'Recording URL',
          type: 'url',
        },
        {
          name: 'additionalMaterials',
          title: 'Additional Materials',
          type: 'array',
          of: [{ type: 'file' }],
        },
      ],
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
      name: 'gallery',
      title: 'Event Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      date: 'details.startDateTime',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const { title, type, date, media } = selection;
      return {
        title,
        subtitle: `${type} - ${date ? new Date(date).toLocaleDateString() : 'Date TBD'}`,
        media,
      };
    },
  },
} 