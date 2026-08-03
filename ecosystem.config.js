/**
 * pm2 yapılandırması — Doğrular Seramik
 *
 * Sunucuda kullanım:
 *   pm2 start ecosystem.config.js --env production
 *   pm2 save
 *
 * Gmail bilgileri buraya YAZILMAZ. Sunucudaki .env.production dosyasına
 * konur; Next.js onu otomatik okur. Bu dosya git'e gittiği için içine
 * asla şifre yazmayın.
 */
module.exports = {
  apps: [
    {
      name: 'dogrular-seramik',
      cwd: '/var/www/dogrular-seramik',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '512M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      error_file: '/var/log/pm2/dogrular-seramik-error.log',
      out_file: '/var/log/pm2/dogrular-seramik-out.log',
      time: true,
    },
  ],
}
