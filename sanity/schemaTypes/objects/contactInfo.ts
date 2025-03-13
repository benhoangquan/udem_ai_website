export default {
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'object',
  fields: [
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.email(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Physical Address',
      type: 'text',
    },
    {
      name: 'officeHours',
      title: 'Office Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  { title: 'Monday', value: 'monday' },
                  { title: 'Tuesday', value: 'tuesday' },
                  { title: 'Wednesday', value: 'wednesday' },
                  { title: 'Thursday', value: 'thursday' },
                  { title: 'Friday', value: 'friday' },
                  { title: 'Saturday', value: 'saturday' },
                  { title: 'Sunday', value: 'sunday' },
                ],
              },
            },
            {
              name: 'hours',
              title: 'Hours',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'contactFormEnabled',
      title: 'Enable Contact Form',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'contactFormEmail',
      title: 'Contact Form Recipient Email',
      type: 'string',
      validation: (Rule: any) => Rule.email(),
      hidden: ({ parent }: any) => !parent?.contactFormEnabled,
    },
  ],
} 