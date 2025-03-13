export default {
  name: 'team',
  title: 'Teams',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Team Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Team Description',
      type: 'blockContent',
    },
    {
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'member',
              title: 'Member',
              type: 'reference',
              to: [{ type: 'member' }],
            },
            {
              name: 'position',
              title: 'Position',
              type: 'string',
            },
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
          ],
        },
      ],
    },
    {
      name: 'responsibilities',
      title: 'Team Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'projects',
      title: 'Team Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      active: 'active',
    },
    prepare(selection: any) {
      const { title, active } = selection;
      return {
        title,
        subtitle: active ? 'Active' : 'Inactive',
      };
    },
  },
} 