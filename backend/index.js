const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

app.use("/api/customer-type", require("./routes/customerType"));
app.use("/api/account-industry", require("./routes/accountIndustry"));
app.use("/api/team", require("./routes/team"));
app.use("/api/acv-range", require("./routes/acvRange"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
