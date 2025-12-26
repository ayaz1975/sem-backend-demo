const SERVICE_NAME = process.env.SERVICE_NAME || "client-demo-worker";
const INTERVAL_SEC = Number(process.env.INTERVAL_SEC || 15);

function doWork() {
  // Demo background job
  console.log(
    `[${SERVICE_NAME}] tick @ ${new Date().toISOString()} - processed jobs: ${Math.floor(Math.random() * 5)}`
  );
}

console.log(`[${SERVICE_NAME}] started. interval=${INTERVAL_SEC}s`);

setInterval(doWork, INTERVAL_SEC * 1000);
doWork();

