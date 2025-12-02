export default async (req, res) => {
  const { reqHandler } = await import('../dist/personal-website/server/server.mjs');
  return reqHandler(req, res);
};
