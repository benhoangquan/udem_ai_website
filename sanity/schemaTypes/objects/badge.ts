export default {
  name: 'badge',
  title: 'Badge',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Badge Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Badge Type',
      type: 'string',
      options: {
        list: [
          { title: 'Achievement', value: 'achievement' },
          { title: 'Skill', value: 'skill' },
          { title: 'Contribution', value: 'contribution' },
          { title: 'Participation', value: 'participation' },
          { title: 'Leadership', value: 'leadership' },
          { title: 'Special', value: 'special' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Badge Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Badge Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'level',
      title: 'Badge Level',
      type: 'string',
      options: {
        list: [
          { title: 'Bronze', value: 'bronze' },
          { title: 'Silver', value: 'silver' },
          { title: 'Gold', value: 'gold' },
          { title: 'Platinum', value: 'platinum' },
          { title: 'Diamond', value: 'diamond' },
        ],
      },
    },
    {
      name: 'dateAwarded',
      title: 'Date Awarded',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      type: 'type',
      level: 'level',
      media: 'icon',
    },
    prepare(selection: any) {
      const { title, type, level, media } = selection;
      return {
        title,
        subtitle: `${type} - ${level || 'No Level'}`,
        media,
      };
    },
  },
} 