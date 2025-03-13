export default {
  name: 'opportunity',
  title: 'Opportunities',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Opportunity Title',
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
      title: 'Opportunity Type',
      type: 'string',
      options: {
        list: [
          { title: 'Volunteer', value: 'volunteer' },
          { title: 'Leadership', value: 'leadership' },
          { title: 'Collaboration', value: 'collaboration' },
          { title: 'Research', value: 'research' },
          { title: 'Teaching', value: 'teaching' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    },
    {
      name: 'description',
      title: 'Full Description',
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
      name: 'commitment',
      title: 'Time Commitment',
      type: 'object',
      fields: [
        {
          name: 'hoursPerWeek',
          title: 'Hours per Week',
          type: 'number',
        },
        {
          name: 'duration',
          title: 'Duration',
          type: 'string',
          options: {
            list: [
              { title: '1-3 months', value: 'short_term' },
              { title: '3-6 months', value: 'medium_term' },
              { title: '6+ months', value: 'long_term' },
              { title: 'Ongoing', value: 'ongoing' },
            ],
          },
        },
        {
          name: 'schedule',
          title: 'Schedule Type',
          type: 'string',
          options: {
            list: [
              { title: 'Flexible', value: 'flexible' },
              { title: 'Fixed', value: 'fixed' },
              { title: 'Hybrid', value: 'hybrid' },
            ],
          },
        },
      ],
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'object',
      fields: [
        {
          name: 'skills',
          title: 'Required Skills',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'experience',
          title: 'Experience Level',
          type: 'string',
          options: {
            list: [
              { title: 'No Experience Required', value: 'none' },
              { title: 'Beginner', value: 'beginner' },
              { title: 'Intermediate', value: 'intermediate' },
              { title: 'Advanced', value: 'advanced' },
            ],
          },
        },
        {
          name: 'additionalRequirements',
          title: 'Additional Requirements',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
    {
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'applicationProcess',
      title: 'Application Process',
      type: 'object',
      fields: [
        {
          name: 'steps',
          title: 'Application Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'stepNumber',
                  title: 'Step Number',
                  type: 'number',
                },
                {
                  name: 'description',
                  title: 'Step Description',
                  type: 'string',
                },
              ],
            },
          ],
        },
        {
          name: 'deadline',
          title: 'Application Deadline',
          type: 'datetime',
        },
        {
          name: 'applicationLink',
          title: 'Application Link',
          type: 'url',
        },
      ],
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Contact Name',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Contact Email',
          type: 'string',
        },
        {
          name: 'additionalInfo',
          title: 'Additional Contact Information',
          type: 'text',
        },
      ],
    },
    {
      name: 'status',
      title: 'Opportunity Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Open', value: 'open' },
          { title: 'Closed', value: 'closed' },
          { title: 'Filled', value: 'filled' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'draft',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'relatedOpportunities',
      title: 'Related Opportunities',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'opportunity' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      status: 'status',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const { title, type, status, media } = selection;
      return {
        title,
        subtitle: `${type.charAt(0).toUpperCase() + type.slice(1)} - ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        media,
      };
    },
  },
} 