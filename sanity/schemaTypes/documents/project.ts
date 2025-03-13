export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
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
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'In Planning', value: 'planning' },
          { title: 'In Progress', value: 'progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'On Hold', value: 'hold' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Project Summary',
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
      name: 'category',
      title: 'Project Category',
      type: 'string',
      options: {
        list: [
          { title: 'Machine Learning', value: 'ml' },
          { title: 'Deep Learning', value: 'dl' },
          { title: 'Computer Vision', value: 'cv' },
          { title: 'Natural Language Processing', value: 'nlp' },
          { title: 'Reinforcement Learning', value: 'rl' },
          { title: 'Data Science', value: 'ds' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    {
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
    },
    {
      name: 'team',
      title: 'Project Team',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'member',
              title: 'Team Member',
              type: 'reference',
              to: [{ type: 'member' }],
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'timeline',
      title: 'Project Timeline',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'date',
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'date',
        },
        {
          name: 'milestones',
          title: 'Milestones',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Milestone Title',
                  type: 'string',
                },
                {
                  name: 'date',
                  title: 'Target Date',
                  type: 'date',
                },
                {
                  name: 'completed',
                  title: 'Completed',
                  type: 'boolean',
                  initialValue: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'resources',
      title: 'Project Resources',
      type: 'object',
      fields: [
        {
          name: 'repository',
          title: 'Code Repository',
          type: 'url',
        },
        {
          name: 'documentation',
          title: 'Documentation',
          type: 'url',
        },
        {
          name: 'demo',
          title: 'Demo Link',
          type: 'url',
        },
        {
          name: 'additionalLinks',
          title: 'Additional Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Link Title',
                  type: 'string',
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
      ],
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
      status: 'status',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const { title, status, media } = selection;
      return {
        title,
        subtitle: status.charAt(0).toUpperCase() + status.slice(1),
        media,
      };
    },
  },
} 