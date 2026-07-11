import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://inctagram.work/api/v1/graphql',
  documents: 'shared/api/graphql/operations/**/*.graphql',
  generates: {
    'shared/api/graphql/gql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        scalars: {
          DateTime: 'string',
        },
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
