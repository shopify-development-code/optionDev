import { fileURLToPath } from "url";
import path from 'path';

export async function privayPolicy(req, res) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  res.render(path.join(__dirname, "../../Templates/privacyPolicy.ejs"));
}
