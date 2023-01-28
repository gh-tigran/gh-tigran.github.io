import { Users, Notes, Messages } from "../models";

async function main() {
  await Users.sync({ alter: true });
  await Notes.sync({ alter: true });
  await Messages.sync({ alter: true });

  process.exit(0);
}

main().catch(console.error);
