export default {
  name: 'tool',
  title: 'AI Tools',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Tool Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'category',
      title: 'Tool Category',
      type: 'string',
      options: {
        list: [
          { title: 'Machine Learning Framework', value: 'ml_framework' },
          { title: 'Deep Learning Library', value: 'dl_library' },
          { title: 'Data Processing', value: 'data_processing' },
          { title: 'Visualization', value: 'visualization' },
          { title: 'Model Deployment', value: 'deployment' },
          { title: 'Development Tool', value: 'dev_tool' },
          { title: 'Cloud Service', value: 'cloud' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Tool Description',
      type: 'blockContent',
    },
    {
      name: 'logo',
      title: 'Tool Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'website',
      title: 'Official Website',
      type: 'url',
    },
    {
      name: 'documentation',
      title: 'Documentation URL',
      type: 'url',
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Use Case Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Use Case Description',
              type: 'text',
            },
            {
              name: 'example',
              title: 'Code Example',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'requirements',
      title: 'Technical Requirements',
      type: 'object',
      fields: [
        {
          name: 'languages',
          title: 'Programming Languages',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'dependencies',
          title: 'Dependencies',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'systemRequirements',
          title: 'System Requirements',
          type: 'text',
        },
      ],
    },
    {
      name: 'installation',
      title: 'Installation Guide',
      type: 'object',
      fields: [
        {
          name: 'instructions',
          title: 'Installation Instructions',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'quickStart',
          title: 'Quick Start Command',
          type: 'string',
        },
        {
          name: 'additionalNotes',
          title: 'Additional Notes',
          type: 'text',
        },
      ],
    },
    {
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Pricing Type',
          type: 'string',
          options: {
            list: [
              { title: 'Free', value: 'free' },
              { title: 'Freemium', value: 'freemium' },
              { title: 'Paid', value: 'paid' },
              { title: 'Enterprise', value: 'enterprise' },
              { title: 'Custom', value: 'custom' },
            ],
          },
        },
        {
          name: 'details',
          title: 'Pricing Details',
          type: 'text',
        },
        {
          name: 'hasFreeVersion',
          title: 'Has Free Version',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
    {
      name: 'resources',
      title: 'Learning Resources',
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
                  { title: 'Tutorial', value: 'tutorial' },
                  { title: 'Documentation', value: 'documentation' },
                  { title: 'Video', value: 'video' },
                  { title: 'Article', value: 'article' },
                  { title: 'Course', value: 'course' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            {
              name: 'url',
              title: 'Resource URL',
              type: 'url',
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
          ],
        },
      ],
    },
    {
      name: 'community',
      title: 'Community Information',
      type: 'object',
      fields: [
        {
          name: 'githubRepo',
          title: 'GitHub Repository',
          type: 'url',
        },
        {
          name: 'forum',
          title: 'Community Forum',
          type: 'url',
        },
        {
          name: 'discord',
          title: 'Discord Server',
          type: 'url',
        },
        {
          name: 'slack',
          title: 'Slack Channel',
          type: 'url',
        },
      ],
    },
    {
      name: 'alternatives',
      title: 'Alternative Tools',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Tool Name',
              type: 'string',
            },
            {
              name: 'comparison',
              title: 'Comparison Notes',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      title: 'Tool Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active Development', value: 'active' },
          { title: 'Stable', value: 'stable' },
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Deprecated', value: 'deprecated' },
        ],
      },
      initialValue: 'active',
    },
    {
      name: 'rating',
      title: 'Tool Rating',
      type: 'object',
      fields: [
        {
          name: 'score',
          title: 'Overall Score',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(5),
        },
        {
          name: 'reviews',
          title: 'Number of Reviews',
          type: 'number',
          validation: (Rule: any) => Rule.min(0),
        },
        {
          name: 'userFeedback',
          title: 'User Feedback',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'comment',
                  title: 'Comment',
                  type: 'text',
                },
                {
                  name: 'rating',
                  title: 'Rating',
                  type: 'number',
                  validation: (Rule: any) => Rule.min(1).max(5),
                },
                {
                  name: 'date',
                  title: 'Review Date',
                  type: 'date',
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
      title: 'name',
      category: 'category',
      status: 'status',
      media: 'logo',
    },
    prepare(selection: any) {
      const { title, category, status, media } = selection;
      return {
        title,
        subtitle: `${category.charAt(0).toUpperCase() + category.slice(1)} - ${status}`,
        media,
      };
    },
  },
} 