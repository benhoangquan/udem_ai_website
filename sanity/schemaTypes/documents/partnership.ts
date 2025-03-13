export default {
  name: 'partnership',
  title: 'Partnerships',
  type: 'document',
  fields: [
    {
      name: 'organizationName',
      title: 'Organization Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'organizationName',
        maxLength: 96,
      },
    },
    {
      name: 'type',
      title: 'Partnership Type',
      type: 'string',
      options: {
        list: [
          { title: 'Industry Partner', value: 'industry' },
          { title: 'Academic Institution', value: 'academic' },
          { title: 'Research Lab', value: 'research' },
          { title: 'Non-Profit', value: 'nonprofit' },
          { title: 'Government', value: 'government' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Organization Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Partnership Description',
      type: 'blockContent',
    },
    {
      name: 'website',
      title: 'Organization Website',
      type: 'url',
    },
    {
      name: 'partnershipDetails',
      title: 'Partnership Details',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Partnership Start Date',
          type: 'date',
        },
        {
          name: 'endDate',
          title: 'Partnership End Date',
          type: 'date',
        },
        {
          name: 'isOngoing',
          title: 'Ongoing Partnership',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'scope',
          title: 'Partnership Scope',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Technical Workshops', value: 'workshops' },
                  { title: 'Research Projects', value: 'research' },
                  { title: 'Internships', value: 'internships' },
                  { title: 'Mentorship', value: 'mentorship' },
                  { title: 'Sponsorship', value: 'sponsorship' },
                  { title: 'Events', value: 'events' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      name: 'initiatives',
      title: 'Joint Initiatives',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Initiative Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Initiative Description',
              type: 'text',
            },
            {
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: [
                  { title: 'Planned', value: 'planned' },
                  { title: 'In Progress', value: 'in_progress' },
                  { title: 'Completed', value: 'completed' },
                  { title: 'On Hold', value: 'on_hold' },
                ],
              },
            },
            {
              name: 'timeline',
              title: 'Timeline',
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
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'contacts',
      title: 'Contact Information',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Contact Name',
              type: 'string',
            },
            {
              name: 'position',
              title: 'Position',
              type: 'string',
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
            },
            {
              name: 'phone',
              title: 'Phone',
              type: 'string',
            },
            {
              name: 'isPrimary',
              title: 'Primary Contact',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'resources',
      title: 'Shared Resources',
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
                  { title: 'Documentation', value: 'documentation' },
                  { title: 'Dataset', value: 'dataset' },
                  { title: 'Code Repository', value: 'code' },
                  { title: 'Research Paper', value: 'paper' },
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
              name: 'accessLevel',
              title: 'Access Level',
              type: 'string',
              options: {
                list: [
                  { title: 'Public', value: 'public' },
                  { title: 'Members Only', value: 'members' },
                  { title: 'Private', value: 'private' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      title: 'Partnership Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' },
          { title: 'Pending', value: 'pending' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'active',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
            },
            {
              name: 'position',
              title: 'Author Position',
              type: 'string',
            },
            {
              name: 'date',
              title: 'Date',
              type: 'date',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'organizationName',
      type: 'type',
      status: 'status',
      media: 'logo',
    },
    prepare(selection: any) {
      const { title, type, status, media } = selection;
      return {
        title,
        subtitle: `${type.charAt(0).toUpperCase() + type.slice(1)} Partner - ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        media,
      };
    },
  },
} 