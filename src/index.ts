import type { Core } from '@strapi/strapi';

const FOLDER_MAP: Record<string, string> = {
  'api::hero-slide.hero-slide': 'hero-images',
  'api::program.program':       'program-images',
  'api::story.story':           'story-images',
  'api::notice.notice':         'notices',
  'api::press-article.press-article': 'press-articles',
  'api::site-config.site-config':     'site-config',
};

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    // 업로드 요청의 ref(컨텐츠 타입)를 보고 자동으로 폴더 배정
    strapi.server.use(async (ctx: any, next: () => Promise<void>) => {
      if (ctx.method === 'POST' && ctx.url.startsWith('/api/upload')) {
        const ref = ctx.request.body?.ref;
        const folderName = ref && FOLDER_MAP[ref];

        if (folderName) {
          const folder = await strapi.db
            .query('plugin::upload.folder')
            .findOne({ where: { name: folderName, parent: null } });

          if (folder) {
            const existing = JSON.parse(ctx.request.body.fileInfo || '{}');
            ctx.request.body.fileInfo = JSON.stringify({ ...existing, folder: folder.id });
          }
        }
      }
      await next();
    });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 서버 시작 시 필요한 폴더가 없으면 자동 생성
    for (const folderName of Object.values(FOLDER_MAP)) {
      const existing = await strapi.db
        .query('plugin::upload.folder')
        .findOne({ where: { name: folderName, parent: null } });

      if (!existing) {
        await (strapi.plugin('upload').service('folder') as any).create({
          name: folderName,
          parent: null,
        });
        strapi.log.info(`[upload] Created media folder: ${folderName}`);
      }
    }
  },
};
