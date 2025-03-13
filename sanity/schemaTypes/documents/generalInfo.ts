export default {
  name: 'generalInfo',
  title: 'General Information',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Club Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'mission',
      title: 'Mission Statement',
      type: 'blockContent',
    },
    {
      name: 'vision',
      title: 'Vision',
      type: 'blockContent',
    },
    {
      name: 'meetingInfo',
      title: 'Meeting Information',
      type: 'object',
      fields: [
        {
          name: 'regularSchedule',
          title: 'Regular Schedule',
          type: 'string',
        },
        {
          name: 'location',
          title: 'Location',
          type: 'location',
        },
      ],
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'contactInfo',
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'socialLinks',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
  ],
} 