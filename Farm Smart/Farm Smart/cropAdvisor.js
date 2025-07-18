// Azure OpenAI Config
    const apiKey = 'AxTw5DnfPN7y0OfU1pWnkr368t2TuLqAjL0SiloGOObxpfhpWBy2JQQJ99BGACYeBjFXJ3w3AAABACOG9wTy';
    const endpoint = 'https://openaiweek.openai.azure.com/';
    const deployment = 'gpt-4.1';
    const apiVersion = '2023-03-15-preview';

    // AI Crop Advisor Bot
    async function handleChat() {
      const input = document.getElementById('chatInput').value.trim();
      const responseContainer = document.getElementById('chatResponse');
      if (!input) {
        responseContainer.innerText = "Please enter a question.";
        return;
      }
      responseContainer.innerText = 'Thinking...';

      try {
        const result = await fetch(
          `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': apiKey
            },
            body: JSON.stringify({
              messages: [{ role: 'user', content: input }],
              max_tokens: 500,
              temperature: 0.7
            })
          }
        );

        const data = await result.json();
        const reply = data.choices?.[0]?.message?.content || 'Sorry, no response.';
        responseContainer.innerText = reply;
      } catch (err) {
        responseContainer.innerText = 'Error communicating with AI. Please try again.';
        console.error(err);
      }
    }