export default async (req, res) => {
  const { reqHandler } = await import('../dist/apps/personal-website/server/server.mjs');
  return reqHandler(req, res);
};
