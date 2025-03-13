export default {
  name: 'code',
  title: 'Code',
  type: 'object',
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description: 'Optional filename to display above the code block',
    },
    {
      name: 'language',
      title: 'Programming Language',
      type: 'string',
      options: {
        list: [
          { title: 'Plain text', value: 'text' },
          { title: 'Python', value: 'python' },
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'SCSS', value: 'scss' },
          { title: 'JSON', value: 'json' },
          { title: 'YAML', value: 'yaml' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'Shell', value: 'shell' },
          { title: 'Bash', value: 'bash' },
          { title: 'SQL', value: 'sql' },
          { title: 'GraphQL', value: 'graphql' },
          { title: 'Java', value: 'java' },
          { title: 'C++', value: 'cpp' },
          { title: 'C#', value: 'csharp' },
          { title: 'Go', value: 'go' },
          { title: 'Rust', value: 'rust' },
          { title: 'Swift', value: 'swift' },
          { title: 'Kotlin', value: 'kotlin' },
          { title: 'PHP', value: 'php' },
          { title: 'R', value: 'r' },
          { title: 'MATLAB', value: 'matlab' },
          { title: 'Julia', value: 'julia' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'highlightLines',
      title: 'Highlight Lines',
      type: 'array',
      of: [
        {
          type: 'number',
          validation: (Rule: any) => Rule.integer().positive(),
        },
      ],
      description: 'Line numbers to highlight in the code block',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption to display below the code block',
    },
    {
      name: 'showLineNumbers',
      title: 'Show Line Numbers',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'filename',
      language: 'language',
      code: 'code',
    },
    prepare(selection: any) {
      const { title, language, code } = selection;
      return {
        title: title || 'Code Block',
        subtitle: `${language} - ${code?.substring(0, 50)}...`,
      };
    },
  },
} 