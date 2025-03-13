export default {
  name: 'member',
  title: 'Members',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
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
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Member', value: 'member' },
          { title: 'Executive', value: 'executive' },
          { title: 'Admin', value: 'admin' },
          { title: 'Alumni', value: 'alumni' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'executivePosition',
      title: 'Executive Position',
      type: 'string',
      hidden: ({ parent }: any) => parent?.role !== 'executive',
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'blockContent',
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'socialLinks',
    },
    {
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'achievement' }],
        },
      ],
    },
    {
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{ type: 'badge' }],
    },
    {
      name: 'points',
      title: 'Points',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'joinDate',
      title: 'Join Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Membership Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' },
          { title: 'Suspended', value: 'suspended' },
        ],
      },
      initialValue: 'active',
    },
    {
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    },
    {
      name: 'contributions',
      title: 'Contributions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Contribution Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Project', value: 'project' },
                  { title: 'Event', value: 'event' },
                  { title: 'Workshop', value: 'workshop' },
                  { title: 'Content', value: 'content' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'date',
              title: 'Date',
              type: 'date',
            },
            {
              name: 'pointsEarned',
              title: 'Points Earned',
              type: 'number',
              initialValue: 0,
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      media: 'avatar',
    },
    prepare(selection: any) {
      const { title, role, media } = selection;
      return {
        title,
        subtitle: role.charAt(0).toUpperCase() + role.slice(1),
        media,
      };
    },
  },
} 