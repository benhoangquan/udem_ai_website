export default {
  name: 'resource',
  title: 'Resources',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Resource Title',
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
      name: 'category',
      title: 'Resource Category',
      type: 'resourceCategory',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Content Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Document', value: 'document' },
                  { title: 'Video', value: 'video' },
                  { title: 'Code Repository', value: 'code' },
                  { title: 'External Link', value: 'link' },
                  { title: 'File Download', value: 'file' },
                ],
              },
            },
            {
              name: 'title',
              title: 'Content Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Content Description',
              type: 'text',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
              hidden: ({ parent }: any) => parent?.type !== 'file',
            },
          ],
        },
      ],
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
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'member' }],
        },
      ],
    },
    {
      name: 'relatedResources',
      title: 'Related Resources',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'resource' }],
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
    },
    {
      name: 'featured',
      title: 'Featured Resource',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.name',
      difficulty: 'difficulty',
    },
    prepare(selection: any) {
      const { title, category, difficulty } = selection;
      return {
        title,
        subtitle: `${category} - ${difficulty || 'No difficulty set'}`,
      };
    },
  },
} 