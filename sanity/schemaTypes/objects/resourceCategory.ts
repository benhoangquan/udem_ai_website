export default {
  name: 'resourceCategory',
  title: 'Resource Category',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          { title: 'Learning Materials', value: 'learning_materials' },
          { title: 'Project Guides', value: 'project_guides' },
          { title: 'Workshop Materials', value: 'workshop_materials' },
          { title: 'AI Tools', value: 'ai_tools' },
          { title: 'Research Papers', value: 'research_papers' },
          { title: 'Code Examples', value: 'code_examples' },
          { title: 'External Resources', value: 'external_resources' },
          { title: 'Documentation', value: 'documentation' },
          { title: 'Tutorials', value: 'tutorials' },
          { title: 'Best Practices', value: 'best_practices' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Category Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'icon',
      title: 'Category Icon',
      type: 'string',
      description: 'Icon name from the icon library (e.g., "book", "code", "tools")',
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
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'resourceCategory' }],
      description: 'Optional parent category for hierarchical organization',
    },
    {
      name: 'tags',
      title: 'Category Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags to help with resource categorization and search',
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this category is currently in use',
    },
  ],
  preview: {
    select: {
      title: 'name',
      icon: 'icon',
      order: 'order',
    },
    prepare(selection: any) {
      const { title, icon, order } = selection;
      return {
        title,
        subtitle: `Order: ${order}`,
        media: icon ? { type: 'icon', icon } : null,
      };
    },
  },
} 