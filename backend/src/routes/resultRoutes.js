const express = require("express");
const router = express.Router();
const resultController = require("../controller/resultController");

// Rutas de Result
router.post("/results", resultController.createResult);
router.get(
  "/results/test/:testId/student/:profileId",
  resultController.getResultsDetail
);
router.get("/results/report/", resultController.getGroupedResults);

module.exports = router;
