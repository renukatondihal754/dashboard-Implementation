# dashboard-Implementation 

# 📊 ACV Data Visualization Dashboard

This full-stack project visualizes Annual Contract Value (ACV) metrics using interactive charts and tables. It enables teams to analyze customer acquisition trends, industry performance, team contributions, and deal size breakdowns by quarter.

## 🚀 Features

- 📦 Backend REST APIs powered by Express.js
- 📈 Stacked Bar Charts to visualize quarterly data
- 🍩 Donut Charts to show percentage contributions
- 📋 Tabular summaries grouped by customer type
- ⚡ Live interaction with preloaded JSON data
- 💅 Tailwind CSS + D3.js + Material UI components

## 🛠 Tech Stack

- **Frontend**: React.js, TypeScript, D3.js, Tailwind CSS, Material UI
- **Backend**: Node.js, Express.js
- **Data Source**: JSON files served via REST APIs

---

## 📁 Project Structure

root/
├── backend/
│ ├── data/
│ │ ├── customer-type.json
│ │ ├── account-industry.json
│ │ ├── team.json
│ │ └── acv-range.json
│ ├── routes/
│ │ ├── customerType.js
│ │ ├── accountIndustry.js
│ │ ├── team.js
│ │ └── acvRange.js
│ ├── app.js
│ └── package.json
│
├── acv-dashboard/ **frontend**
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── BarChart.tsx
│ │ │ ├── DonutChart.tsx
│ │ │ ├── DataTable.tsx
│ │ │ └── DataCard.tsx
│ │ ├── utils/
│ │ │ └── groupData.ts
│ │ ├── services/
│ │ │ └── api.ts
│ │ ├── types/
│ │ │ └── dataTypes.ts
│ │ ├── App.tsx
│ │ └── index.tsx
│ └── package.json



---

## 🌐 Backend Overview

The backend provides API endpoints to serve data from static JSON files located in the `data/` folder.

### Endpoints

| Endpoint                  | Description                                 |
|---------------------------|---------------------------------------------|
| `/api/customer-type`      | Customer type ACV & opportunity data        |
| `/api/account-industry`   | ACV data by account industry                |
| `/api/team`               | ACV and deals data per team                 |
| `/api/acv-range`          | ACV split by size range                     |


### Run Backend
cd backend
npm install
node app.js
### Start Frontend
cd acv-dashboard
npm install
npm run dev or npm start 




