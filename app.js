const enableBtn = document.getElementById('enableBtn');
const sendBtn   = document.getElementById('sendBtn');
const permEl    = document.getElementById('perm');

function updateUI() {
  // Notification.permission is "default" | "granted" | "denied"
  permEl.textContent = Notification.permission;
  sendBtn.disabled = (Notification.permission !== 'granted');
}

// call once when page loads
updateUI();
enableBtn.addEventListener('click', async () => {
  try {
    const permission = await Notification.requestPermission(); // knock & wait
    updateUI(); // refresh label + button state

    if (permission === 'granted') {
      alert('Notifications enabled 🎉');
    } else if (permission === 'denied') {
      alert('You denied notifications. You can change it in browser settings.');
    } else {
      // "default" = closed prompt without choosing
      alert('You closed the prompt. Click again if you want to allow.');
    }
  } catch (err) {
    console.error('Permission request failed:', err);
  }
});

sendBtn.addEventListener('click', () => {
  if (Notification.permission !== 'granted') {
    alert('Please enable notifications first.');
    return;
  }

  const notif = new Notification('👋 Hey there!', {
    body: 'Hello!',
    tag: 'hello-notif'
    // icon: 'icon.png' // optional later
  });

  notif.onclick = () => {
    window.focus();
    notif.close();
  };

  setTimeout(() => notif.close(), 5000); // auto-close after 5s
});

