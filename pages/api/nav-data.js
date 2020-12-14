import { getComponentNavData } from '../../lib/github';

export default async (req, res) => {
  const navData = await getComponentNavData();

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.json(navData);
};
