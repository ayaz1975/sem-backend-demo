const SERVICE_NAME = process.env.SERVICE_NAME || "client-demo-cron";

async function main() {
  console.log(`[${SERVICE_NAME}] started @ ${new Date().toISOString()}`);

  // simulate useful work
  await new Promise((r) => setTimeout(r, 1200));

  console.log(`[${SERVICE_NAME}] finished successfully @ ${new Date().toISOString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(`[${SERVICE_NAME}] failed:`, err);
    process.exit(1);
  });

