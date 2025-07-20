const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const loadJson = (filename) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, '../data/', filename)));

router.get('/customer-type', (req, res) => res.json(loadJson('customer_type.json')));
router.get('/account-industry', (req, res) => res.json(loadJson('account_industry.json')));
router.get('/team', (req, res) => res.json(loadJson('team.json')));
router.get('/acv-range', (req, res) => res.json(loadJson('acv_range.json')));
router.get('/dashboard', (req, res) => {
  console.log('Dashboard route hit!');
  try {
    const customerType = loadJson('customer_type.json');
    const accountIndustry = loadJson('account_industry.json');
    const team = loadJson('team.json');
    const acvRange = loadJson('acv_range.json');

    res.json({
      customerType,
      accountIndustry,
      team,
      acvRange,
    });
  } catch (err) {
    console.error('Error loading JSON:', err.message);
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
});



module.exports = router;
