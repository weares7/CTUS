export default async function handler(req, res) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  // Данные для отправки
  const data = {
    content: "🚀 **Новый посетитель на сайте!**",
    embeds: [{
      title: "Информация о сессии",
      color: 5814783, // Синий цвет
      fields: [
        {
          name: "User-Agent",
          value: req.headers['user-agent'] || 'Неизвестен',
          inline: false
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
