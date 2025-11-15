module.exports = {
  apps: [
    {
      name: 'aisummit-backend',
      script: 'server.js',
      cwd: '/var/www/aisummit/server',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      // Auto restart
      watch: false,
      max_memory_restart: '1G',
      
      // Logging
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Graceful reload
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 3000,
      
      // Error handling
      error_file: '/var/log/pm2/aisummit-error.log',
      out_file: '/var/log/pm2/aisummit-out.log',
      log_file: '/var/log/pm2/aisummit-combined.log'
    }
  ]
};
