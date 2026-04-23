export default async function handler(req, res) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const forwardedIp = req.headers['x-forwarded-for'] || 'Не указан';
  const userAgent = req.headers['user-agent'] || 'Неизвестен';

  const data = {
    content: "**Log**",
    embeds: [{
      title: "Детали запроса",
      color: 5814783,
      fields: [
        {
          name: "User-Agent",
          value: userAgent,
          inline: false
        },
        {
          name: "Переданный IP",
          value: forwardedIp,
          inline: true
        },
        {
          name: "Дата",
          value: new Date().toLocaleString("ru-RU"),
          inline: true
        }
      ]
    }]
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    res.status(200).json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ status: 'error' });
  }
}
