# Deployment Guide - Tour Admin Panel

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Push to GitHub**
   ```bash
   cd tour-admin
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `NEXT_PUBLIC_API_URL`: Your backend API URL
     - `NEXTAUTH_URL`: Your admin panel URL (e.g., https://admin.yourdomain.com)
     - `NEXTAUTH_SECRET`: Generate using `openssl rand -base64 32`
     - `ADMIN_EMAIL`: Admin email
     - `ADMIN_PASSWORD`: Admin password
   - Click "Deploy"

### Option 2: Docker

1. **Build the image**
   ```bash
   docker build -t tour-admin .
   ```

2. **Run the container**
   ```bash
   docker run -p 3001:3001 \
     -e NEXT_PUBLIC_API_URL=https://your-backend-api.com \
     -e NEXTAUTH_URL=http://localhost:3001 \
     -e NEXTAUTH_SECRET=your-secret-key \
     -e ADMIN_EMAIL=admin@tour.com \
     -e ADMIN_PASSWORD=admin123 \
     tour-admin
   ```

3. **Or use Docker Compose**
   ```bash
   # Create .env file first with all variables
   docker-compose up -d
   ```

### Option 3: Manual Server Deployment (VPS/Cloud)

1. **SSH into your server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js** (if not installed)
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone and setup**
   ```bash
   git clone <your-repo-url>
   cd tour-admin
   npm install
   cp .env.example .env
   # Edit .env with your values
   nano .env
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Run with PM2** (process manager)
   ```bash
   sudo npm install -g pm2
   pm2 start npm --name "tour-admin" -- start
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name admin.yourdomain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d admin.yourdomain.com
   ```

### Option 4: Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Deploy

### Option 5: Render

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Add environment variables
6. Click "Create Web Service"

---

## Environment Variables

Required for all deployments:

```bash
# Backend API URL (your main tour application)
NEXT_PUBLIC_API_URL=https://your-backend-api.com

# NextAuth Configuration
NEXTAUTH_URL=https://admin.yourdomain.com
NEXTAUTH_SECRET=your-super-secret-key-here

# Admin Credentials (for demo)
ADMIN_EMAIL=admin@tour.com
ADMIN_PASSWORD=secure-password-here
```

### Generate NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

---

## Post-Deployment Checklist

- [ ] Admin panel is accessible via browser
- [ ] Login works with credentials
- [ ] API connection to backend is working
- [ ] All pages load without errors
- [ ] Create/Edit/Delete operations work
- [ ] SSL certificate is active (HTTPS)
- [ ] Environment variables are set correctly
- [ ] Changed default admin password

---

## Troubleshooting

### "Cannot connect to API"
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend API is running
- Check CORS settings on backend
- Check network/firewall rules

### "Login not working"
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Verify admin credentials

### "Build failed"
- Check Node.js version (18+)
- Run `npm install` first
- Check for TypeScript errors: `npm run lint`

### "502 Bad Gateway"
- Application may not be running
- Check port 3001 is available
- Verify reverse proxy configuration

---

## Monitoring

### PM2 Commands
```bash
pm2 status              # Check status
pm2 logs tour-admin     # View logs
pm2 restart tour-admin  # Restart
pm2 stop tour-admin     # Stop
```

### Docker Commands
```bash
docker ps                    # Check running containers
docker logs tour-admin       # View logs
docker restart tour-admin    # Restart
docker stop tour-admin       # Stop
```

---

## Updating the Application

### Vercel/Railway/Render
- Just push to GitHub main branch, auto-deploys

### Docker
```bash
git pull
docker-compose down
docker-compose build
docker-compose up -d
```

### PM2
```bash
git pull
npm install
npm run build
pm2 restart tour-admin
```

---

## Security Best Practices

1. **Always use HTTPS** in production
2. **Change default admin credentials**
3. **Use strong NEXTAUTH_SECRET**
4. **Keep dependencies updated**: `npm audit fix`
5. **Enable rate limiting** on backend API
6. **Use environment variables** for all secrets
7. **Regular backups** of configuration
8. **Monitor access logs**

---

## Support

For issues:
1. Check logs for errors
2. Verify environment variables
3. Test API endpoints manually
4. Check browser console for errors
5. Review API_ENDPOINTS.md for backend requirements
