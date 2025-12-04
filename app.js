const enableBtn = document.getElementById('enableBtn');
const sendBtn   = document.getElementById('sendBtn');
const permEl    = document.getElementById('perm');

function updateUI() {
  
  permEl.textContent = Notification.permission;
  sendBtn.disabled = (Notification.permission !== 'granted');
}


updateUI();
enableBtn.addEventListener('click', async () => {
  try {
    const permission = await Notification.requestPermission(); // knock & wait
    updateUI(); 

    if (permission === 'granted') {
      alert('Notifications enabled 🎉');
    } else if (permission === 'denied') {
      alert('You denied notifications. You can change it in browser settings.');
    } else {
     
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
    
  });

  notif.onclick = () => {
    window.focus();
    notif.close();
  };

  setTimeout(() => notif.close(), 5000); 
});

