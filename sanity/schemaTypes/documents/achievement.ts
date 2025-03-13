export default {
  name: 'achievement',
  title: 'Achievements',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Achievement Title',
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
      title: 'Achievement Type',
      type: 'string',
      options: {
        list: [
          { title: 'Badge', value: 'badge' },
          { title: 'Certificate', value: 'certificate' },
          { title: 'Award', value: 'award' },
          { title: 'Recognition', value: 'recognition' },
          { title: 'Milestone', value: 'milestone' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Achievement Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'icon',
      title: 'Achievement Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Achievement Category',
      type: 'string',
      options: {
        list: [
          { title: 'Technical', value: 'technical' },
          { title: 'Leadership', value: 'leadership' },
          { title: 'Community', value: 'community' },
          { title: 'Project', value: 'project' },
          { title: 'Event', value: 'event' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    {
      name: 'criteria',
      title: 'Achievement Criteria',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'requirement',
              title: 'Requirement',
              type: 'string',
            },
            {
              name: 'points',
              title: 'Points Required',
              type: 'number',
            },
            {
              name: 'description',
              title: 'Requirement Description',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'pointValue',
      title: 'Points Awarded',
      type: 'number',
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: 'tier',
      title: 'Achievement Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Bronze', value: 'bronze' },
          { title: 'Silver', value: 'silver' },
          { title: 'Gold', value: 'gold' },
          { title: 'Platinum', value: 'platinum' },
          { title: 'Special', value: 'special' },
        ],
      },
    },
    {
      name: 'unlockConditions',
      title: 'Unlock Conditions',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Condition Type',
          type: 'string',
          options: {
            list: [
              { title: 'Points Based', value: 'points' },
              { title: 'Activity Based', value: 'activity' },
              { title: 'Time Based', value: 'time' },
              { title: 'Manual Award', value: 'manual' },
            ],
          },
        },
        {
          name: 'threshold',
          title: 'Achievement Threshold',
          type: 'number',
          hidden: ({ parent }: any) => parent?.type !== 'points',
        },
        {
          name: 'activities',
          title: 'Required Activities',
          type: 'array',
          of: [{ type: 'string' }],
          hidden: ({ parent }: any) => parent?.type !== 'activity',
        },
        {
          name: 'duration',
          title: 'Time Duration (days)',
          type: 'number',
          hidden: ({ parent }: any) => parent?.type !== 'time',
        },
      ],
    },
    {
      name: 'rewards',
      title: 'Achievement Rewards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Reward Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Points', value: 'points' },
                  { title: 'Badge', value: 'badge' },
                  { title: 'Role', value: 'role' },
                  { title: 'Access', value: 'access' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            {
              name: 'value',
              title: 'Reward Value',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Reward Description',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'rarity',
      title: 'Achievement Rarity',
      type: 'object',
      fields: [
        {
          name: 'level',
          title: 'Rarity Level',
          type: 'string',
          options: {
            list: [
              { title: 'Common', value: 'common' },
              { title: 'Uncommon', value: 'uncommon' },
              { title: 'Rare', value: 'rare' },
              { title: 'Epic', value: 'epic' },
              { title: 'Legendary', value: 'legendary' },
            ],
          },
        },
        {
          name: 'percentage',
          title: 'Achievement Rate (%)',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(100),
        },
      ],
    },
    {
      name: 'isActive',
      title: 'Achievement Active',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'seasonalAvailability',
      title: 'Seasonal Availability',
      type: 'object',
      fields: [
        {
          name: 'isSeasonalOnly',
          title: 'Seasonal Only',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'startDate',
          title: 'Available From',
          type: 'date',
          hidden: ({ parent }: any) => !parent?.isSeasonalOnly,
        },
        {
          name: 'endDate',
          title: 'Available Until',
          type: 'date',
          hidden: ({ parent }: any) => !parent?.isSeasonalOnly,
        },
      ],
    },
    {
      name: 'relatedAchievements',
      title: 'Related Achievements',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'achievement' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      category: 'category',
      media: 'icon',
    },
    prepare(selection: any) {
      const { title, type, category, media } = selection;
      return {
        title,
        subtitle: `${type.charAt(0).toUpperCase() + type.slice(1)} - ${category}`,
        media,
      };
    },
  },
} 