# Uptime Status Dashboard

A real-time uptime monitoring dashboard built with **Next.js** and powered by the **UptimeRobot API v3**. This application displays the status of multiple services, their uptime percentages, and detailed monitor information.

## Features

- 🔄 **Real-time Updates**: Auto-refresh status data at configurable intervals (30s, 60s, 2m, 5m)
- 📊 **Service Overview**: View overall uptime percentage and status for each monitored service
- 🎯 **Detailed Monitors**: See individual monitor details including URL and uptime ratio
- 🎨 **Beautiful UI**: Responsive design with Tailwind CSS
- ⚡ **Fast Performance**: Built with Next.js 15+ and optimized for speed
- 🔐 **Secure**: Bearer token authentication with UptimeRobot API v3
- 📈 **Accurate Uptime**: Real data from UptimeRobot's 24-hour histogram

## Monitored Services

1. **Main API** - Primary application API
2. **DSE Website** - DSE website monitoring
3. **HPCCSS Site** - HPCCSS site monitoring
4. **ICT Website** - ICT website monitoring

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **API Integration**: Axios
- **API Source**: UptimeRobot API v3
- **Authentication**: Bearer token

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm or yarn
- UptimeRobot API token (see setup below)

### Installation

1. Clone or open this project in VS Code
2. Install dependencies:

```bash
npm install
```

### Setup: Adding Your API Token

The **most important step** is adding your UptimeRobot API token:

1. **Get your API token:**
   - Go to https://uptimerobot.com/login
   - Click your profile → My Settings
   - Navigate to API Settings
   - Copy your API token (starts with `ur...`)

2. **Update `.env.local`:**
   ```env
   NEXT_PUBLIC_UPTIME_ROBOT_TOKEN=your_api_token_here
   ```

3. **Monitor IDs are already configured:**
   ```env
   NEXT_PUBLIC_MAIN_API_KEY=u3156622-ff6fc7bdafa695a4e8891f09
   NEXT_PUBLIC_DSE_WEBSITE_API_KEY=m801686445-5b2660fc23995c0d43b84f73
   NEXT_PUBLIC_HPCCSS_SITE_API_KEY=m801686444-5f4222123256f4786a78d197
   NEXT_PUBLIC_ICT_WEBSITE_API_KEY=m801686439-36c556a4ca8775c683e4302c
   ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── status/
│   │       └── route.ts          # API endpoint for fetching status data
│   ├── globals.css
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main dashboard page
├── components/
│   ├── LoadingSpinner.tsx        # Loading state component
│   ├── MonitorCard.tsx           # Individual monitor display
│   └── ServiceStatus.tsx         # Service overview component
└── lib/
    └── uptimeRobotAPI.ts         # UptimeRobot API v3 integration
```

## How It Works

1. **Frontend** (`page.tsx`): Renders the dashboard and manages state
2. **API Route** (`api/status/route.ts`): Fetches data from UptimeRobot for all services
3. **API Integration** (`uptimeRobotAPI.ts`): Handles API calls and data transformation
4. **Components**:
   - `ServiceStatus`: Displays service-level information
   - `MonitorCard`: Shows individual monitor details
   - `LoadingSpinner`: Loading state UI

## API Integration Details

The application uses the **UptimeRobot API v3** with the following:

- **Endpoint**: `https://api.uptimerobot.com/v3/monitors`
- **Method**: GET
- **Authentication**: Bearer token in Authorization header
- **Response**: Real uptime data from 24-hour histogram

### Status Codes (v3)

Monitor status codes from UptimeRobot v3:

- `ACTIVE`: Service is online and operational
- `PAUSED`: Monitoring is temporarily paused
- `null`: Unknown or initial status

## Features Breakdown

### Auto-Refresh
Select refresh intervals from the dropdown:
- 30 seconds
- 60 seconds (default)
- 2 minutes
- 5 minutes

### Manual Refresh
Click the "Refresh" button to immediately fetch the latest status data.

### Status Indicators

- **Green (Online/Active)**: Service is operating normally
- **Red (Down/Offline)**: Service is experiencing issues
- **Yellow (Paused)**: Monitoring is temporarily paused
- **Gray (Error)**: Unable to fetch data

## Troubleshooting

### No data showing up
1. Verify API token in `.env.local` is correct
2. Check browser console for errors (F12)
3. Ensure your UptimeRobot account has monitors set up
4. Check network tab to see if API requests are being made
5. See [API_V3_SETUP.md](API_V3_SETUP.md) for detailed setup guide

### API errors

**401 Unauthorized:**
- Invalid or expired API token
- Generate a new token from UptimeRobot settings

**404 Not Found:**
- Monitor ID doesn't exist in your account
- Verify monitor IDs in `.env.local`

**Error in console:**
- Check that `NEXT_PUBLIC_UPTIME_ROBOT_TOKEN` is set
- Verify token format (should start with `ur`)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_UPTIME_ROBOT_TOKEN`
   - `NEXT_PUBLIC_MAIN_API_KEY`
   - `NEXT_PUBLIC_DSE_WEBSITE_API_KEY`
   - `NEXT_PUBLIC_HPCCSS_SITE_API_KEY`
   - `NEXT_PUBLIC_ICT_WEBSITE_API_KEY`
5. Deploy

### Other Platforms

Ensure all `NEXT_PUBLIC_*` variables are set in your deployment environment.

## Customization

### Adding New Services

Edit `src/lib/uptimeRobotAPI.ts` and add new services to the `statusConfigs` array:

```typescript
const statusConfigs = [
  {
    name: 'Your Service Name',
    monitorId: 'your_monitor_id',
  },
  // ... existing services
];
```

Then add the environment variable to `.env.local`.

### Styling

All styles use Tailwind CSS. Modify components in:
- `src/components/`: Update component styling
- `src/app/globals.css`: Global styles

## Performance

- **Client-side rendering** for real-time updates
- **Server-side API calls** for secure data fetching
- **Optimized images** and assets
- **Minimal JavaScript** bundle

## Documentation

- **[API_V3_SETUP.md](API_V3_SETUP.md)** - Detailed API token setup guide
- **[API_V3_MIGRATION.md](API_V3_MIGRATION.md)** - Migration from v2 to v3 API

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review [API_V3_SETUP.md](API_V3_SETUP.md)
3. Check UptimeRobot API documentation: https://api.uptimerobot.com
4. Check Next.js documentation: https://nextjs.org/docs

## License

MIT License - Feel free to use this project for personal or commercial use.
