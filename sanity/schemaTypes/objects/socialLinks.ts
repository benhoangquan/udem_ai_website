export default {
  name: 'socialLinks',
  title: 'Social Media Links',
  type: 'object',
  fields: [
    {
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    },
    {
      name: 'twitter',
      title: 'Twitter URL',
      type: 'url',
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    },
    {
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
    },
    {
      name: 'discord',
      title: 'Discord URL',
      type: 'url',
    },
    {
      name: 'telegram',
      title: 'Telegram URL',
      type: 'url',
    },
    {
      name: 'customLinks',
      title: 'Custom Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform Name',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Name of the icon to use (if using an icon library)',
            },
          ],
        },
      ],
    },
  ],
} 