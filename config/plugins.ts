import type { Core } from '@strapi/strapi';

export default ({ env }: Core.Config.Shared.ConfigParams) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        credentials: {
          accessKeyId: env('SUPABASE_STORAGE_KEY'),
          secretAccessKey: env('SUPABASE_STORAGE_SECRET'),
        },
        region: env('SUPABASE_STORAGE_REGION', 'auto'),
        endpoint: env('SUPABASE_STORAGE_ENDPOINT'), // https://[ref].supabase.co/storage/v1/s3
        forcePathStyle: true,
        params: { Bucket: env('SUPABASE_STORAGE_BUCKET', 'uploads') },
      },
    },
  },
});