import type { Core } from '@strapi/strapi';

export default ({ env }: Core.Config.Shared.ConfigParams) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('SUPABASE_STORAGE_PUBLIC_URL'),
        credentials: {
          accessKeyId: env('SUPABASE_STORAGE_KEY'),
          secretAccessKey: env('SUPABASE_STORAGE_SECRET'),
        },
        region: env('SUPABASE_STORAGE_REGION', 'auto'),
        endpoint: env('SUPABASE_STORAGE_ENDPOINT'),
        forcePathStyle: true,
        params: { Bucket: env('SUPABASE_STORAGE_BUCKET', 'uploads') },
      },
      actionOptions: {
        upload: {},
        uploadStream: {
          partSize: 50 * 1024 * 1024, // 50MB 미만은 PutObject 단일 요청으로 처리
          queueSize: 1,               // 순차 업로드 (Supabase 멀티파트 세션 문제 방지)
        },
        delete: {},
      },
    },
  },
});